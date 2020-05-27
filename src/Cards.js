
// hard-coded data for now, but given more time, would integrate react-deck-o-cards library OR deckofcardsapi.com
let cards = [];

let ranks = [
    'Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
    'Jack','Queen','King','Ace'
]

let suite = [
    'Spades','Hearts','Diamonds','Clubs'
]

let count = 0;
for (let i=0; i < 52; i++) {
    let card_name = '' + ranks[i%13] + ' of ' + suite[Math.floor(i/13)];

    cards.push({
        name: card_name,
        value: (i%13) + 2,
        id: count,
    });

    count++;
}

export default cards;