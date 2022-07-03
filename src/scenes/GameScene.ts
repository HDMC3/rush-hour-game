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
        const startButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);
        const selectLevelButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);

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
                startButtonPos,
                'start-button-sprite',
                () => {
                    console.log('START');
                }
            );

            selectLevelButtonPos.y += 50;
        }

        Button.addButton(
            this.kaboomCtx,
            'select-level-button',
            'top',
            selectLevelButtonPos,
            'select-level-button-sprite',
            () => {
                this.clearCars();
                this.kaboomCtx.go(SelectLevelScene.id);
                console.log('CLICK');
            }
        );

    };

    private clearCars() {
        for (const car of this.cars) {
            car.destroy();
        }
        this.cars.length = 0;
    }

}
