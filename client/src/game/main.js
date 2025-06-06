import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Lobby } from "./scenes/Lobby";
import { AUTO, Game, Scale } from "phaser";
import { FinishLevel } from "./scenes/FinishLevel";
import { LevelSelector } from "./scenes/LevelSelector";
import { Leaderboard } from "./scenes/Leaderboard";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: "game-container",
    backgroundColor: "#028af8",
    fontFamily: "Orbitron, Arial",
    scale: {
        mode: Scale.RESIZE, // Adjust the game size to fit the screen
        autoCenter: Scale.CENTER_BOTH, // Center the game on the screen
        fullscreenTarget: "game-container", // Enable fullscreen targeting the game container
    },
    // Use Phaser's built-in Arcade physics
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false,
        },
    },
    scene: [Boot, Preloader, MainMenu, Lobby, LevelSelector, MainGame, GameOver, FinishLevel, Leaderboard],
    // Add explicit input configuration to ensure touch/mouse works properly
    input: {
        activePointers: 2, // Enable multi-touch
        keyboard: true,
        mouse: true,
        touch: true,
    },
};

const StartGame = parent => {
    const game = new Game({ ...config, parent });

    // Dynamically resize the game to fit the window
    const resize = () => {
        const { innerWidth, innerHeight } = window;
        game.scale.resize(innerWidth, innerHeight);

        // Ensure all scenes are notified of the resize
        game.scene.scenes.forEach(scene => {
            if (scene.scale) {
                scene.scale.resize(innerWidth, innerHeight);
            }
        });
    };

    // Call resize on window resize
    window.addEventListener("resize", resize);

    // Initial resize to fit the current window size
    resize();

    return game;
};

export default StartGame;
