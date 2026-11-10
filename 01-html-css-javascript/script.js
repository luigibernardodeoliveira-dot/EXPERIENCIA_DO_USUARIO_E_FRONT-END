const storageKey = 'fei-viagens-html-css-js-v2';
const content = document.getElementById('conteudo');
const title = document.getElementById('page-title');
const tabs = document.querySelector('.tabs');
const appHeader = document.getElementById('app-header');
const brandLink = document.getElementById('brand-link');
const profileButton = document.getElementById('profile-button');
let activeTripId = 'rio2026';
let pendingExpense = null;
let expenseDraft = null;
let toastTimer;

function startingData() {
    return {
        name: 'Você',
        account: null,
        session: false,
        trips: [
            {
                id: 'rio2026', destination: 'Rio de Janeiro', start: '2026-12-11', end: '2026-12-13', image: '',
                members: ['Ana', 'Bruno', 'Carla', 'Você'],
                messages: [
                    { author: 'Ana', time: '10:20', text: 'Pessoal, vamos decidir o passeio de sábado?' },
                    { author: 'Bruno', time: '10:22', text: 'Quero conhecer o Pão de Açúcar! Já deixei meu voto no roteiro.' },
                    { author: 'Você', time: '10:24', text: 'Também votei! Podemos ir à praia no domingo.', own: true },
                    { author: 'Carla', time: '10:26', text: 'Combinado! Vou conferir as opções.' }
                ],
                polls: [
                    { question: 'Qual passeio faremos no sábado?', options: ['Pão de Açúcar', 'Cristo Redentor', 'Jardim Botânico'], votes: [2, 1, 1], selected: 0 },
                    { question: 'Qual praia visitaremos no domingo?', options: ['Ipanema', 'Copacabana', 'Barra da Tijuca'], votes: [3, 1, 0], selected: 0 }
                ],
                expenses: [
                    { description: 'Hospedagem', detail: 'Apartamento', total: 120000, shares: [30000, 30000, 30000, 30000], members: ['Ana', 'Bruno', 'Carla', 'Você'], equal: true },
                    { description: 'Transporte', detail: 'Traslado', total: 24000, shares: [6000, 6000, 6000, 6000], members: ['Ana', 'Bruno', 'Carla', 'Você'], equal: true },
                    { description: 'Compras do grupo', detail: 'Mercado', total: 16000, shares: [4000, 4000, 4000, 4000], members: ['Ana', 'Bruno', 'Carla', 'Você'], equal: true }
                ]
            },
            { id: 'floripa2026', destination: 'Florianópolis', start: '2026-12-20', end: '2026-12-23', image: '', members: ['Ana', 'Bruno', 'Carla', 'Você'], messages: [], polls: [], expenses: [] },
            { id: 'gramado2027', destination: 'Gramado', start: '2027-07-10', end: '2027-07-15', image: '', members: ['Ana', 'Bruno', 'Carla', 'Você'], messages: [], polls: [], expenses: [] }
        ]
    };
}

function loadData() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && Array.isArray(saved.trips) && saved.trips.length > 0) {
            return {
                ...startingData(),
                ...saved,
                account: saved.account && typeof saved.account === 'object' ? saved.account : null,
                session: saved.session === true
            };
        }
    } catch (error) {
        return startingData();
    }
    return startingData();
}

let data = loadData();

function saveData() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        return true;
    } catch (error) {
        showToast('Não foi possível salvar no navegador. Os dados desta sessão continuam disponíveis.');
        return false;
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
}

function money(cents) {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function readMoney(value) {
    let cleaned = value.trim().replace(/^R\$\s*/, '').replace(/\s/g, '');
    const brazilian = /^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(cleaned);
    if (brazilian) cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    else if (/^\d+(,\d{1,2})?$/.test(cleaned)) cleaned = cleaned.replace(',', '.');
    else if (!/^\d+\.\d{1,2}$/.test(cleaned)) {
        return NaN;
    }
    const amount = Math.round(Number(cleaned) * 100);
    return Number.isSafeInteger(amount) && amount <= 100000000 ? amount : NaN;
}

function currentTrip() {
    return data.trips.find(function (trip) { return trip.id === activeTripId; }) || data.trips[0];
}

function showToast(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4500);
}

