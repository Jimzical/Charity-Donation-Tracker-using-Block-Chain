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
        const form = document.getElementById('donationForm');

        // Add an event listener for the submit event
        form.addEventListener('submit', async function (event) {
            // Prevent the form from actually submitting
            event.preventDefault();

            // Get the values from the input boxes
            // const sender = document.getElementsByClassName('sender')[0].value;
            const sender = accounts[0];
            const receiver = document.getElementById('receiver').value;
            const amount = document.getElementById('amount').value;

            console.log('sender:', sender);
            console.log('receiver:', receiver);
            console.log('amount:', amount);

            console.log('Connected:', accounts);

            // Define the donation amount in wei (1 ether = 10^18 wei)
            const donationAmount = web3.utils.toWei(amount, "ether");

            try {
                // Send the donation
                await contract.methods.Donate(receiver).send({ from: sender, value: donationAmount });

                console.log("Donation sent successfully!");
                console.log(`Sender: ${sender}\nReceiver: ${receiver}\nAmount: ${amount} ETH`);
                // to id donationSuccess add a success message
                let donationSuccessElement = document.getElementById('donationSuccess');
                donationSuccessElement.classList.add('alert', 'alert-success', 'mt-3');
                donationSuccessElement.innerHTML = `Donation of ${amount} ETH sent successfully!`;            
            } catch (error) {
                console.error("An error occurred while making the donation:", error);
                // to id donationError add an error message
                let donationSuccessElement = document.getElementById('donationSuccess');
                donationSuccessElement.classList.add('alert', 'alert-warning', 'mt-3');
                document.getElementById('donationError').innerHTML = `An error occurred while making the donation: ${error}`;
            }
        });
    })
    .catch(function (error) {
        // User rejected the request
        console.error('An error occurred:', error);
    });









