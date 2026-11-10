export default function Header({ title, page, tripId, insideTrip, onProfile }) {
    const activeTab = ['nova-despesa', 'confirmar-despesa'].includes(page) ? 'financeiro' : page;

    return (
        <>
            <header className="app-header">
                <div className="header-top">
                    <a className="brand" href="#viagens" aria-label="FEI Viagens — Minhas viagens">FEI Viagens</a>
                    <button className="profile-button" type="button" aria-label="Abrir meu perfil" onClick={onProfile}>
                        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                            <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M6 28v-3a10 10 0 0 1 20 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <h1>{title}</h1>
            </header>
            {insideTrip && (
                <nav className="tabs" aria-label="Seções da viagem">
                    {[
                        ['chat', 'Chat'],
                        ['roteiro', 'Roteiro'],
                        ['financeiro', 'Financeiro']
                    ].map(([id, label]) => (
                        <a
                            key={id}
                            className={'tab' + (activeTab === id ? ' active' : '')}
                            href={'#' + id + '/' + encodeURIComponent(tripId)}
                            aria-current={activeTab === id ? 'page' : undefined}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            )}
        </>
    );
}
