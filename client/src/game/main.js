import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { AUTO, Game, Scale } from "phaser";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: "game-container",
    backgroundColor: "#028af8",
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    // Use Phaser's built-in Arcade physics
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false,
        },
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = parent => {
    return new Game({ ...config, parent });
};

export default StartGame;
