//    // Get the button element
//    const button = document.getElementById('getDonationsButton');

//    // Add an event listener for the click event
//    button.addEventListener('click', function() {
//        // Get the donations list element
//        const donationsList = document.getElementById('donationsList');

//        // Define a list of donations (this would normally come from your server)
//        const donations = [
//            {
//                sender: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
//                receiver: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
//                amount: '0.1 ETH',
//                timestamp: 'April 23rd 2024, 2:35:20 pm'
//            },
//            {
//                sender: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
//                receiver: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
//                amount: '0.2 ETH',
//                timestamp: 'April 23rd 2024, 2:36:01 pm'
//            }
//            // Add more donations here...
//        ];

//        // Clear the donations list
//        donationsList.innerHTML = '';

//        // Add each donation to the donations list
//        donations.forEach(function(donation, index) {
//            donationsList.innerHTML += `
//                <div class="card mt-4">
//                    <div class="card-body">
//                        <h5 class="card-title">Donation #${index + 1}</h5>
//                        <p class="card-text">
//                            Sender: ${donation.sender}<br>
//                            Receiver: ${donation.receiver}<br>
//                            Amount: ${donation.amount}<br>
//                            Timestamp: ${donation.timestamp}
//                        </p>
//                    </div>
//                </div>
//            `;
//        });
//    });


// Connect to the Ethereum network
const web3 = new Web3(window.ethereum);

// Request the user's permission to connect their MetaMask wallet to your website
window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(function (accounts) {
        // User has connected their MetaMask wallet to your website
        // `accounts` is an array that contains the addresses of the user's accounts
        // Enable the Ethereum network
        window.ethereum.enable();
        
        // Get the contract instance
        const contractABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "DonationMade",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "donations",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "receivedAmounts",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "spentAmounts",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "Donate",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function",
                "payable": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "checkReceivedAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "checkSpentAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "checkSpentAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "getDonations",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "sender",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "receiver",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct DonationTracker.Donation[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            }
        ];
        const contractAddress = "0x023CF05157Af73B56019330D88127d41D8799729";
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get the button element
        const button = document.getElementById('getDonationsButton');

        // Add an event listener for the click event
        button.addEventListener('click', async function (event) {
            // Prevent the button from submitting a form if it's part of one
            event.preventDefault();

            try {
                // Fetch the donations
                const donations = await contract.methods.getDonations().call();

                // Get the 'donationsList' div
                const donationsList = document.getElementById('donationsList');

                let donationNumber = 1;

                donations.forEach(donation => {
                    // Create a new Bootstrap card
                    const card = document.createElement('div');
                    card.className = 'card mt-4';

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';

                    // Create the donation number
                    const number = document.createElement('h6');
                    number.className = 'card-subtitle mb-2 text-muted text-right';
                    number.textContent = `Donation #${donationNumber++}`;

                    // Append the donation number to the card body
                    cardBody.appendChild(number);

                    // Create the card content
                    ['Sender', 'Receiver', 'Amount (ETH)', 'Timestamp'].forEach((text, index) => {
                        const h5 = document.createElement('h5');
                        h5.className = 'card-title';
                        h5.textContent = text;

                        const p = document.createElement('p');
                        p.className = 'card-text';
                        // Convert the amount from Wei to Ether and the timestamp to a date string
                        p.textContent = index === 2 ? web3.utils.fromWei(donation[index], 'ether') : index === 3 ? new Date(donation[index] * 1000).toLocaleString() : donation[index];

                        // Append the title and text to the card body
                        cardBody.appendChild(h5);
                        cardBody.appendChild(p);
                    });

                    // Append the card body to the card
                    card.appendChild(cardBody);

                    // Append the card to the 'donationsList' div
                    donationsList.appendChild(card);
                });
            } catch (error) {
                console.error("An error occurred while fetching the donations:", error);
            }
        });
    })
    .catch(function (error) {
        // User rejected the request
        console.error('An error occurred:', error);
    });
