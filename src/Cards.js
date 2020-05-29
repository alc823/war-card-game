
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
    // let image_url = 'https://deckofcardsapi.com/static/img/' + '' + '.png'
    let image_identification = '';
    
    if ((i%13)+2 < 10) {
        image_identification += '' + ((i%13)+2);
    } else if ((i%13)+2 === 10){
        image_identification += '0';
    } else {
        image_identification += ranks[i%13].substring(0,1);
    }
    image_identification += suite[Math.floor(i/13)].substring(0,1);

    cards.push({
        name: card_name,
        value: (i%13) + 2,
        id: count,
        image_url: 'https://deckofcardsapi.com/static/img/' + image_identification + '.png'
    });

    count++;
}

export default cards;