import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', onPlay);

function onPlay() {
  console.log('played the video!');
  player.on('timeupdate', throttle(setCurrentTimeToStorage, 1000));
}

function setCurrentTimeToStorage(event) {
  console.log(event);
  localStorage.setItem(STORAGE_KEY, event.seconds);
}

function getCurrentTimeFromStorage() {
  return localStorage.getItem(STORAGE_KEY);
}

if (getCurrentTimeFromStorage()) {
  player
    .setCurrentTime(getCurrentTimeFromStorage())
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
