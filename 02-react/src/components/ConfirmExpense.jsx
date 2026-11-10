import { money } from '../utils.js';

export default function ConfirmExpense({ expense, onConfirm, onEdit }) {
    return (
        <section className="page page-confirm">
            <h2>Confirmar despesa</h2>
            <div className="confirm-total">
                <p>Valor total da despesa</p>
                <strong>{money(expense.total)}</strong>
                <p>{expense.description}</p>
            </div>
            <h3>Participantes do rateio</h3>
            <p className="muted">{expense.members.length} pessoas · {expense.equal ? 'Divisão igual' : 'Valores por participante'}</p>
            <div className="confirm-list">
                {expense.members.map((name, index) => (
                    <div className="confirm-row" key={name}>
                        <span>{name}</span>
                        <strong>{money(expense.shares[index])}</strong>
                    </div>
                ))}
            </div>
            <div className="confirm-actions">
                <button className="button button-primary" type="button" onClick={onConfirm}>Confirmar despesa</button>
                <button className="button button-secondary" type="button" onClick={onEdit}>Voltar e editar</button>
            </div>
        </section>
    );
}
