// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Events
    event NoteEvent(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // State variables
    struct Note {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    address payable public owner;
    Note[] public notes;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyACoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "You can't buy a coffe for free!");
        notes.push(Note(msg.sender, block.timestamp, _name, _message));

        emit NoteEvent(msg.sender, block.timestamp, _name, _message);
    }

    function withdrawTips() public {
        require(msg.sender == owner, "Only the owner can withdraw the money!");
        (bool succes, ) = owner.call{value: address(this).balance}("");
        require(succes);
    }

    // getters
    function getMemos() public view returns (Note[] memory) {
        return notes;
    }
}
