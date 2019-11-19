//Using the fetch API

const weatherForm = document.querySelector('form');
const userInput = document.querySelector('input');


const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = userInput.value;
    //window.location.href = `http://localhost:5000/weather?address=${location}`;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const url = `/weather?address=${location}`;
        fetch(url).then(response => {
            //console.log(response);
            response.json().then(data => {
                if (data.error) return messageOne.textContent = data.error;

                const {location, forecastData} = data;
                messageOne.textContent = location;
                messageTwo.textContent = forecastData
                // console.log(location);
                // console.log(forecastData);

            });
        });
});