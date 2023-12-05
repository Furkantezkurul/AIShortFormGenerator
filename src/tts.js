require('dotenv').config();
const ElevenLabs = require("elevenlabs-node");

const voice = new ElevenLabs(
    {
        apiKey:  process.env.ELEVENLABS_API_KEY, // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",         // A Voice ID from Elevenlabs
    }
);

voice.textToSpeech({
    // Required Parameters
    fileName:        "audios/needToTrim.mp3",            // The name of your audio file
    textInput:       "This is an example of a longer text. Longer texts often have pauses which we need to remove later. We will remove the silence in a seperate function.",                // The text you wish to convert to speech

    // Optional Parameters
    voiceId:         "pNInz6obpgDQGcFmaJgB",         // A different Voice ID from the default
    stability:       0.5,                            // The stability for the converted speech
    similarityBoost: 0.5,                            // The similarity boost for the converted speech
    modelId:         "eleven_monolingual_v1",        // The ElevenLabs Model ID
    style:           1,                              // The style exaggeration for the converted speech
    speakerBoost:    true                            // The speaker boost for the converted speech
  }).then((res) => {
    console.log(res);
});