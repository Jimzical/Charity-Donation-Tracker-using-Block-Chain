// Get the form element
const form = document.getElementById('checkSpentForm');

// Add an event listener for the submit event
form.addEventListener('submit', function (event) {
    // Prevent the form from actually submitting
    event.preventDefault();

    // Get the value from the input box
    const donationAddr = document.getElementById('donationAddr').value;

    // Log the value to the console
    console.log('Donation Address:', donationAddr);

    // Define the spent amount (this would normally come from your server)
    const amount = '2 ETH';

    // Display the spent amount
    document.getElementById('spentAmount').innerHTML = `<p>You have spent: ${amount}</p>`;
});