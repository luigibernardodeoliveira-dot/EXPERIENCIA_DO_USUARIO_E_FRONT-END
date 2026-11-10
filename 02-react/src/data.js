export const storageKey = 'fei-viagens-react-v2';

export function initialData() {
    const members = ['Ana', 'Bruno', 'Carla', 'Você'];

    return {
        userName: 'Você',
        account: null,
        session: false,
        trips: [
            {
                id: 'rio2026',
                destination: 'Rio de Janeiro',
                start: '2026-12-11',
                end: '2026-12-13',
                image: '',
                members,
                messages: [
                    { author: 'Ana', time: '10:20', text: 'Pessoal, vamos decidir o passeio de sábado?' },
                    { author: 'Bruno', time: '10:22', text: 'Quero conhecer o Pão de Açúcar! Já deixei meu voto no roteiro.' },
                    { author: 'Você', time: '10:24', text: 'Também votei! Podemos ir à praia no domingo.', own: true },
                    { author: 'Carla', time: '10:26', text: 'Combinado! Vou conferir as opções.' }
                ],
                polls: [
                    {
                        question: 'Qual passeio faremos no sábado?',
                        options: ['Pão de Açúcar', 'Cristo Redentor', 'Jardim Botânico'],
                        votes: [2, 1, 1],
                        selected: 0
                    },
                    {
                        question: 'Qual praia visitaremos no domingo?',
                        options: ['Ipanema', 'Copacabana', 'Barra da Tijuca'],
                        votes: [3, 1, 0],
                        selected: 0
                    }
                ],
                expenses: [
                    { description: 'Hospedagem', detail: 'Apartamento', total: 120000, shares: [30000, 30000, 30000, 30000], members, equal: true },
                    { description: 'Transporte', detail: 'Traslado', total: 24000, shares: [6000, 6000, 6000, 6000], members, equal: true },
                    { description: 'Compras do grupo', detail: 'Mercado', total: 16000, shares: [4000, 4000, 4000, 4000], members, equal: true }
                ]
            },
            {
                id: 'floripa2026', destination: 'Florianópolis', start: '2026-12-20', end: '2026-12-23',
                image: '', members, messages: [], polls: [], expenses: []
            },
            {
                id: 'gramado2027', destination: 'Gramado', start: '2027-07-10', end: '2027-07-15',
                image: '', members, messages: [], polls: [], expenses: []
            }
        ]
    };
}

export function newTrip(destination, start, end, image = '', id = 'viagem-' + Date.now()) {
    return {
        id,
        destination,
        start,
        end,
        image,
        members: ['Ana', 'Bruno', 'Carla', 'Você'],
        messages: [],
        polls: [],
        expenses: []
    };
}

export function loadData() {
    let data;

    try {
        data = JSON.parse(localStorage.getItem(storageKey));
    } catch {
        data = null;
    }

    if (!data || !Array.isArray(data.trips) || !data.trips.length || !data.userName) {
        data = initialData();
    } else {
        data = {
            ...initialData(),
            ...data,
            account: data.account && typeof data.account === 'object' ? data.account : null,
            session: data.session === true && Boolean(data.account)
        };
    }

    const parameters = new URLSearchParams(location.search);
    const id = parameters.get('convite');
    const destination = parameters.get('destino');
    const start = parameters.get('inicio');
    const end = parameters.get('fim');

    if (id && id.length <= 80 && destination && validDate(start) && validDate(end) && end >= start) {
        if (!data.trips.some((trip) => trip.id === id)) {
            data.trips.push(newTrip(destination.slice(0, 60), start, end, '', id));
        }

        history.replaceState(null, '', location.pathname + '#chat/' + encodeURIComponent(id));
    }

    return data;
}

export function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
    const date = new Date(value + 'T12:00:00');
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
