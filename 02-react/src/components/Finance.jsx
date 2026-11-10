import { money, ownShare } from '../utils.js';

export default function Finance({ trip, onNewExpense }) {
    const balance = trip.expenses.reduce((sum, expense) => sum + ownShare(expense), 0);
    const allEqual = trip.expenses.every((expense) => expense.equal && expense.members.length === 4);

    return (
        <section className="page page-finance">
            <div className="balance-card">
                <p className="balance-label">Você tem a pagar</p>
                <p className="balance-value">{money(balance)}</p>
                <p className="muted">Esse valor corresponde às despesas “rachadas” do grupo.</p>
            </div>
            <h2>Histórico de despesas</h2>
            <p className="muted">
                {allEqual ? 'Valores divididos igualmente entre 4 pessoas.' : 'Confira a sua parte em cada despesa do grupo.'}
            </p>
            <div className="expense-table">
                <div className="expense-row table-head">
                    <span>Despesa</span>
                    <span>Total da despesa</span>
                    <span>Sua parte</span>
                </div>
                {trip.expenses.map((expense, index) => (
                    <div className="expense-row" key={index}>
                        <div className="expense-description">
                            <strong>{expense.description}</strong>
                            <p>{expense.detail || (expense.equal ? 'Divisão igual' : 'Valores por participante')} · {expense.members.length} pessoas</p>
                        </div>
                        <div className="expense-total">
                            <span className="mobile-label">Total da despesa</span>
                            {money(expense.total)}
                        </div>
                        <div className="expense-share">
                            <span className="mobile-label">Sua parte</span>
                            {money(ownShare(expense))}
                        </div>
                    </div>
                ))}
            </div>
            {trip.expenses.length === 0 && <p className="notice">Nenhuma despesa cadastrada. Adicione o primeiro gasto da viagem.</p>}
            <button className="button button-primary" type="button" onClick={onNewExpense}>+ Nova despesa</button>
        </section>
    );
}
