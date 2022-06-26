import { KaboomCtx, SceneDef } from 'kaboom';
import { Board } from '../game-objects/Board';

export class GameScene {
    readonly id: string;

    constructor(private kaboomCtx: KaboomCtx) {
        this.id = 'GameScene';
    }

    readonly sceneDef: SceneDef = async() => {
        const board = new Board(this.kaboomCtx);
        await board.addGameObject();
    };

}
