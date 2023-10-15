import React, { useState, useEffect } from 'react';
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
        const inputBox = document.querySelector('.input-box');
        inputBox.style.height = '50px';
        inputBox.value = '';

    };

    const resizeInputBox = () => {
        const inputBox = document.querySelector('.input-box');
        const paddingAndBorder = inputBox.offsetHeight - inputBox.clientHeight;
        inputBox.style.height = inputBox.scrollHeight + paddingAndBorder + 'px';
    };

    useEffect(() => {
        resizeInputBox();
    }, [message]);

    useEffect(() => {
        const inputBox = document.querySelector('.input-box');
        inputBox.addEventListener('resize', resizeInputBox);
    }, []);

    return (
        <div className="App" style={{ fontFamily: 'Ubuntu' }}>
            <h1 className="App-header">Personalized Verizon ChatBot</h1>
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