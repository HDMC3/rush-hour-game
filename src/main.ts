import { AssetsLoader } from './AssetsLoader';
import { gameKaboomCtx } from './kaboomCtx';
import { GameScene } from './scenes/GameScene';
import { InstructionsScene } from './scenes/InstructionsScene';
import { LevelLoader } from './scenes/LevelLoader';
import { LevelWinScene } from './scenes/LevelWinScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { ScoresScene } from './scenes/ScoresScene';
import { SelectLevelScene } from './scenes/SelectLevelScene';

const levelLoader = new LevelLoader();
const assetsLoader = new AssetsLoader(gameKaboomCtx);

assetsLoader.loadSprites();

const data = gameKaboomCtx.getData('availableLevels');
if (data == null) {
    gameKaboomCtx.setData('availableLevels', [1]);
}

const completedLevels = gameKaboomCtx.getData('completedLevels');
if (completedLevels == null) {
    gameKaboomCtx.setData('completedLevels', []);
}

const gameScene = new GameScene(gameKaboomCtx);
const selectLevelScene = new SelectLevelScene(gameKaboomCtx, levelLoader);
const levelWinScene = new LevelWinScene(gameKaboomCtx);
const mainMenuScene = new MainMenuScene(gameKaboomCtx, levelLoader);
const instructionsScene = new InstructionsScene(gameKaboomCtx);
const scoresScene = new ScoresScene(gameKaboomCtx);

gameKaboomCtx.scene(GameScene.id, gameScene.sceneDef);
gameKaboomCtx.scene(SelectLevelScene.id, selectLevelScene.sceneDef);
gameKaboomCtx.scene(LevelWinScene.id, levelWinScene.sceneDef);
gameKaboomCtx.scene(MainMenuScene.id, mainMenuScene.sceneDef);
gameKaboomCtx.scene(InstructionsScene.id, instructionsScene.sceneDef);
gameKaboomCtx.scene(ScoresScene.id, scoresScene.sceneDef);

gameKaboomCtx.go(MainMenuScene.id);