function goTo(page) {
    const tripPages = ['chat', 'roteiro', 'financeiro', 'nova-despesa', 'confirmar-despesa', 'viagem-criada'];
    const hash = page + (tripPages.includes(page) ? '/' + encodeURIComponent(activeTripId) : '');
    if (location.hash === '#' + hash) {
        render();
    } else {
        location.hash = hash;
    }
}

function isAuthPage(page) {
    return ['boas-vindas', 'cadastro', 'login'].includes(page);
}

function firstName(name) {
    return String(name || 'Você').trim().split(/\s+/)[0] || 'Você';
}

function renderWelcome() {
    const signedUp = Boolean(data.account);
    content.innerHTML = '<section class="auth-shell"><div class="auth-brand">FEI Viagens</div><div class="auth-card welcome-card"><p class="auth-kicker">Planejamento em grupo</p><h1>Organize e planeje<br>viagens em grupo.</h1><p class="auth-copy">Crie roteiros, converse com o grupo e acompanhe as despesas em um só lugar.</p><button class="button button-primary" id="create-account" type="button">Criar conta</button><span class="auth-or">ou</span><button class="button button-outline" id="go-login" type="button">Fazer login</button>' + (signedUp ? '<p class="auth-note">Já existe uma conta cadastrada neste navegador.</p>' : '') + '</div></section>';
    document.getElementById('create-account').onclick = function () { goTo('cadastro'); };
    document.getElementById('go-login').onclick = function () { goTo('login'); };
}

function renderSignUp() {
    content.innerHTML = '<section class="auth-shell"><div class="auth-brand">FEI Viagens</div><form class="auth-card auth-form" id="signup-form"><div class="auth-form-heading"><p class="auth-kicker">Comece agora</p><h1>Criar conta</h1><p>Preencha seus dados para organizar a próxima viagem.</p></div><div class="field"><label for="signup-name">Nome</label><input id="signup-name" name="name" placeholder="Seu nome completo" maxlength="80" autocomplete="name" required></div><div class="field"><label for="signup-email">E-mail</label><input id="signup-email" name="email" type="email" placeholder="seuemail@exemplo.com" maxlength="100" autocomplete="email" required></div><div class="field"><label for="signup-phone">Telefone</label><input id="signup-phone" name="phone" inputmode="tel" placeholder="(00) 00000-0000" maxlength="15" autocomplete="tel" required></div><div class="field"><label for="signup-password">Senha</label><input id="signup-password" name="password" type="password" placeholder="Crie uma senha" minlength="6" autocomplete="new-password" required></div><div class="field"><label for="signup-confirmation">Confirmar senha</label><input id="signup-confirmation" name="confirmation" type="password" placeholder="Digite a senha novamente" minlength="6" autocomplete="new-password" required></div><label class="checkbox-field auth-terms"><input id="signup-terms" type="checkbox">Concordo com os termos de uso</label><p class="form-error" id="signup-error" role="alert" hidden></p><button class="button button-primary" type="submit">Continuar</button><button class="auth-link" id="back-welcome" type="button">Voltar</button></form></section>';
    const phone = document.getElementById('signup-phone');
    phone.oninput = function () { phone.value = formatPhone(phone.value); };
    document.getElementById('back-welcome').onclick = function () { goTo('boas-vindas'); };
    document.getElementById('signup-form').onsubmit = function (event) {
        event.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const phoneValue = document.getElementById('signup-phone').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmation = document.getElementById('signup-confirmation').value;
        const terms = document.getElementById('signup-terms').checked;
        let error = '';
        if (name.length < 3) error = 'Informe seu nome completo.';
        else if (!/^\S+@\S+\.\S+$/.test(email)) error = 'Informe um e-mail válido.';
        else if (phoneValue.replace(/\D/g, '').length < 10) error = 'Informe um telefone válido.';
        else if (password.length < 6) error = 'A senha deve ter pelo menos 6 caracteres.';
        else if (password !== confirmation) error = 'As senhas não coincidem.';
        else if (!terms) error = 'Você precisa concordar com os termos de uso.';
        else if (data.account && data.account.email === email) error = 'Este e-mail já possui uma conta. Faça login para continuar.';
        if (error) {
            const errorElement = document.getElementById('signup-error');
            errorElement.textContent = error;
            errorElement.hidden = false;
            return;
        }
        data.account = { name: name, email: email, phone: phoneValue, password: password };
        data.name = firstName(name);
        data.session = true;
        saveData();
        showToast('Conta criada com sucesso!');
        goTo('viagens');
    };
}

