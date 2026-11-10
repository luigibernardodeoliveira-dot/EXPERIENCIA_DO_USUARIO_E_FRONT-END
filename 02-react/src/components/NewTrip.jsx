import { useState } from 'react';
import ImageUpload from './ImageUpload.jsx';
import { validDate } from '../data.js';

export default function NewTrip({ onCreate }) {
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function submit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const startDate = form.get('inicio');
        const endDate = form.get('fim');

        if (!destination.trim()) {
            setError('Informe o destino da viagem.');
        } else if (!validDate(startDate) || !validDate(endDate) || endDate < startDate) {
            setError('Confira as datas. A data final deve ser igual ou posterior à inicial.');
        } else {
            onCreate(destination.trim(), startDate, endDate, image);
        }
    }

    return (
        <section className="page page-create">
            <form className="form-card" onSubmit={submit}>
                <div className="field">
                    <label htmlFor="destination">Destino</label>
                    <input id="destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Digite o destino da viagem" maxLength="60" required />
                </div>
                <div className="field">
                    <label htmlFor="start-date">Data inicial</label>
                    <input id="start-date" name="inicio" type="date" value={start} onInput={(event) => setStart(event.target.value)} onChange={(event) => setStart(event.target.value)} required />
                </div>
                <div className="field">
                    <label htmlFor="end-date">Data final</label>
                    <input id="end-date" name="fim" type="date" value={end} min={start} onInput={(event) => setEnd(event.target.value)} onChange={(event) => setEnd(event.target.value)} required />
                </div>
                <ImageUpload id="trip-image" label="Imagem (opcional)" buttonText="Adicionar imagem" value={image} onChange={setImage} onLoading={setLoading} />
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit" disabled={loading}>
                    {loading ? 'Carregando imagem...' : 'Criar viagem'}
                </button>
            </form>
        </section>
    );
}
