import { KaboomCtx, SceneDef } from 'kaboom';
import { BoardCoordinates, BoardMainMeasurements } from '../constants/board-constants';
import { Board } from '../game-objects/Board';
import { Car } from '../game-objects/Car';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { Button } from '../ui/Button';
import { SelectLevelScene } from './SelectLevelScene';

export class GameScene {
    static readonly id: string = 'GameScene';
    private cars: Car[];

    constructor(private kaboomCtx: KaboomCtx) {
        this.cars = [];
    }

    readonly sceneDef: SceneDef = async(level?: PuzzleLevel) => {
        const board = new Board(this.kaboomCtx);
        await board.addGameObject();
        const actionButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);

        if (level) {
            for (const levelCar of level.cars) {
                const car = new Car(this.kaboomCtx, levelCar.carId, levelCar.x, levelCar.y, levelCar.orientation);
                car.addGameObject();
                this.cars.push(car);
            }

            Button.addButton(
                this.kaboomCtx,
                'start-button',
                'top',
                actionButtonPos,
                'start-button-sprite',
                'start-button-sprite.png',
                () => {
                    console.log('START');
                }
            );
        } else {
            Button.addButton(
                this.kaboomCtx,
                'select-level-button',
                'top',
                actionButtonPos,
                'select-level-button-sprite',
                'select-level-button-sprite.png',
                () => {
                    this.kaboomCtx.go(SelectLevelScene.id, level);
                    console.log('CLICK');
                }
            );
        }

    };

}
