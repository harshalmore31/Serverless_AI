const apiUrl = 'https://api.cloudflare.com/client/v4/user/tokens/verify';
const apiKey = 'Midq_5u_Ri1sK6pe98nrsrdDIK1qVjSk60mSijYm';

document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const promptValue = document.getElementById('prompt').value;

    const data = { 
        prompt: promptValue, 
    };

    const outputElement = document.getElementById('output');
    outputElement.innerText = ''; // Clear previous output

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer ${apiKey}, // Include API key in headers
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Response details:', response.status, response.statusText);
            throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
        }

        // Read the response as a stream (assuming your worker returns a stream)
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = '';

        function processStream({ done, value }) {
            if (done) {
                console.log('Stream complete');
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            const lines = buffer.split('\n');

            for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i].trim();

                if (line.startsWith('data:')) {
                    const jsonString = line.slice(5).trim();
                    try {
                        const jsonData = JSON.parse(jsonString);
                        if (jsonData.response) {
                            outputElement.innerText += jsonData.response; 
                        }
                    } catch (e) {
                        console.error('Failed to parse JSON:', e);
                    }
                }
            }

            buffer = lines[lines.length - 1];

            return reader.read().then(processStream);
        }

        return reader.read().then(processStream);
    })
    .catch(error => {
        console.error('API Error:', error);
        outputElement.innerText = 'Error: ' + error.message;
    });
});
