import React from 'react';

export default function TripList({ trips, onOpen, onCreate }) {
    return (
        <section className="page page-trips">
            <div className="trip-grid">
                {trips.map(function (trip) {
                    return (
                        <button
                            className="trip-card"
                            key={trip.id}
                            type="button"
                            onClick={function () { onOpen(trip.id); }}
                            aria-label={'Abrir viagem para ' + trip.destination}
                        >
                            <span className="trip-image">
                                {trip.image ? (
                                    <img src={trip.image} alt={trip.destination} />
                                ) : (
                                    'Imagem opcional'
                                )}
                            </span>
                            <span className="trip-info">
                                <h2>{trip.destination}</h2>
                                <p>{trip.start.slice(0, 4)}</p>
                            </span>
                        </button>
                    );
                })}
            </div>
            <button
                className="button button-primary create-trip-button"
                type="button"
                onClick={onCreate}
            >
                + Criar nova viagem
            </button>
        </section>
    );
}
