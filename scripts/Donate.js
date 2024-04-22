 // Get the form element
 const form = document.getElementById('donationForm');

 // Add an event listener for the submit event
 form.addEventListener('submit', function(event) {
     // Prevent the form from actually submitting
     event.preventDefault();

     // Get the values from the input boxes
     const sender = document.getElementById('sender').value;
     const receiver = document.getElementById('receiver').value;
     const amount = document.getElementById('amount').value;

     // Log the values to the console
     console.log('Sender:', sender);
     console.log('Receiver:', receiver);
     console.log('Amount:', amount);


 });a