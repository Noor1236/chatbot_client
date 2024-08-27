import React, { useState } from 'react';
import '../style/index.css';
import axios from 'axios';

const Chatbot = () => {
    const [caseDetails, setCaseDetails] = useState('');
    const [summary, setSummary] = useState('');
    const [legalSections, setLegalSections] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSummary('');
        setLegalSections('');
        setError('');
        
        try {
            const response = await axios.post('https://chatbot-server-flax.vercel.app/api/ai/analyze', { caseDetails });
            setSummary(response.data.summary);
            setLegalSections(response.data.applicableSections.join('\n'));

        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || 'Something went wrong!'}`);
            } else if (err.request) {
                setError('Network error: Please try again later.');
            } else {
                setError('An unexpected error occurred.');
            }
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="chatbot-container">
                <h1>Legal Case Chatbot</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="chatbot-textarea"
                        value={caseDetails}
                        onChange={(e) => setCaseDetails(e.target.value)}
                        rows="7"
                        cols="60"
                        placeholder="Enter case details here..."
                        required
                    />
                    <br />
                    <button className="chatbot-button" type="submit" disabled={loading}>Submit</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {summary && (
                    <div className='summary-box'>
                        <h2>Summary</h2>
                        <p>{summary}</p>
                    </div>
                )}
                {legalSections && (
                    <div>
                        <h2>Applicable Legal Sections</h2>
                        <pre>{legalSections}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
