'use strict';

const path = require('path');

const spawnPromise = (spawnProcess) => new Promise((resolve, reject) => {
  spawnProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  spawnProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  spawnProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      return resolve();
    }
    return reject(code);
  });
});

const pad = (number, size) => {
  let result = `${number}`;
  while (result.length < size) result = `0${result}`;
  return result;
};

const ffmpeg = () => process.env.FFMPEG || path.resolve(process.env.LAMBDA_TASK_ROOT, '_optimize', process.env.AWS_LAMBDA_FUNCTION_NAME, 'ffmpeg/ffmpeg'); //'./ffmpeg/ffmpeg'; // defaults to included ffmpeg binary;

const ffprobe = () => process.env.FFPROBE || path.resolve(process.env.LAMBDA_TASK_ROOT, '_optimize', process.env.AWS_LAMBDA_FUNCTION_NAME, 'ffmpeg/ffprobe'); //'./ffmpeg/ffprobe'; // defaults to included ffmpeg binary;

module.exports = {
  spawnPromise,
  pad,
  ffmpeg,
  ffprobe,
};