import { useState } from 'react';

export default function TripCreated({ trip, notify }) {
    const [showFullLink, setShowFullLink] = useState(false);
    const url = new URL(location.href);
    url.hash = '';
    url.search = '';
    url.searchParams.set('convite', trip.id);
    url.searchParams.set('destino', trip.destination);
    url.searchParams.set('inicio', trip.start);
    url.searchParams.set('fim', trip.end);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url.href);
            notify('Link de convite copiado!');
        } catch {
            setShowFullLink(true);
            notify('Selecione e copie o link exibido.');
        }
    }

    function share() {
        const message = 'Vamos viajar para ' + trip.destination + '? ' + url.href;
        window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
    }

    return (
        <section className="page page-created">
            <div className="created-content">
                <div className="success-mark" aria-hidden="true">✓</div>
                <div className="invite-card">
                    <p>Link de convite</p>
                    <button className="invite-link" type="button" onClick={copyLink} title="Copiar link de convite">
                        {showFullLink ? url.href : 'fei.viagens/convite/' + trip.id}
                    </button>
                </div>
                <button className="button button-primary" type="button" onClick={share}>Compartilhar pelo WhatsApp</button>
                <a className="created-continue" href={'#chat/' + encodeURIComponent(trip.id)}>Abrir viagem</a>
            </div>
        </section>
    );
}
