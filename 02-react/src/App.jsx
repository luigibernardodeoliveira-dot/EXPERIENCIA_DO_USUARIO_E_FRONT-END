import { useEffect, useRef, useState } from 'react';
import { loadData, newTrip, storageKey } from './data.js';
import { readRoute } from './utils.js';
import Header from './components/Header.jsx';
import Auth from './components/Auth.jsx';
import TripList from './components/TripList.jsx';
import NewTrip from './components/NewTrip.jsx';
import TripCreated from './components/TripCreated.jsx';
import Chat from './components/Chat.jsx';
import Polls from './components/Polls.jsx';
import Finance from './components/Finance.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ConfirmExpense from './components/ConfirmExpense.jsx';

const authPages = ['boas-vindas', 'cadastro', 'login'];

function firstName(name) {
    return String(name || 'Você').trim().split(/\s+/)[0] || 'Você';
}

export default function App() {
    const [data, setData] = useState(loadData);
    const [route, setRoute] = useState(readRoute);
    const [draft, setDraft] = useState(null);
    const [notice, setNotice] = useState('');
    const [profileName, setProfileName] = useState(data.userName);
    const main = useRef(null);
    const profile = useRef(null);

    const rawPage = route.page;
    const isPublicPage = authPages.includes(rawPage);
    const page = !data.session && !isPublicPage ? 'boas-vindas' : rawPage;
    const showingAuth = authPages.includes(page);
    const trip = data.trips.find((item) => item.id === route.tripId) || data.trips[0];
    const insideTrip = ['chat', 'roteiro', 'financeiro', 'nova-despesa', 'confirmar-despesa'].includes(page);
    const title = showingAuth ? (page === 'cadastro' ? 'Criar conta' : page === 'login' ? 'Login' : 'FEI Viagens')
        : insideTrip ? trip.destination : page === 'nova-viagem' ? 'Criar viagem'
            : page === 'viagem-criada' ? 'Viagem criada!' : 'Minhas viagens';

    useEffect(() => {
        function changedRoute() {
            setRoute(readRoute());
        }

        window.addEventListener('hashchange', changedRoute);
        return () => window.removeEventListener('hashchange', changedRoute);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(data));
        } catch {
            setNotice('Não foi possível salvar no navegador. Os dados desta sessão continuam disponíveis.');
        }
    }, [data]);

    useEffect(() => {
        document.body.classList.toggle('auth-mode', showingAuth);
        return () => document.body.classList.remove('auth-mode');
    }, [showingAuth]);

    useEffect(() => {
        document.title = title + ' | FEI Viagens';
        window.scrollTo(0, 0);
        main.current?.focus({ preventScroll: true });
    }, [page, route.tripId, title]);

    useEffect(() => {
        if (!notice) return undefined;
        const timer = setTimeout(() => setNotice(''), 4500);
        return () => clearTimeout(timer);
    }, [notice]);

    function navigate(nextPage, tripId = trip.id) {
        const hash = authPages.includes(nextPage) || ['viagens', 'nova-viagem'].includes(nextPage)
            ? nextPage
            : nextPage + '/' + encodeURIComponent(tripId);

        if (location.hash === '#' + hash) setRoute(readRoute());
        else location.hash = hash;
    }

    function signUp(account) {
        if (data.account && data.account.email === account.email) {
            return 'Este e-mail já possui uma conta. Faça login para continuar.';
        }

        setData((previous) => ({
            ...previous,
            account,
            session: true,
            userName: firstName(account.name)
        }));
        setNotice('Conta criada com sucesso!');
        navigate('viagens');
        return '';
    }

    function login(email, password) {
        if (!data.account) {
            return 'Ainda não existe uma conta cadastrada neste navegador. Crie sua conta para continuar.';
        }
        if (data.account.email !== email || data.account.password !== password) {
            return 'E-mail ou senha não conferem.';
        }

        setData((previous) => ({
            ...previous,
            session: true,
            userName: firstName(previous.account.name)
        }));
        setNotice('Login realizado. Bem-vindo(a), ' + firstName(data.account.name) + '!');
        navigate('viagens');
        return '';
    }

    function updateTrip(change) {
        setData((previous) => ({
            ...previous,
            trips: previous.trips.map((item) => item.id === trip.id ? change(item) : item)
        }));
    }

    function createTrip(destination, start, end, image) {
        const created = newTrip(destination, start, end, image);
        setData((previous) => ({ ...previous, trips: [...previous.trips, created] }));
        navigate('viagem-criada', created.id);
    }

    function sendMessage(text) {
        const message = {
            author: data.userName,
            text,
            own: true,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        updateTrip((item) => ({ ...item, messages: [...item.messages, message] }));
    }

    function vote(pollIndex, optionIndex) {
        updateTrip((item) => ({
            ...item,
            polls: item.polls.map((poll, index) => {
                if (index !== pollIndex || poll.selected === optionIndex) return poll;
                const votes = [...poll.votes];
                if (poll.selected !== null) votes[poll.selected]--;
                votes[optionIndex]++;
                return { ...poll, votes, selected: optionIndex };
            })
        }));
        setNotice('Voto registrado!');
    }

    function reviewExpense(expense) {
        setDraft({ ...expense, tripId: trip.id });
        navigate('confirmar-despesa');
    }

    function confirmExpense() {
        if (!draft || draft.tripId !== trip.id) return;
        updateTrip((item) => ({ ...item, expenses: [...item.expenses, draft] }));
        setDraft(null);
        navigate('financeiro');
        setNotice('Despesa adicionada!');
    }

    function openProfile() {
        setProfileName(data.userName);
        profile.current?.showModal();
    }

    function saveProfile(event) {
        event.preventDefault();
        const name = profileName.trim();
        if (!name) return;
        setData((previous) => ({
            ...previous,
            userName: firstName(name),
            account: previous.account ? { ...previous.account, name } : null
        }));
        profile.current?.close();
    }

    function logout() {
        setData((previous) => ({ ...previous, session: false }));
        setDraft(null);
        profile.current?.close();
        navigate('boas-vindas');
    }

    let screen;

    if (showingAuth) {
        screen = <Auth page={page} hasAccount={Boolean(data.account)} onNavigate={navigate} onSignup={signUp} onLogin={login} />;
    } else if (page === 'nova-viagem') {
        screen = <NewTrip onCreate={createTrip} />;
    } else if (page === 'viagem-criada') {
        screen = <TripCreated trip={trip} notify={setNotice} />;
    } else if (page === 'chat') {
        screen = <Chat trip={trip} userName={data.userName} onSend={sendMessage} />;
    } else if (page === 'roteiro') {
        screen = <Polls trip={trip} onVote={vote} />;
    } else if (page === 'nova-despesa') {
        screen = <ExpenseForm key={trip.id} trip={trip} draft={draft?.tripId === trip.id ? draft : null} onReview={reviewExpense} />;
    } else if (page === 'confirmar-despesa' && draft?.tripId === trip.id) {
        screen = <ConfirmExpense expense={draft} onConfirm={confirmExpense} onEdit={() => navigate('nova-despesa')} />;
    } else if (page === 'financeiro' || page === 'confirmar-despesa') {
        screen = <Finance trip={trip} onNewExpense={() => { setDraft(null); navigate('nova-despesa'); }} />;
    } else {
        screen = <TripList trips={data.trips} onOpen={(id) => navigate('chat', id)} onCreate={() => navigate('nova-viagem')} />;
    }

    return (
        <>
            <a className="skip-link" href="#conteudo" onClick={(event) => {
                event.preventDefault();
                main.current?.focus();
                main.current?.scrollIntoView();
            }}>Ir para o conteúdo</a>
            {!showingAuth && <Header title={title} page={page} tripId={trip.id} insideTrip={insideTrip} onProfile={openProfile} />}
            <main id="conteudo" ref={main} tabIndex="-1">{screen}</main>
            {notice && <div className="toast" role="status">{notice}</div>}
            {!showingAuth && (
                <dialog className="profile-dialog" ref={profile} aria-labelledby="profile-title">
                    <div className="dialog-header">
                        <h2 id="profile-title">Meu perfil</h2>
                        <button className="icon-button" type="button" aria-label="Fechar perfil" onClick={() => profile.current?.close()}>×</button>
                    </div>
                    <form onSubmit={saveProfile}>
                        <div className="field">
                            <label htmlFor="profile-name">Seu nome</label>
                            <input id="profile-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength="40" autoComplete="given-name" required />
                        </div>
                        <button className="button button-primary" type="submit">Salvar</button>
                        <a className="button button-secondary" href="#viagens" onClick={() => profile.current?.close()}>Minhas viagens</a>
                        <button className="button button-text" type="button" onClick={logout}>Sair da conta</button>
                    </form>
                </dialog>
            )}
        </>
    );
}
