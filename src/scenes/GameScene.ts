import { SceneDef } from 'kaboom';

export class GameScene {
    id: string;

    constructor() {
        this.id = 'GameScene';
    }

    sceneDef: SceneDef = () => { };

}
