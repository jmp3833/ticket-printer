/**
  trello-watch.js
  Watch trello ticket assignments for a given board
*/

var Trello = require("trello");

export const trelloWatch = {
  name: 'Trello Watch',
  numCards: undefined,
  counter: 1,

  getTicketObjects: function( printQueue ) {

    var trello = new Trello(this.trelloApiKey, this.trelloToken);

		trello.getCardsOnBoard(this.boardId, function(error, trelloCards) {
      var numFreshCards = 0;

      if(error) {
        console.log(error);
      }

			trelloCards.forEach(function(card) {
        numFreshCards++; 
      });

			if(this.numCards && numFreshCards > this.numCards) {
				// list of tickets to return
				printQueue.unshift({
					watch: "Trello Watch",
					title: "TRELLO-WATCH",
					project: "Trello",
					number: `#${this.counter}`,
					body: `A new card has been added!`
				});
			  this.counter++;
			}
		  this.numCards = numFreshCards;
	  }.bind(this))
  }
};

export default trelloWatch;
