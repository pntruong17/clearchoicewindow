import { Howl, Howler } from 'howler'

function playClick() {
    let sound = new Howl({
        src: ['./click2.mp3'],
        volume: 0.6,
    });
    sound.play()
}

function playThemeMusic() {
    let sound = new Howl({
        src: ['./stylish-deep-electronic.mp3'],
        loop: true,
        volume: 0.05,
        onend: function () {
            console.log('Finished!');
        }
    });
    sound.play()
}

function playSlide() {
    let sound = new Howl({
        src: ['./slide.mp3'],
        volume: 0.6,
    });
    sound.play()
}

export { playClick, playThemeMusic, playSlide }