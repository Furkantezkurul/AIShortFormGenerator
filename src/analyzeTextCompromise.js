const nlp = require('compromise');

function processScript(script) {
    // Process the script
    let doc = nlp(script);

    // Split the script into sentences
    let sentences = doc.sentences().out('array');

    // Initialize an array to hold the nouns for each sentence
    let sentenceNouns = [];

    sentences.forEach(sentence => {
        // Analyze the sentence
        let sentenceDoc = nlp(sentence);
    
        // Extract nouns
        let nouns = sentenceDoc.nouns().out('array');
    
        // Further refine each noun phrase
        let refinedNouns = nouns.map(nounPhrase => {
            // Process the noun phrase to extract individual nouns or refine it
            let refined = nlp(nounPhrase).nouns().out('normal');
    
            // Return the refined noun or phrase
            return refined;
        });
    
        // Filter out any unwanted results or non-nouns
        //let filteredNouns = refinedNouns.filter(noun => isDesiredNoun(noun));
    
        // Add the nouns array to the sentenceNouns array
        sentenceNouns.push(refinedNouns);
    });
    return sentenceNouns;
}

let script = "This artist made 1.6 Million Dollars just with Procreate. And here’s how you can do the same: Stefen has built a following of 700 thousand followers on Instagram. In some of his posts, he encourages his followers to comment a simple word to get a free tutorial. He then uses a tool like manychat to automatically DM his followers a link where they can claim their free gift. The follower just needs to type their email into this beautiful landing page to get access.";
let nounsPerSentence = processScript(script);

console.log(nounsPerSentence);
