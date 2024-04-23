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

        // Get the form element
        const form = document.getElementById('checkSpentForm');

        // Add an event listener for the submit event
        form.addEventListener('submit', async function (event) {
            // Prevent the form from actually submitting
            event.preventDefault();

            // Get the values from the input boxes
            const Sender = document.getElementById('donationAddr').value;

            console.log('Sender:', Sender);
            try {
                // Fetch the spent amount
                const spentAmount = await contract.methods.checkSpentAmount(Sender).call();

                // Create a new Bootstrap card
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = `Sender: ${Sender}`;

                const cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.textContent = `Spent Amount: ${web3.utils.fromWei(spentAmount, 'ether')} ETH`;

                // Append the title and text to the card body
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);

                // Append the card body to the card
                card.appendChild(cardBody);

                // Append the card to the 'spentAmount' div
                document.getElementById('spentAmount').appendChild(card);
            } catch (error) {
                console.error("An error occurred while fetching the spent amount:", error);
            }
        });
    })
    .catch(function (error) {
        // User rejected the request
        console.error('An error occurred:', error);
    });
