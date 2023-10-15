import React, { useState } from 'react';
import './App.css';
import './styles.css';

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.message))
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="App">
            <h1>Verizon ChatBot</h1>
            <form onSubmit={handleSubmit}>
        <textarea
            className="input-box"
            value={message}
            placeholder="Ask Verizon Anything"
            onChange={(e) => setMessage(e.target.value)}
        ></textarea>
                <button className="button" type="submit">
                    Submit
                </button>
            </form>
            <div className="output-box">{response}</div>
        </div>
    );
}

export default App;