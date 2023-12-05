const ffmpeg = require('fluent-ffmpeg');
const path = require('path');


function removeSilence(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .audioFilters('silenceremove=stop_periods=-1:stop_duration=0.08:stop_threshold=-40dB')
      .on('end', function() {
        console.log('Silence removal completed.');
        resolve(outputFile);
      })
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
        reject(err);
      })
      .save(outputFile);
  });
}

// Replace 'input.mp3' and 'output.mp3' with your actual file paths
const inputPath = path.join(__dirname, '..', 'audios', 'needToTrimV2.mp3');
const outputPath = path.join(__dirname, '..', 'audios', 'outputTrimV2.mp3');


removeSilence(inputPath, outputPath)
  .then(resultPath => console.log(`Processed audio saved to ${resultPath}`))
  .catch(error => console.error(error));
