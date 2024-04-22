   // Get the button element
   const button = document.getElementById('getDonationsButton');

   // Add an event listener for the click event
   button.addEventListener('click', function() {
       // Get the donations list element
       const donationsList = document.getElementById('donationsList');

       // Define a list of donations (this would normally come from your server)
       const donations = [
           {
               sender: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
               receiver: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
               amount: '0.1 ETH',
               timestamp: 'April 23rd 2024, 2:35:20 pm'
           },
           {
               sender: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
               receiver: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
               amount: '0.2 ETH',
               timestamp: 'April 23rd 2024, 2:36:01 pm'
           }
           // Add more donations here...
       ];

       // Clear the donations list
       donationsList.innerHTML = '';

       // Add each donation to the donations list
       donations.forEach(function(donation, index) {
           donationsList.innerHTML += `
               <div class="card mt-4">
                   <div class="card-body">
                       <h5 class="card-title">Donation #${index + 1}</h5>
                       <p class="card-text">
                           Sender: ${donation.sender}<br>
                           Receiver: ${donation.receiver}<br>
                           Amount: ${donation.amount}<br>
                           Timestamp: ${donation.timestamp}
                       </p>
                   </div>
               </div>
           `;
       });
   });