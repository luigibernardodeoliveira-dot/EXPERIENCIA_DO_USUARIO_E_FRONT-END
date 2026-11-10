import { useState } from 'react';
import ImageUpload from './ImageUpload.jsx';
import { money, readMoney, splitEqually } from '../utils.js';

export default function ExpenseForm({ trip, draft, onReview }) {
    const [value, setValue] = useState(money(draft?.total ?? 24000));
    const [description, setDescription] = useState(draft?.description ?? 'Jantar do grupo');
    const [count, setCount] = useState(String(draft?.members.length ?? 4));
    const [equal, setEqual] = useState(draft?.equal ?? true);
    const [receipt, setReceipt] = useState(draft?.receipt ?? '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [customValues, setCustomValues] = useState(() => {
        const values = { Ana: money(8000), Bruno: money(6000), Carla: money(5000), 'Você': money(5000) };
        draft?.members.forEach((name, index) => { values[name] = money(draft.shares[index]); });
        return values;
    });

    const peopleCount = Number(count);
    const validCount = Number.isInteger(peopleCount) && peopleCount >= 1 && peopleCount <= trip.members.length;
    const members = validCount ? trip.members.filter((name) => name !== 'Você').slice(0, peopleCount - 1).concat('Você') : [];
    const total = readMoney(value);
    const shares = validCount && Number.isFinite(total) ? splitEqually(total, peopleCount) : [];
    const memberNames = members.length > 1 ? members.slice(0, -1).join(', ') + ' e você participam' : 'Você participa';

    function submit(event) {
        event.preventDefault();
        const individualValues = members.map((name) => readMoney(customValues[name] ?? '0'));

        if (!Number.isFinite(total) || total <= 0) {
            setError('Informe um valor válido maior que zero.');
        } else if (!description.trim()) {
            setError('Informe uma descrição para a despesa.');
        } else if (!validCount) {
            setError('Escolha de 1 a ' + trip.members.length + ' pessoas para o rateio.');
        } else if (!equal && individualValues.some((amount) => !Number.isFinite(amount) || amount < 0)) {
            setError('Confira os valores de cada participante.');
        } else if (!equal && individualValues.reduce((sum, amount) => sum + amount, 0) !== total) {
            setError('A soma dos valores por participante deve ser igual a ' + money(total) + '.');
        } else {
            onReview({ total, description: description.trim(), equal, receipt, members, shares: equal ? shares : individualValues });
        }
    }

    return (
        <section className="page page-expense">
            <h2>Nova despesa</h2>
            <form className="form-card expense-form" onSubmit={submit}>
                <div className="expense-columns">
                    <div className="form-column">
                        <div className="field">
                            <label htmlFor="expense-value">Valor da despesa</label>
                            <input id="expense-value" inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} required />
                        </div>
                        <ImageUpload id="receipt" label="Foto do recibo (opcional)" buttonText="Adicionar foto" value={receipt} onChange={setReceipt} onLoading={setLoading} />
                        <div className="field">
                            <label htmlFor="expense-description">Descrição</label>
                            <input id="expense-description" maxLength="80" value={description} onChange={(event) => setDescription(event.target.value)} required />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="field">
                            <label htmlFor="people-count">Quantidade de pessoas no rateio</label>
                            <input id="people-count" type="number" min="1" max={trip.members.length} step="1" value={count} onChange={(event) => setCount(event.target.value)} required />
                        </div>
                        <label className="checkbox-field">
                            <input type="checkbox" checked={equal} onChange={(event) => setEqual(event.target.checked)} />
                            Dividir igualmente
                        </label>
                        <p className="split-description">
                            {!validCount ? 'Escolha a quantidade de participantes.' : equal
                                ? memberNames + ' do rateio. ' + money(shares.at(-1) || 0) + ' por pessoa.'
                                : 'Informe o valor de cada participante.'}
                        </p>
                        {!equal && (
                            <div className="participant-grid">
                                {members.map((name, index) => (
                                    <div className="field participant-field" key={name}>
                                        <label htmlFor={'participant-' + index}>{name}</label>
                                        <input
                                            id={'participant-' + index}
                                            inputMode="decimal"
                                            value={customValues[name] ?? '0,00'}
                                            onChange={(event) => setCustomValues({ ...customValues, [name]: event.target.value })}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {equal && validCount && Number.isFinite(total) && total % peopleCount !== 0 && (
                            <p className="split-summary">Os centavos restantes serão distribuídos entre os primeiros participantes.</p>
                        )}
                    </div>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="button button-primary" type="submit" disabled={loading}>
                    {loading ? 'Carregando imagem...' : 'Salvar despesa'}
                </button>
            </form>
        </section>
    );
}
