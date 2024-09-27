const apiUrl = 'https://api.cloudflare.com/client/v4/accounts/6fde9a1f0ee677ef0fba8b98e94f8ef8/ai/run/@cf/meta/llama-3-8b-instruct'; // Replace with your Worker's URL
const apiKey = 'OehHRtOy1QFWnxtpRHc1G7kOUWi7obw5OULDS1B1'; // Replace with your actual API key

document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const promptValue = document.getElementById('prompt').value;

    const outputElement = document.getElementById('output');
    outputElement.innerText = ''; 

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` 
        },
        body: JSON.stringify({ 
            prompt: promptValue 
        })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Response details:', response.status, response.statusText);
            throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
        }
        return response.json(); 
    })
    .then(data => {
        outputElement.innerText = data.response; 
    })
    .catch(error => {
        console.error('API Error:', error);
        outputElement.innerText = 'Error: ' + error.message; 
    });
});
