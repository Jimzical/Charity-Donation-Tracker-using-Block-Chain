// Get the form element
const form = document.getElementById('checkReceivedForm');

// Add an event listener for the submit event
form.addEventListener('submit', function (event) {
    // Prevent the form from actually submitting
    event.preventDefault();

    // Get the value from the input box
    const donationAddr = document.getElementById('donationAddr').value;

    // Log the value to the console
    console.log('Donation Address:', donationAddr);

    const receivedAmountElement = document.createElement('div');
    receivedAmountElement.textContent = 'Received Amount: 2.00 ETH';
    document.getElementById('receivedAmount').appendChild(receivedAmountElement);
});