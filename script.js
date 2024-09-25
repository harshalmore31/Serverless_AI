const apiUrl = 'https://llama.harshalmore2468.workers.dev'; // **Replace with your Worker's URL**

document.getElementById('apiForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const promptValue = document.getElementById('prompt').value;

  const outputElement = document.getElementById('output');
  outputElement.innerText = ''; 

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: promptValue }) 
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
