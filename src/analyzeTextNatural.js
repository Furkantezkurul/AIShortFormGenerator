const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const POS = require('pos');
const tagger = new POS.Tagger();

function extractNouns(text) {
    // Tokenize the text into individual words
    const tokens = tokenizer.tokenize(text);

    // Tag the tokens with POS tags
    const taggedWords = tagger.tag(tokens);

    // Filter out the nouns (NN for singular noun, NNS for plural noun)
    const nouns = taggedWords
        .filter(([word, tag]) => tag === 'NN' || tag === 'NNS')
        .map(([word]) => word);

    return nouns;
}

let script = "This artist made 1.6 Million Dollars just with Procreate. And here’s how you can do the same: Stefen has built a following of 700 thousand followers on Instagram. In some of his posts, he encourages his followers to comment a simple word to get a free tutorial. He then uses a tool like manychat to automatically DM his followers a link where they can claim their free gift. The follower just needs to type their email into this beautiful landing page to get access.";
let nouns = extractNouns(script);

console.log(nouns);

//commit test