function renderLogin() {
    content.innerHTML = '<section class="auth-shell"><div class="auth-brand">FEI Viagens</div><form class="auth-card auth-form login-form" id="login-form"><div class="auth-form-heading"><p class="auth-kicker">Que bom ter você de volta</p><h1>Login</h1><p>Entre para acessar as suas viagens em grupo.</p></div><div class="field"><label for="login-email">E-mail</label><input id="login-email" type="email" placeholder="seuemail@exemplo.com" maxlength="100" autocomplete="email" required></div><div class="field"><label for="login-password">Senha</label><input id="login-password" type="password" placeholder="Digite sua senha" autocomplete="current-password" required></div><p class="form-error" id="login-error" role="alert" hidden></p><button class="button button-primary" type="submit">Entrar</button><button class="auth-link" id="back-from-login" type="button">Voltar</button></form></section>';
    document.getElementById('back-from-login').onclick = function () { goTo('boas-vindas'); };
    document.getElementById('login-form').onsubmit = function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');
        if (!data.account) {
            errorElement.textContent = 'Ainda não existe uma conta cadastrada neste navegador. Crie sua conta para continuar.';
            errorElement.hidden = false;
            return;
        }
        if (data.account.email !== email || data.account.password !== password) {
            errorElement.textContent = 'E-mail ou senha não conferem.';
            errorElement.hidden = false;
            return;
        }
        data.name = firstName(data.account.name);
        data.session = true;
        saveData();
        showToast('Login realizado. Bem-vindo(a), ' + data.name + '!');
        goTo('viagens');
    };
}

function renderAuth(page) {
    if (page === 'cadastro') renderSignUp();
    else if (page === 'login') renderLogin();
    else renderWelcome();
}

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length < 3) return digits ? '(' + digits : '';
    if (digits.length < 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    if (digits.length < 11) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
}

function render() {
    const parts = location.hash.slice(1).split('/');
    let page = parts[0] || 'boas-vindas';
    if (!isAuthPage(page) && !data.session) page = 'boas-vindas';
    const auth = isAuthPage(page);
    document.body.classList.toggle('auth-mode', auth);
    appHeader.hidden = auth;
    brandLink.href = data.session ? '#viagens' : '#boas-vindas';
    profileButton.hidden = !data.session;
    if (auth) {
        tabs.hidden = true;
        document.title = (page === 'cadastro' ? 'Criar conta' : page === 'login' ? 'Login' : 'FEI Viagens') + ' | FEI Viagens';
        renderAuth(page);
        window.scrollTo(0, 0);
        content.focus({ preventScroll: true });
        return;
    }
    if (parts[1]) {
        let tripId;
        try {
            tripId = decodeURIComponent(parts[1]);
        } catch (error) {
            tripId = '';
        }
        const selected = data.trips.find(function (trip) { return trip.id === tripId; });
        if (selected) activeTripId = selected.id;
        else page = 'viagens';
    }
    const trip = currentTrip();
    const insideTrip = ['chat', 'roteiro', 'financeiro', 'nova-despesa', 'confirmar-despesa'].includes(page);
    title.textContent = insideTrip ? trip.destination : page === 'nova-viagem' ? 'Criar viagem' : page === 'viagem-criada' ? 'Viagem criada!' : 'Minhas viagens';
    tabs.hidden = !insideTrip;
    document.querySelectorAll('.tab').forEach(function (tab) {
        const name = tab.dataset.tab;
        const active = name === page || (name === 'financeiro' && ['nova-despesa', 'confirmar-despesa'].includes(page));
        tab.href = '#' + name + '/' + encodeURIComponent(activeTripId);
        tab.classList.toggle('active', active);
        if (active) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
    });
    document.title = title.textContent + ' | FEI Viagens';
    if (page === 'nova-viagem') renderNewTrip();
    else if (page === 'viagem-criada') renderCreated();
    else if (page === 'chat') renderChat();
    else if (page === 'roteiro') renderPolls();
    else if (page === 'financeiro') renderFinance();
    else if (page === 'nova-despesa') renderExpense();
    else if (page === 'confirmar-despesa' && pendingExpense && pendingExpense.tripId === trip.id) renderConfirmation();
    else if (page === 'confirmar-despesa') goTo('financeiro');
    else renderTrips();
    window.scrollTo(0, 0);
    content.focus({ preventScroll: true });
}

