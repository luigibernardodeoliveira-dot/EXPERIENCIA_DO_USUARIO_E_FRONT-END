import React from 'react';

export default function Polls({ trip, onVote }) {
    return (
        <section className="page page-route">
            <h2>Votações do roteiro</h2>
            <p className="muted">Escolha suas opções e acompanhe o resultado atual do grupo.</p>
            <div className="poll-grid">
                {trip.polls.map(function (poll, pollIndex) {
                    const total = poll.votes.reduce(function (sum, votes) { return sum + votes; }, 0);

                    return (
                        <fieldset className="poll-card" key={pollIndex}>
                            <legend>{poll.question}</legend>
                            <p className="muted">Selecione uma opção · {total} votos</p>
                            {poll.options.map(function (option, optionIndex) {
                                const votes = poll.votes[optionIndex];
                                const percentage = total ? Math.round(votes / total * 100) : 0;
                                const selected = poll.selected === optionIndex;

                                return (
                                    <label className={'poll-option' + (selected ? ' selected' : '')} key={option}>
                                        <span className="poll-option-top">
                                            <input
                                                type="radio"
                                                name={'poll-' + pollIndex}
                                                value={optionIndex}
                                                checked={selected}
                                                onChange={function () { onVote(pollIndex, optionIndex); }}
                                            />
                                            <span>{option}</span>
                                        </span>
                                        <span className="poll-option-meta">
                                            <span>{votes} {votes === 1 ? 'voto' : 'votos'}</span>
                                            <span>{percentage}%</span>
                                        </span>
                                        <span className="poll-bar" aria-hidden="true">
                                            <span style={{ width: percentage + '%' }}></span>
                                        </span>
                                    </label>
                                );
                            })}
                            <p className="your-vote" aria-live="polite">
                                {poll.selected !== null && poll.selected !== undefined
                                    ? 'Seu voto: ' + poll.options[poll.selected]
                                    : 'Você ainda não votou.'}
                            </p>
                        </fieldset>
                    );
                })}
            </div>
            {trip.polls.length === 0 && (
                <p className="notice">Ainda não há enquetes nesta viagem.</p>
            )}
        </section>
    );
}
