
![iter1_part1](https://github.com/cosmatudor/Buy-Me-A-Coffee-App/assets/111079498/e99c1e40-ff67-4326-b436-ffef78803f70)

![iter1_part2](https://github.com/cosmatudor/Buy-Me-A-Coffee-App/assets/111079498/b27f3bbb-9db9-4cf4-8ba1-f9c97a884fde)
# Decentralized "Buy Me a Coffee" Smart Contract

Welcome to the Decentralized "Buy Me a Coffee" Smart Contract project! In this tutorial, you will learn how to develop and deploy a decentralized "Buy Me a Coffee" smart contract that allows visitors to send you (fake) ETH as tips and leave nice messages. This project utilizes Alchemy, Hardhat, Ethers.js, and Ethereum Goerli.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Setting up Your Environment](#setting-up-your-environment)
- [Deployment](#deployment)
- [Interacting with the Smart Contract](#interacting-with-the-smart-contract)
- [Building the Frontend](#building-the-frontend)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Blockchain technology enables the creation of decentralized applications that can accept contributions and tips without requiring a traditional bank account or credit card. This project guides you in building a "Buy Me a Coffee" smart contract on the Ethereum network, where users can send ETH and leave messages.

## Prerequisites

Before you begin, ensure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/) installed
- [Metamask](https://metamask.io/) extension installed in your browser
- Basic understanding of Ethereum and blockchain concepts

## Getting Started

Follow these steps to get started with the project:

1. Clone this repository to your local machine.
2. Install project dependencies using `npm install`.

## Setting up Your Environment

To build and test the smart contract, you'll need to set up your development environment. This project uses Hardhat as the development environment.

1. [Set up Hardhat](#link-to-hardhat-setup-guide)
2. Connect Metamask to the Goerli test network using an Alchemy RPC endpoint. You can find instructions on how to do this [here](#link-to-metamask-setup-guide).
3. Get free Sepolia ETH from [goerlifaucet.com](#link-to-goerlifaucet).
   
## Deployment

To deploy the "Buy Me a Coffee" smart contract to the Ethereum Goerli test network, follow these steps:

1. Run the deployment script with `npx hardhat run scripts/deploy.js`.

## Interacting with the Smart Contract

You can interact with the deployed smart contract using Ethers.js. The project includes examples of how to send tips and retrieve messages from the contract.

## Building the Frontend

The frontend of your decentralized "Buy Me a Coffee" application is built using React. Follow the instructions in the [frontend directory](frontend/README.md) to set up and run the frontend.

## Contributing

We welcome contributions to this project. Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