function renderTrips() {
    content.innerHTML = '<section class="page page-trips"><div class="trip-grid">' + data.trips.map(function (trip) {
        const picture = trip.image && /^data:image\/(jpeg|png|webp);base64,/.test(trip.image)
            ? '<img src="' + trip.image + '" alt="' + escapeHtml(trip.destination) + '">'
            : 'Imagem opcional';
        return '<button class="trip-card" type="button" data-trip="' + escapeHtml(trip.id) + '"><span class="trip-image">' + picture + '</span><span class="trip-info"><h2>' + escapeHtml(trip.destination) + '</h2><p>' + trip.start.slice(0, 4) + '</p></span></button>';
    }).join('') + '</div><button class="button button-primary create-trip-button" id="new-trip" type="button">+ Criar nova viagem</button></section>';
    document.getElementById('new-trip').onclick = function () { goTo('nova-viagem'); };
    document.querySelectorAll('[data-trip]').forEach(function (button) {
        button.onclick = function () { activeTripId = button.dataset.trip; goTo('chat'); };
    });
}

function uploadField(id, label, buttonText) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><label class="button button-outline upload-button" for="' + id + '">' + buttonText + '</label><input class="upload-input" id="' + id + '" type="file" accept="image/png,image/jpeg,image/webp"><img class="preview-image" id="' + id + '-preview" alt="Imagem selecionada" hidden></div>';
}

