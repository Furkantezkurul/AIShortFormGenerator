'use strict';

function main(textToAnalyze) {
  // Imports the Language library
  const {LanguageServiceClient} = require('@google-cloud/language').v1;

  // Instantiates a client
  const languageClient = new LanguageServiceClient();

  async function classifyTextGroup(textGroup) {
    // Construct request for the text group
    const request = {
      document: {
        content: textGroup,
        type: 'PLAIN_TEXT',
      },
    };

    // Run request for classification
    try {
      const [classification] = await languageClient.classifyText(request);
      console.log(`Classification for text group: "${textGroup}"`);
      console.log(JSON.stringify(classification, null, 2)); // Format for readability
    } catch (e) {
      console.error('Error during classifyText:', e);
    }
  }

  // Split the text into sentences
  const sentences = textToAnalyze.match(/[^.!?]+[.!?]+/g);

  // Combine sentences until they have at least 20 tokens
  let textGroup = '';
  let tokenCount = 0;
  sentences.forEach(sentence => {
    const wordCount = sentence.split(/\s+/).length;
    tokenCount += wordCount;
    textGroup += sentence + ' ';

    if (tokenCount >= 20) {
      classifyTextGroup(textGroup.trim());
      textGroup = '';
      tokenCount = 0;
    }
  });

  // Check if there's a remaining text group that hasn't been classified
  if (textGroup.trim().length > 0) {
    classifyTextGroup(textGroup.trim());
  }
}

// Here you can input the text you want to analyze
let text = "This artist made 1.6 Million Dollars just with Procreate. And here’s how you can do the same: Stefen has built a following of 700 thousand followers on Instagram. In some of his posts, he encourages his followers to comment a simple word to get a free tutorial. He then uses a tool like manychat to automatically DM his followers a link where they can claim their free gift. The follower just needs to type their email into this beautiful landing page to get access.";
main(text);

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
