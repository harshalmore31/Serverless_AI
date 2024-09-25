const apiUrl = 'https://api.cloudflare.com/client/v4/user/tokens/verify'; 
const apiKey = 'Midq_5u_Ri1sK6pe98nrsrdDIK1qVjSk60mSijYm'; 

document.getElementById('apiForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const outputElement = document.getElementById('output');
  outputElement.innerText = '';

  fetch(apiUrl, {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${apiKey},
      },
  })
  .then(response => {
      if (!response.ok) {
          console.error('Response details:', response.status, response.statusText);
          throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
      }
      return response.json();
  })
  .then(data => {
      outputElement.innerText = JSON.stringify(data, null, 2); 
  })
  .catch(error => {
      console.error('API Error:', error);
      outputElement.innerText = 'Error: ' + error.message;
  });
});
