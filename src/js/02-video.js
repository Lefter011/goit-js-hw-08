import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);
    const SAVE_PLAY = "videoplayer-current-time";
    const onPlay = function (data) {
        localStorage.setItem(SAVE_PLAY, JSON.stringify(data['seconds']));
    };
player.on('timeupdate', throttle(onPlay, 1000));


function resumePlayback() {
    if (JSON.parse(localStorage.getItem(SAVE_PLAY)) === null) {
        return;
    }
    const time = JSON.parse(localStorage.getItem(SAVE_PLAY));
    if (time) {
        player
        .setCurrentTime(time)
        .then(function (seconds) {})
        .catch(function (error) {
            switch (error.name) {
                case 'RangeError':
                    break;
                default:
                    break;
            }
        });
    }
}
resumePlayback();

