import { AssetsLoader } from './AssetsLoader';
import { gameKaboomCtx } from './kaboomCtx';
import { GameScene } from './scenes/GameScene';
import { LevelLoader } from './scenes/LevelLoader';
import { SelectLevelScene } from './scenes/SelectLevelScene';

const levelLoader = new LevelLoader();
const assetsLoader = new AssetsLoader(gameKaboomCtx);

assetsLoader.loadSprites();

const gameScene = new GameScene(gameKaboomCtx);
const selectLevelScene = new SelectLevelScene(gameKaboomCtx, levelLoader);

gameKaboomCtx.scene(GameScene.id, gameScene.sceneDef);
gameKaboomCtx.scene(SelectLevelScene.id, selectLevelScene.sceneDef);

gameKaboomCtx.go(GameScene.id);
