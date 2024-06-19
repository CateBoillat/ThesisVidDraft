import { Draggable } from 'gsap/all'
import './style.css'
import gsap from "gsap"

gsap.registerPlugin(Draggable)

const lyrics = document.getElementById('lyrics');
const cardbox = document.getElementById('cardbox');
const cards = document.getElementById('cards');
const flowers = document.getElementById('flowers');
const mug = document.getElementById('mug');
const plate = document.getElementById('plate');

// // Function to map a value from one range to another
// function mapRange(value, inMin, inMax, outMin, outMax) {
//     return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
// }

// tone.js
const synth = new Tone.Synth().toDestination();
console.log(synth);

// Load and play song when button is clicked
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    // Apply fx during click and drag
    if (button) {
        button.addEventListener("click", async () => {
            await Tone.start();
            console.log("audio is ready");

            // Create a player and play the audio after Tone.js context is started
            const player = new Tone.Player("IILOYdraft.mp3").toDestination();

            // Load the audio file and then start the player
            Tone.loaded().then(() => {
                player.start();
            });

            let distortion = new Tone.Distortion(2).toDestination();

            Draggable.create("#flowers", {
                bounds: "body",
                onDrag: () => {
                    const bounds = flowers.getBoundingClientRect();
                    coordinateXY = bounds;

                    // Connect the player to the distortion effect on drag
                    player.connect(distortion);
                },
                onDragEnd: () => {
                    // Disconnect the effect after dragging
                    player.disconnect(distortion);
                },
            })

            // Create highpass filter
            let filter = new Tone.Filter(700, "lowpass").toDestination();

            Draggable.create("#cards", {
                bounds: "body",
                onDrag: () => {
                    const bounds = cards.getBoundingClientRect();
                    coordinateXY = bounds;

                    player.connect(filter);
                },
                onDragEnd: () => {
                    player.disconnect(filter);
                }
            })

            // Create reverb
            let reverb = new Tone.Reverb(20, 0.01).toDestination();

            Draggable.create("#plate", {
                bounds: "body",
                onDrag: () => {
                    const bounds = plate.getBoundingClientRect();
                    coordinateXY = bounds;

                    player.connect(reverb);
                },
                onDragEnd: () => {
                    player.disconnect(reverb);
                }
            })

        });
    }
});

//playSound();
function playSound() {
    synth.triggerAttackRelease("C4", "8n");
}

// When box moves, play sound
let coordinateXY;

Draggable.create("#cardbox", {
    bounds: "body",
    onDrag: () => {
        const bounds = cardbox.getBoundingClientRect();
        coordinateXY = bounds;
        //console.log(bounds.x, bounds.y)
        playSound();
    },

    onDragStart: function () {
        console.log("drag starts at:", coordinateXY.x, coordinateXY.y);
    },
    onDragEnd: function () {
        console.log("drag ended at:", coordinateXY.x, coordinateXY.y);
    }
})

Draggable.create("#mug", {
    bounds: "body",
    onDrag: () => {
        const bounds = mug.getBoundingClientRect();
        coordinateXY = bounds;
        //console.log(bounds.x, bounds.y)
        //playSound();
    },

    // onDragStart: function () {
    //     console.log("drag starts at:", coordinateXY.x, coordinateXY.y);
    // },
    // onDragEnd: function () {
    //     console.log("drag ended at:", coordinateXY.x, coordinateXY.y);
    // }
})
