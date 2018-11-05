const md5 = require('js-md5');
const sha256 = require('sha256');

// create deck of 52 cars as an array of objects
function generateDeck() {
  var deck = new Array();
  var suits = ["spades", "diamonds", "clubs", "hearts"];
  var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

	for(let i = 0; i < suits.length; i++)	{
		for(let x = 0; x < values.length; x++) {
      let card = {}
      let number = values[x]
      card[number] = suits[i]
			deck.push(card);
		}
	}
	return deck;
}

// convert array of objects representing cards to array of cards

function deckToArray(deck) {
  let newArray = new Array();

  deck.forEach((i) => {
    Object.keys(i).forEach((key) => {
      var val = i[key]
      newArray.push(key + '|' + val)
    })
  })
  return newArray
}

// shuffle array of cards

function shuffleDeck(deck) {

for (let i = 0; i < 10000; i++) {
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var location3 = Math.floor((Math.random() * deck.length));
		var location4 = Math.floor((Math.random() * deck.length));

    var switch1 = deck[location1];
		var switch2 = deck[location3];

		deck[location1] = deck[location2];
		deck[location2] = switch1;
	}
  return deck
}

// pick a random 5 card hand from deck

function pickRandomHand(deck) {
  var hand = new Array()

  for (let i = 0; i < 5; i++ ) {
    var card = deck[Math.floor((Math.random() * deck.length))];
    hand.push(card)
    deck.pop(card)
  }
  return hand
}




// ordered deck
const orderedDeck = () => deckToArray(generateDeck());

// unordered deck
const unorderedDeck = () => shuffleDeck(orderedDeck());

// random 5 card hand
const fiveCardHand = () => pickRandomHand(unorderedDeck())

// 128 bit encryption via MD5:

// output a whole card deck as 128 bit hash
function deckToNumber128(deck) {
  var wholeDeckHash = md5.create();
  return '128 bit whole deck output:' + wholeDeckHash.update(deck).hex();
}

// output 5 card hand as 128 bit hash
function handToNumber128(hand) {
  var fiveCardHash = md5.create();
  return '128 bit five card hand output:' + fiveCardHash.update(hand).hex();
}

// 256 bit encryption via SHA-256:

// output a whole card deck as 256 bit hash
function deckToNumber256(deck) {
  return '256 bit whole deck output:' +  sha256(deck);
}

// output 5 card hand as 256 bit hash
function handToNumber256(hand) {
  var fiveCardHash = md5.create();
  return '256 bit 5 card hand output:' + sha256(hand);
}


console.log(deckToNumber128(unorderedDeck()));
console.log(handToNumber128(fiveCardHand()));
console.log(deckToNumber256(unorderedDeck()));
console.log(handToNumber256(fiveCardHand()));
