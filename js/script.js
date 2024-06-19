const Harmonies = [
    'LowHarmony.mp3',
    'Mid1Harmony.mp3',
    'Mid2Harmony.mp3',
    'HighHarmony.mp3',
];

const HarmonyAudios = Harmonies.map(h => {
    const audio = new Audio(`assets/${h}`);
    audio.muted = true;
    return audio;
});

const harmonyBtn = document.getElementById('harmony');

let vid = document.getElementById("bg-vid");

let t = 0;

let stem1;

function setup() {
    let canvas = createCanvas(1080, 720);
    canvas.parent("canvas-container");
}

function draw() {
    t = vid.currentTime;
    clear();

    // * blank page with object + instructions that say click and/or drag to trigger

    // visual seq
    if (t < 17.5) {
        // nothing
    }
    else if (t < 43.1) {
        scene0();
    } else if (t < 48.9) {
        scene1();
    } else if (t < 81.8) {
        scene2();
    } else if (t < 81.9) {
        scene3();
    } else if (t < 104.5) {
        scene4();
    } else if (t < 104.6) {
        scene5();
    }

    // * "COMMUNICATE" whack-a-mole visuals

    // audio seq
    if (t > 30 && t < 35) {
        // if the sound is not yet played
        //stem1.play();

        // p5 sound example
        // if (stem1.isPlaying() == false) stem1.loop();
    }

    noStroke();
    fill(0);
    text(t, 100, 100);
}


function scene0() {
    console.log('scene0');
    // fill(255, 0, 0);
    // circle(width / 2, height / 2, 50);

    obj_cards.style.display = "block";
}

function scene1() {
    // fill(0, 255, 0);
    // circle(width / 2, height / 2, 100);

    // harmonyBtn.style.display = "block";

    obj_cards.style.display = "none";
}

function scene2() {
    // fill(0, 255, 255);
    // circle(width / 2, height / 2, 200);

    obj_flowers.style.display = "block";
}

function scene3() {
    // fill(0, 255, 255);
    // circle(width / 2, height / 2, 200);

    obj_flowers.style.display = "none";
}

function scene4() {
    // fill(0, 255, 255);
    // circle(width / 2, height / 2, 200);

    harmonyBtn.style.display = "block";
}

function scene5() {
    // fill(0, 255, 255);
    // circle(width / 2, height / 2, 200);

    harmonyBtn.style.display = "none";
}

function playHarmonies() {
    HarmonyAudios.forEach(h => {
        // console.log(h);
        h.play();
    });
}

function pauseHarmonies() {
    HarmonyAudios.forEach(h => {
        h.pause();
    });
}

let audioPlayer;

async function loadAudio() {

    await Tone.start();

    // Create a player and play the audio after Tone.js context is started
    audioPlayer = new Tone.Player("assets/NoAHsThesIILOY.mp3").toDestination();

    // Load the audio file and then start the player
    await Tone.loaded();

    audioPlayer.sync().start(0);

    Tone.getTransport().pause();

    console.log("audio is ready");
}

const mainContainer = document.getElementById('main-container');
mainContainer.addEventListener('click', async () => {
    if (!audioPlayer) {
        await loadAudio();
    }

    if (vid.paused) {

        vid.play();

        Tone.getTransport().start();

        playHarmonies();

    } else {
        vid.pause();

        Tone.getTransport().pause();

        pauseHarmonies();

    }
})

// // ChatGPT (to play the video only when you click on the video):
// async function __mousePressed() {
//     if (!audioPlayer) {
//         await loadAudio();
//     }

//     // Get the main container element
//     const mainContainer = document.getElementById('main-container');

//     // Get the bounding box of the main container
//     const rect = mainContainer.getBoundingClientRect();

//     // Get the canvas offset
//     const canvas = document.querySelector('canvas');
//     const canvasRect = canvas.getBoundingClientRect();

//     // Convert mouseX and mouseY to screen coordinates
//     const screenX = mouseX + canvasRect.left;
//     const screenY = mouseY + canvasRect.top;

//     // Check if the mouse click is within the bounding box
//     if (screenX >= rect.left && screenX <= rect.right &&
//         screenY >= rect.top && screenY <= rect.bottom) {
//         // Toggle play/pause of the video
//         if (vid.paused) {

//             vid.play();

//             Tone.getTransport().start();

//             playHarmonies();

//         } else {
//             vid.pause();

//             Tone.getTransport().pause();

//             pauseHarmonies();

//         }
//     }
// }

let distortion = new Tone.Distortion(1).toDestination();
let reverb = new Tone.Reverb(20, 0.01).toDestination();

/* ===== SCRIPTS FOR SOUND OBJECTS ===== */
let obj_cards = document.getElementById('object-cards');
let obj_flowers = document.getElementById('object-flowers');

// video audio player
function draggable(dragObj, effect, filter) {

    let offsetX, offsetY;

    dragObj.addEventListener('mousedown', (e) => {
        console.log('start', e);
        offsetX = e.clientX - dragObj.getBoundingClientRect().left;
        offsetY = e.clientY - dragObj.getBoundingClientRect().top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        audioPlayer.connect(effect);

        vid.style.filter = filter;
    });

    function onMouseMove(e) {
        // console.log(e.clientX, e.clientY);
        dragObj.style.left = `${e.clientX - offsetX}px`;
        dragObj.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        console.log('end');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        audioPlayer.disconnect(effect);

        vid.style.filter = '';
    }
}

draggable(obj_cards, reverb, 'blur(5px)');
draggable(obj_flowers, distortion, 'saturate(5)');

// * VISUAL CUES that mimic the effects being applied

harmonyBtn.addEventListener('click', triggerHarmony);

let clickCount = 0;
function triggerHarmony() {
    ++clickCount;

    const hIndex = clickCount - 1;
    const harmony = HarmonyAudios[hIndex];

    if (harmony) {
        harmony.muted = false;
    }

    console.log(hIndex, harmony);
}
