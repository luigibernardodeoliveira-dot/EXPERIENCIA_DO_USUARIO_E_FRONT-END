import React, { useEffect, useRef, useState } from 'react';

export default function Chat({ trip, userName, onSend }) {
    const [text, setText] = useState('');
    const messagesRef = useRef(null);
    const inputRef = useRef(null);
    const memberNames = trip.members.map(function (member) {
        return member === 'Você' ? 'você' : member;
    });
    const membersText = memberNames.length > 1
        ? memberNames.slice(0, -1).join(', ') + ' e ' + memberNames[memberNames.length - 1]
        : memberNames[0];

    useEffect(function () {
        const panel = messagesRef.current;
        if (panel) {
            panel.scrollTop = panel.scrollHeight;
        }
    }, [trip.id, trip.messages.length]);

    function sendMessage(event) {
        event.preventDefault();
        const message = text.trim();
        if (!message) {
            setText('');
            return;
        }
        onSend(message);
        setText('');
        inputRef.current.focus();
    }

    return (
        <section className="page page-chat">
            <div className="chat-heading">
                <h2>Chat do grupo</h2>
                <p className="muted">{membersText}</p>
            </div>
            <div
                className="chat-panel"
                ref={messagesRef}
                role="log"
                aria-label="Mensagens da viagem"
                aria-live="polite"
                aria-relevant="additions"
            >
                <div className="day-label">Hoje</div>
                {trip.messages.map(function (message, index) {
                    return (
                        <article className={'message' + (message.own ? ' own' : '')} key={index}>
                            <div className="message-meta">
                                <strong>{message.own ? userName : message.author}</strong>
                                <time>{message.time}</time>
                            </div>
                            <p className="message-text">{message.text}</p>
                        </article>
                    );
                })}
                {trip.messages.length === 0 && (
                    <p className="notice">Comece a conversa sobre a viagem.</p>
                )}
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
                <div className="field">
                    <label htmlFor="message-input">Mensagem</label>
                    <input
                        id="message-input"
                        ref={inputRef}
                        value={text}
                        onChange={function (event) { setText(event.target.value); }}
                        placeholder="Digite sua mensagem"
                        maxLength="1000"
                        autoComplete="off"
                        required
                    />
                </div>
                <button className="button button-primary" type="submit">Enviar</button>
            </form>
        </section>
    );
}