function readImage(input, onRead) {
    input.addEventListener('change', function () {
        const file = input.files[0];
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
            showToast('Escolha uma imagem JPG, PNG ou WebP de até 5 MB.');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function () {
            const image = new Image();
            image.onload = function () {
                const scale = Math.min(1, 900 / Math.max(image.width, image.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                const result = canvas.toDataURL('image/jpeg', 0.75);
                const preview = document.getElementById(input.id + '-preview');
                preview.src = result;
                preview.hidden = false;
                onRead(result);
            };
            image.onerror = function () { showToast('Não foi possível abrir esta imagem.'); };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

function renderNewTrip() {
    content.innerHTML = '<section class="page page-create"><form class="form-card" id="trip-form"><div class="field"><label for="destination">Destino</label><input id="destination" name="destino" placeholder="Digite o destino da viagem" maxlength="60" required></div><div class="field"><label for="start-date">Data inicial</label><input id="start-date" name="inicio" type="date" required></div><div class="field"><label for="end-date">Data final</label><input id="end-date" name="fim" type="date" required></div>' + uploadField('trip-image', 'Imagem (opcional)', 'Adicionar imagem') + '<p class="form-error" id="trip-error" role="alert" hidden></p><button class="button button-primary" type="submit">Criar viagem</button></form></section>';
    let tripImage = '';
    readImage(document.getElementById('trip-image'), function (image) { tripImage = image; });
    document.getElementById('start-date').onchange = function () {
        document.getElementById('end-date').min = this.value;
    };
    document.getElementById('trip-form').onsubmit = function (event) {
        event.preventDefault();
        const destination = document.getElementById('destination').value.trim();
        const start = document.getElementById('start-date').value;
        const end = document.getElementById('end-date').value;
        if (!destination || end < start) {
            const error = document.getElementById('trip-error');
            error.textContent = !destination ? 'Informe o destino da viagem.' : 'A data final deve ser igual ou posterior à data inicial.';
            error.hidden = false;
            return;
        }
        activeTripId = 'viagem-' + Date.now();
        data.trips.push({ id: activeTripId, destination: destination, start: start, end: end, image: tripImage, members: ['Ana', 'Bruno', 'Carla', 'Você'], messages: [], polls: [], expenses: [] });
        saveData();
        goTo('viagem-criada');
    };
}

function invitationLink() {
    const trip = currentTrip();
    const url = new URL(location.href);
    url.hash = '';
    url.search = '';
    url.searchParams.set('convite', trip.id);
    url.searchParams.set('destino', trip.destination);
    url.searchParams.set('inicio', trip.start);
    url.searchParams.set('fim', trip.end);
    return url.href;
}

function renderCreated() {
    content.innerHTML = '<section class="page page-created"><div class="created-content"><div class="success-mark" aria-hidden="true">✓</div><div class="invite-card"><label>Link de convite</label><button class="invite-link" id="copy-invite" type="button" title="Copiar link de convite">' + escapeHtml('fei.viagens/convite/' + currentTrip().id) + '</button></div><button class="button button-primary" id="share-invite" type="button">Compartilhar pelo WhatsApp</button><a class="created-continue" href="#chat/' + encodeURIComponent(activeTripId) + '">Abrir viagem</a></div></section>';
    document.getElementById('copy-invite').onclick = async function () {
        try {
            await navigator.clipboard.writeText(invitationLink());
            showToast('Link de convite copiado!');
        } catch (error) {
            const link = document.getElementById('copy-invite');
            link.textContent = invitationLink();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(link);
            selection.removeAllRanges();
            selection.addRange(range);
            showToast('Selecione e copie o link exibido.');
        }
    };
    document.getElementById('share-invite').onclick = function () {
        if (location.protocol === 'file:') {
            showToast('Para compartilhar o convite, use uma versão hospedada do site.');
            return;
        }
        const message = 'Vamos viajar para ' + currentTrip().destination + '? ' + invitationLink();
        window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
    };
}

function renderChat() {
    const trip = currentTrip();
    content.innerHTML = '<section class="page page-chat"><div class="chat-heading"><h2>Chat do grupo</h2><p class="muted">Ana, Bruno, Carla e você</p></div><div class="chat-panel" id="messages" role="log" aria-label="Mensagens da viagem"><div class="day-label">Hoje</div>' + trip.messages.map(function (message) {
        return '<article class="message' + (message.own ? ' own' : '') + '"><div class="message-meta"><strong>' + escapeHtml(message.own ? data.name : message.author) + '</strong><time>' + escapeHtml(message.time) + '</time></div><p class="message-text">' + escapeHtml(message.text) + '</p></article>';
    }).join('') + (trip.messages.length ? '' : '<p class="notice">Comece a conversa sobre a viagem.</p>') + '</div><form class="chat-form" id="chat-form"><div class="field"><label for="message-input">Mensagem</label><input id="message-input" placeholder="Digite sua mensagem" maxlength="1000" required autocomplete="off"></div><button class="button button-primary" type="submit">Enviar</button></form></section>';
    document.getElementById('chat-form').onsubmit = function (event) {
        event.preventDefault();
        const input = document.getElementById('message-input');
        const text = input.value.trim();
        if (!text) { input.value = ''; return; }
        trip.messages.push({ author: data.name, text: text, own: true, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) });
        saveData();
        renderChat();
        document.getElementById('message-input').focus();
        const panel = document.getElementById('messages');
        panel.scrollTop = panel.scrollHeight;
    };
}

function renderPolls() {
    const polls = currentTrip().polls;
    content.innerHTML = '<section class="page page-route"><h2>Votações do roteiro</h2><p class="muted">Escolha suas opções e acompanhe o resultado atual do grupo.</p><div class="poll-grid">' + polls.map(function (poll, pollIndex) {
        const total = poll.votes.reduce(function (sum, votes) { return sum + votes; }, 0);
        return '<fieldset class="poll-card"><legend>' + escapeHtml(poll.question) + '</legend><p class="muted">Selecione uma opção · ' + total + ' votos</p>' + poll.options.map(function (option, optionIndex) {
            const percentage = total ? Math.round(poll.votes[optionIndex] / total * 100) : 0;
            const selected = poll.selected === optionIndex;
            return '<label class="poll-option' + (selected ? ' selected' : '') + '"><span class="poll-option-top"><input type="radio" name="poll-' + pollIndex + '" data-poll="' + pollIndex + '" value="' + optionIndex + '"' + (selected ? ' checked' : '') + '><span>' + escapeHtml(option) + '</span></span><span class="poll-option-meta"><span>' + poll.votes[optionIndex] + (poll.votes[optionIndex] === 1 ? ' voto' : ' votos') + '</span><span>' + percentage + '%</span></span><span class="poll-bar"><span style="width:' + percentage + '%"></span></span></label>';
        }).join('') + '<p class="your-vote">' + (poll.selected !== null ? 'Seu voto: ' + escapeHtml(poll.options[poll.selected]) : 'Você ainda não votou.') + '</p></fieldset>';
    }).join('') + '</div>' + (polls.length ? '' : '<div class="notice">Ainda não há enquetes nesta viagem.</div>') + '</section>';
    document.querySelectorAll('[data-poll]').forEach(function (input) {
        input.onchange = function () {
            const pollIndex = Number(input.dataset.poll);
            const poll = polls[pollIndex];
            if (poll.selected !== null) poll.votes[poll.selected]--;
            poll.selected = Number(input.value);
            poll.votes[poll.selected]++;
            saveData();
            renderPolls();
            document.querySelector('[data-poll="' + pollIndex + '"][value="' + poll.selected + '"]').focus();
            showToast('Voto registrado!');
        };
    });
}

function ownShare(expense) {
    const index = expense.members.indexOf('Você');
    return index === -1 ? 0 : expense.shares[index];
}

function renderFinance() {
    const expenses = currentTrip().expenses;
    const total = expenses.reduce(function (sum, expense) { return sum + ownShare(expense); }, 0);
    const allEqual = expenses.every(function (expense) { return expense.equal && expense.members.length === 4; });
    content.innerHTML = '<section class="page page-finance"><div class="balance-card"><p class="balance-label">Você tem a pagar</p><p class="balance-value">' + money(total) + '</p><p class="muted">Esse valor corresponde às despesas “rachadas” do grupo.</p></div><h2>Histórico de despesas</h2><p class="muted">' + (allEqual ? 'Valores divididos igualmente entre 4 pessoas.' : 'Confira a sua parte em cada despesa do grupo.') + '</p><div class="expense-table"><div class="expense-row table-head"><span>Despesa</span><span>Total da despesa</span><span>Sua parte</span></div>' + expenses.map(function (expense) {
        return '<div class="expense-row"><div class="expense-description"><strong>' + escapeHtml(expense.description) + '</strong><p>' + escapeHtml(expense.detail || (expense.equal ? 'Divisão igual' : 'Valores por participante')) + ' · ' + expense.members.length + ' pessoas</p></div><div class="expense-total"><span class="mobile-label">Total da despesa</span>' + money(expense.total) + '</div><div class="expense-share"><span class="mobile-label">Sua parte</span>' + money(ownShare(expense)) + '</div></div>';
    }).join('') + '</div>' + (expenses.length ? '' : '<p class="notice">Nenhuma despesa cadastrada. Adicione o primeiro gasto da viagem.</p>') + '<button class="button button-primary" id="new-expense" type="button">+ Nova despesa</button></section>';
    document.getElementById('new-expense').onclick = function () {
        expenseDraft = null;
        pendingExpense = null;
        goTo('nova-despesa');
    };
}

function splitEqually(total, count) {
    const base = Math.floor(total / count);
    const remainder = total % count;
    return Array.from({ length: count }, function (_, index) { return base + (index < remainder ? 1 : 0); });
}

function selectedMembers(count) {
    const members = currentTrip().members;
    return members.slice(0, count - 1).concat('Você');
}

function renderExpense() {
    const draft = expenseDraft && expenseDraft.tripId === activeTripId ? expenseDraft : { total: 24000, description: 'Jantar do grupo', count: 4, equal: true, receipt: '', values: [8000, 6000, 5000, 5000] };
    content.innerHTML = '<section class="page page-expense"><h2>Nova despesa</h2><form class="form-card expense-form" id="expense-form"><div class="expense-columns"><div class="form-column"><div class="field"><label for="expense-value">Valor da despesa</label><input id="expense-value" inputmode="decimal" value="' + money(draft.total) + '" required></div>' + uploadField('receipt', 'Foto do recibo (opcional)', 'Adicionar foto') + '<div class="field"><label for="expense-description">Descrição</label><input id="expense-description" value="' + escapeHtml(draft.description) + '" maxlength="80" required></div></div><div class="form-column"><div class="field"><label for="people-count">Quantidade de pessoas no rateio</label><input id="people-count" type="number" min="1" max="4" step="1" value="' + draft.count + '" required></div><label class="checkbox-field"><input id="equal-split" type="checkbox"' + (draft.equal ? ' checked' : '') + '>Dividir igualmente</label><p class="split-description" id="split-description"></p><div class="participant-grid" id="participant-fields"></div><p class="split-summary" id="split-summary" aria-live="polite"></p></div></div><p class="form-error" id="expense-error" role="alert" hidden></p><button class="button button-primary" type="submit">Salvar despesa</button></form></section>';
    let receipt = draft.receipt;
    if (receipt) {
        document.getElementById('receipt-preview').src = receipt;
        document.getElementById('receipt-preview').hidden = false;
    }
    readImage(document.getElementById('receipt'), function (image) { receipt = image; });
    const customValues = {};
    selectedMembers(draft.count).forEach(function (name, index) {
        customValues[name] = draft.values[index] || 0;
    });

    function updateSplit() {
        document.querySelectorAll('.participant-value').forEach(function (input) { customValues[input.dataset.member] = readMoney(input.value) || 0; });
        const count = Number(document.getElementById('people-count').value);
        const total = readMoney(document.getElementById('expense-value').value);
        const equal = document.getElementById('equal-split').checked;
        const description = document.getElementById('split-description');
        const fields = document.getElementById('participant-fields');
        const summary = document.getElementById('split-summary');
        summary.textContent = '';
        if (!Number.isInteger(count) || count < 1 || count > 4) {
            description.textContent = 'Escolha de 1 a 4 pessoas do grupo.';
            fields.innerHTML = '';
            return;
        }
        const names = selectedMembers(count);
        if (equal) {
            fields.innerHTML = '';
            const shares = splitEqually(Number.isFinite(total) ? total : 0, count);
            const namesText = names.length > 1 ? names.slice(0, -1).join(', ') + ' e você participam' : 'Você participa';
            description.textContent = namesText + ' do rateio. ' + money(shares[shares.length - 1]) + ' por pessoa.';
            if (total % count !== 0 && Number.isFinite(total)) summary.textContent = 'Os centavos restantes serão distribuídos entre os primeiros participantes.';
        } else {
            description.textContent = 'Informe o valor de cada participante.';
            fields.innerHTML = names.map(function (name, index) {
                return '<div class="field participant-field"><label for="participant-' + index + '">' + escapeHtml(name) + '</label><input class="participant-value" data-member="' + escapeHtml(name) + '" id="participant-' + index + '" inputmode="decimal" value="' + money(customValues[name] || 0) + '" required></div>';
            }).join('');
        }
    }

    document.getElementById('people-count').oninput = updateSplit;
    document.getElementById('equal-split').onchange = updateSplit;
    document.getElementById('expense-value').oninput = updateSplit;
    updateSplit();
    document.getElementById('expense-form').onsubmit = function (event) {
        event.preventDefault();
        const total = readMoney(document.getElementById('expense-value').value);
        const description = document.getElementById('expense-description').value.trim();
        const count = Number(document.getElementById('people-count').value);
        const equal = document.getElementById('equal-split').checked;
        const values = Array.from(document.querySelectorAll('.participant-value'), function (input) { return readMoney(input.value); });
        let error = '';
        if (!Number.isFinite(total) || total <= 0) error = 'Informe um valor válido maior que zero. Use vírgula para os centavos.';
        else if (!description) error = 'Informe uma descrição para a despesa.';
        else if (!Number.isInteger(count) || count < 1 || count > 4) error = 'Escolha de 1 a 4 pessoas para o rateio.';
        else if (!equal && values.some(function (value) { return !Number.isFinite(value) || value < 0; })) error = 'Confira os valores de cada participante.';
        else if (!equal && values.reduce(function (sum, value) { return sum + value; }, 0) !== total) error = 'A soma dos valores por participante deve ser igual a ' + money(total) + '.';
        if (error) {
            const errorElement = document.getElementById('expense-error');
            errorElement.textContent = error;
            errorElement.hidden = false;
            errorElement.scrollIntoView({ block: 'nearest' });
            return;
        }
        expenseDraft = { tripId: activeTripId, total: total, description: description, count: count, equal: equal, receipt: receipt, values: equal ? selectedMembers(count).map(function (name) { return customValues[name] || 0; }) : values };
        pendingExpense = { tripId: activeTripId, total: total, description: description, equal: equal, receipt: receipt, members: selectedMembers(count), shares: equal ? splitEqually(total, count) : values };
        goTo('confirmar-despesa');
    };
}

function renderConfirmation() {
    const expense = pendingExpense;
    content.innerHTML = '<section class="page page-confirm"><h2>Confirmar despesa</h2><div class="confirm-total"><p>Valor total da despesa</p><strong>' + money(expense.total) + '</strong><p>' + escapeHtml(expense.description) + '</p></div><h3>Participantes do rateio</h3><p class="muted">' + expense.members.length + ' pessoas · ' + (expense.equal ? 'Divisão igual' : 'Valores por participante') + '</p><div class="confirm-list">' + expense.members.map(function (member, index) {
        return '<div class="confirm-row"><span>' + escapeHtml(member) + '</span><strong>' + money(expense.shares[index]) + '</strong></div>';
    }).join('') + '</div><div class="confirm-actions"><button class="button button-primary" id="confirm-expense" type="button">Confirmar despesa</button><button class="button button-secondary" id="edit-expense" type="button">Voltar e editar</button></div></section>';
    document.getElementById('edit-expense').onclick = function () { goTo('nova-despesa'); };
    document.getElementById('confirm-expense').onclick = function () {
        if (!pendingExpense) return;
        this.disabled = true;
        currentTrip().expenses.push(pendingExpense);
        pendingExpense = null;
        expenseDraft = null;
        const saved = saveData();
        goTo('financeiro');
        if (saved) showToast('Despesa adicionada!');
    };
}

const profileDialog = document.getElementById('profile-dialog');
document.querySelector('.skip-link').onclick = function (event) {
    event.preventDefault();
    content.focus();
    content.scrollIntoView();
};
profileButton.onclick = function () {
    document.getElementById('profile-name').value = data.name;
    profileDialog.showModal();
};
document.getElementById('close-profile').onclick = function () { profileDialog.close(); };
document.getElementById('back-to-trips').onclick = function () { profileDialog.close(); };
document.getElementById('profile-form').onsubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('profile-name').value.trim();
    if (!name) return;
    data.name = firstName(name);
    if (data.account) data.account.name = name;
    saveData();
    profileDialog.close();
    render();
};
document.getElementById('logout-button').onclick = function () {
    data.session = false;
    saveData();
    profileDialog.close();
    activeTripId = data.trips[0].id;
    goTo('boas-vindas');
};

function checkInvitation() {
    const parameters = new URLSearchParams(location.search);
    const id = parameters.get('convite');
    const destination = parameters.get('destino');
    const start = parameters.get('inicio');
    const end = parameters.get('fim');
    if (!id || !destination || !/^\d{4}-\d{2}-\d{2}$/.test(start || '') || !/^\d{4}-\d{2}-\d{2}$/.test(end || '') || end < start) return;
    if (!data.trips.some(function (trip) { return trip.id === id; })) {
        data.trips.push({ id: id.slice(0, 80), destination: destination.slice(0, 60), start: start, end: end, image: '', members: ['Ana', 'Bruno', 'Carla', 'Você'], messages: [], polls: [], expenses: [] });
        saveData();
    }
    activeTripId = id.slice(0, 80);
    history.replaceState(null, '', location.pathname + '#chat/' + encodeURIComponent(activeTripId));
}

checkInvitation();
window.addEventListener('hashchange', render);
render();
