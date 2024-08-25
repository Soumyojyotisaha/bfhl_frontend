import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure the JSON is correctly formatted
            const parsedInput = JSON.parse(jsonInput);
            
            const res = await axios.post('https://my-bajajapi-demo.netlify.app/.netlify/functions/bfhl', parsedInput);
            setResponse(res.data);
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            alert('Invalid JSON or API Error');
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div>
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>JSON Input Processor</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={jsonInput} 
                    onChange={(e) => setJsonInput(e.target.value)} 
                    rows="5" 
                    cols="50" 
                    placeholder='{"data": ["A","1","b"]}' 
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <select multiple onChange={handleSelectChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;
