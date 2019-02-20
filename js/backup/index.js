var btnclicked = false;
//----------------------------------------------------------------------------
						//Injecting Web3
//----------------------------------------------------------------------------
 $(document).ready(function(){
 Web3 = require('web3');


	if (typeof web3 != 'undefined')	{
		web3 = new Web3(web3.currentProvider);
		console.log("existing web3: provider " + typeof web3);
		console.log(web3.currentProvider);
	}
	else{	
		// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	
		alert("Please install metamask");
}
console.log(web3.isConnected());
console.log(web3.eth.accounts[0]);


//----------------------------------------------------------------------------
						//The Contracts Information
//----------------------------------------------------------------------------

var rpsContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"player2Choice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayer2Choice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"x","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1choice","type":"string"},{"name":"p2choice","type":"string"}],"name":"setPlayer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"player1Choice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"winner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayer1Choice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"player1Choice","type":"string"},{"indexed":false,"name":"player2Choice","type":"string"}],"name":"rpsEv","type":"event"}]);
var contractInstance = rpsContract.at('0xbb3a5fed403f798a95cdc33555808d8155bd7e84');
console.log(contractInstance);


//----------------------------------------------------------------------------
						// Setting the Computer's choice
//----------------------------------------------------------------------------

var p2choice = Math.random();
if (p2choice <0.34){
	p2choice ="rock";
}else if(p2choice<= 0.67){
	p2choice= "paper";
}else{
	p2choice= "scissors";
}

//----------------------------------------------------------------------------
						// Event Watch
//----------------------------------------------------------------------------


var maxblock = 0;
var event = contractInstance.rpsEv({},{fromBlock: 0, toBlock: 'latest'});
event.watch(function(error, result) {
	if (!error) {
		console.log ("Block Number: " + result.blockNumber);
		console.log ("Player 1 Choice:" +result.args.p1choice);
		if (btnclicked ==true){
		$("#pp1Choice").html("<b>" + results.args.p1choice +"</br>");
	}
}
});


//----------------------------------------------------------------------------
						// Setting the button
//----------------------------------------------------------------------------

function setPlayer(choice){
var p1choice = choice;
	
	contractInstance.setPlayer(p1choice,p2choice, {from:web3.eth.accounts[0]},function(){	
		contractInstance.getPlayer1Choice((error,result) => {
			if (!error)
				alert("You (Player 1) Chose: " + result), 
				console.log("Player 1 (You) Chose: " + result);	
			else
				console.log("ERROR!");
			});
			
			contractInstance.getPlayer2Choice((error,result) => {
				if (!error)
					alert("Your Opponent (Player 2) Chose: " + result),
					console.log(" (Player 2) Chose: " + result);
				else
					console.log("ERROR!");
				});
		
				contractInstance.getWinner((error,result) => {
					if (result == 1)	
					
						alert("Congratulations! You Won!"),
						console.log("Winner : Player " + result);
					else if(result == 2)
						alert("You Lost. It's okay,Losing is part of the game. If you never lose, you are never truly tested, and never forced to grow! Try again!" ),	
						console.log("Winner : Player " + result);
					else if(result ==0)
						alert ("Oh no! It's a tie. Play again!"),
						console.log("Winner : Player " + result);
					else
						console.log("ERROR!");
	
		});
		 
	});
});























// var event = contractInstance.rpsEv({},{fromBlock: 0, toBlock: 'latest'});
// event.watch(function(error, result) {
// 	if (!error) {
// 		console.log ("Block Number: " + result.blockNumber);
// 		console.log("You  wrote " + result.args.player1Choice);
	
// 		if (btnclicked == true){
// 			$( "#pp1Choice" ).html( "<b>" +  result.args.player1Choice + " </b>" );
		
// 		}
// 	}
// });




























// contractInstance.rpsEv().watch(function(error, result){
	// 		  if (!error){
	// 			console.log(result.args.player1Choice);
	// 			console.log(result.args.player2Choice);
	// 			if (btnclicked == true){
	// 				$( "pPlayer1Choice" ).html( "<b>" +  result.args.player1Choice + " </b>" );
				
	// 			}
	// 		}
	// 	});
				
			
	
// 	var player1Choice = document.getElementById('player1Choice').value;

// 	$( "#setprofessorbtn" ).click(function() {
// 		var fname = $("#player1Choice").val();
// 		var lname = $("#lname").val();
// 		var id = $("#id").val();
// 		btnclicked = true;
// 		contractInstance.play(player1Choice, player2Choice,{ from: web3.eth.accounts[0]},function(){	
	
// 		});
// 	});



// contractInstance.play(player1Choice, player2Choice, {from: web3.eth.accounts[0]},function(){
// 	contractInstance.play((error, result) => {
// 		if (!error)
// 			console.log("Data Returned: " + result);
// 		else
// 			console.log("ERROR!");
// 	});
// });

