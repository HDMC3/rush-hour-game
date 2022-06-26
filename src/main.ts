import kaboomCtx from './kaboomCtx';
import { GameScene } from './scenes/GameScene';

const gameScene = new GameScene();

kaboomCtx.scene(gameScene.id, gameScene.sceneDef);

kaboomCtx.go(gameScene.id);
