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

player.setCurrentTime(getCurrentTimeFromStorage());
