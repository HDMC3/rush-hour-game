import { gameKaboomCtx } from './kaboomCtx';
import { GameScene } from './scenes/GameScene';

const gameScene = new GameScene(gameKaboomCtx);

gameKaboomCtx.scene(gameScene.id, gameScene.sceneDef);

gameKaboomCtx.go(gameScene.id);
