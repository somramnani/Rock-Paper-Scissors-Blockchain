pragma solidity ^0.4.19;

contract rps{
    mapping (string => mapping(string => int)) payoffMatrix;
    mapping (address =>uint)pay;
    
    address owner;
    address player1;
    address player2;
    string public player1Choice;
    string public player2Choice;
    
     event rpsEv(
       string player1Choice,
       string player2Choice
    );
    
    function setOwner() payable{
        owner = msg.sender;
       
    }

      function setPlayer(string p1choice,string p2choice)  {
	    player1Choice = p1choice;
	    player2Choice= p2choice;
	    rpsEv(player1Choice,player2Choice);
    }
    
    function rps(){   
        payoffMatrix["rock"]["rock"] = 0;
        payoffMatrix["rock"]["paper"] = 2;
        payoffMatrix["rock"]["scissors"] = 1;
        payoffMatrix["paper"]["rock"] = 1;
        payoffMatrix["paper"]["paper"] = 0;
        payoffMatrix["paper"]["scissors"] = 2;
        payoffMatrix["scissors"]["rock"] = 2;
        payoffMatrix["scissors"]["paper"] = 1;
        payoffMatrix["scissors"]["scissors"] = 0;
    }

    function getPlayer1Choice() view public returns (string){
        return (player1Choice);
    }
    
      function getPlayer2Choice() view public returns (string){
        return (player2Choice);
    }
    function getWinner() constant returns (int x)
    {
         return payoffMatrix[player1Choice][player2Choice];
    }
    
   function winner() public payable{
       msg.sender.transfer(20000000 wei);
   }
      function  checkBalance()public view returns(uint256) {
        return address(this).balance;
    }
}

