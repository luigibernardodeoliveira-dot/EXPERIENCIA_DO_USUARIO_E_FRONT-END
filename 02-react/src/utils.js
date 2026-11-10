export function money(cents) {
    return (cents / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function readMoney(value) {
    let cleaned = value.trim().replace(/^R\$\s*/, '').replace(/\s/g, '');

    if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(cleaned)) {
        cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else if (/^\d+(,\d{1,2})?$/.test(cleaned)) {
        cleaned = cleaned.replace(',', '.');
    } else if (!/^\d+\.\d{1,2}$/.test(cleaned)) {
        return NaN;
    }

    const cents = Math.round(Number(cleaned) * 100);
    return Number.isSafeInteger(cents) && cents <= 100000000 ? cents : NaN;
}

export function splitEqually(total, count) {
    const base = Math.floor(total / count);
    const extra = total % count;
    return Array.from({ length: count }, (_, index) => base + (index < extra ? 1 : 0));
}

export function ownShare(expense) {
    const index = expense.members.indexOf('Você');
    return index < 0 ? 0 : expense.shares[index];
}

export function readRoute() {
    const [page = 'boas-vindas', encodedId = 'rio2026'] = location.hash.slice(1).split('/');

    try {
        return { page: page || 'boas-vindas', tripId: decodeURIComponent(encodedId) };
    } catch {
        return { page: 'boas-vindas', tripId: 'rio2026' };
    }
}
