import { useState } from 'react';

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (digits.length < 3) return digits ? '(' + digits : '';
    if (digits.length < 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length < 11) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
}

function Welcome({ hasAccount, onNavigate }) {
    return (
        <section className="auth-shell">
            <div className="auth-brand">FEI Viagens</div>
            <div className="auth-card welcome-card">
                <p className="auth-kicker">Planejamento em grupo</p>
                <h1>Organize e planeje<br />viagens em grupo.</h1>
                <p className="auth-copy">Crie roteiros, converse com o grupo e acompanhe as despesas em um só lugar.</p>
                <button className="button button-primary" type="button" onClick={() => onNavigate('cadastro')}>Criar conta</button>
                <span className="auth-or">ou</span>
                <button className="button button-outline" type="button" onClick={() => onNavigate('login')}>Fazer login</button>
                {hasAccount && <p className="auth-note">Já existe uma conta cadastrada neste navegador.</p>}
            </div>
        </section>
    );
}

function Signup({ onNavigate, onSignup }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');

    function submit(event) {
        event.preventDefault();
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        let message = '';

        if (cleanName.length < 3) message = 'Informe seu nome completo.';
        else if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) message = 'Informe um e-mail válido.';
        else if (phone.replace(/\D/g, '').length < 10) message = 'Informe um telefone válido.';
        else if (password.length < 6) message = 'A senha deve ter pelo menos 6 caracteres.';
        else if (password !== confirmation) message = 'As senhas não coincidem.';
        else if (!terms) message = 'Você precisa concordar com os termos de uso.';
        else message = onSignup({ name: cleanName, email: cleanEmail, phone, password });

        setError(message || '');
    }

    return (
        <section className="auth-shell">
            <div className="auth-brand">FEI Viagens</div>
            <form className="auth-card auth-form" onSubmit={submit} noValidate>
                <div className="auth-form-heading">
                    <p className="auth-kicker">Comece agora</p>
                    <h1>Criar conta</h1>
                    <p>Preencha seus dados para organizar a próxima viagem.</p>
                </div>
                <div className="field">
                    <label htmlFor="signup-name">Nome</label>
                    <input id="signup-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome completo" maxLength="80" autoComplete="name" required />
                </div>
                <div className="field">
                    <label htmlFor="signup-email">E-mail</label>
                    <input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" maxLength="100" autoComplete="email" required />
                </div>
                <div className="field">
                    <label htmlFor="signup-phone">Telefone</label>
                    <input id="signup-phone" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} inputMode="tel" placeholder="(00) 00000-0000" maxLength="15" autoComplete="tel" required />
                </div>
                <div className="field">
                    <label htmlFor="signup-password">Senha</label>
                    <input id="signup-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Crie uma senha" minLength="6" autoComplete="new-password" required />
                </div>
                <div className="field">
                    <label htmlFor="signup-confirmation">Confirmar senha</label>
                    <input id="signup-confirmation" type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Digite a senha novamente" minLength="6" autoComplete="new-password" required />
                </div>
                <label className="checkbox-field auth-terms">
                    <input type="checkbox" checked={terms} onChange={(event) => setTerms(event.target.checked)} />
                    Concordo com os termos de uso
                </label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit">Continuar</button>
                <button className="auth-link" type="button" onClick={() => onNavigate('boas-vindas')}>Voltar</button>
            </form>
        </section>
    );
}

function Login({ onNavigate, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function submit(event) {
        event.preventDefault();
        setError(onLogin(email.trim().toLowerCase(), password) || '');
    }

    return (
        <section className="auth-shell">
            <div className="auth-brand">FEI Viagens</div>
            <form className="auth-card auth-form login-form" onSubmit={submit} noValidate>
                <div className="auth-form-heading">
                    <p className="auth-kicker">Que bom ter você de volta</p>
                    <h1>Login</h1>
                    <p>Entre para acessar as suas viagens em grupo.</p>
                </div>
                <div className="field">
                    <label htmlFor="login-email">E-mail</label>
                    <input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" maxLength="100" autoComplete="email" required />
                </div>
                <div className="field">
                    <label htmlFor="login-password">Senha</label>
                    <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" autoComplete="current-password" required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit">Entrar</button>
                <button className="auth-link" type="button" onClick={() => onNavigate('boas-vindas')}>Voltar</button>
            </form>
        </section>
    );
}

export default function Auth({ page, hasAccount, onNavigate, onSignup, onLogin }) {
    if (page === 'cadastro') return <Signup onNavigate={onNavigate} onSignup={onSignup} />;
    if (page === 'login') return <Login onNavigate={onNavigate} onLogin={onLogin} />;
    return <Welcome hasAccount={hasAccount} onNavigate={onNavigate} />;
}
