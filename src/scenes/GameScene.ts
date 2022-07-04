import { KaboomCtx, SceneDef } from 'kaboom';
import { BoardCoordinates, BoardMainMeasurements } from '../constants/board-constants';
import { Board } from '../game-objects/Board';
import { Car } from '../game-objects/Car';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { Button } from '../ui/Button';
import { SceneHeader } from '../ui/SceneHeader';
import { SelectLevelScene } from './SelectLevelScene';

export class GameScene {
    static readonly id: string = 'GameScene';
    private cars: Car[];
    private startButton: Button;
    private selectLevelButton: Button;

    constructor(private kaboomCtx: KaboomCtx) {
        this.cars = [];
        this.startButton = new Button(this.kaboomCtx);
        this.selectLevelButton = new Button(this.kaboomCtx);
    }

    readonly sceneDef: SceneDef = async(level?: PuzzleLevel) => {

        SceneHeader.addHeader(this.kaboomCtx, level ? `NIVEL ${level.levelNumber}` : 'NIVEL NO SELECCIONADO');

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

            this.startButton.addButton(
                'start-button',
                'top',
                startButtonPos,
                'start-button-sprite',
                () => {
                }
            );

            selectLevelButtonPos.y += 50;
        }

        this.selectLevelButton.addButton(
            'select-level-button',
            'top',
            selectLevelButtonPos,
            'select-level-button-sprite',
            () => {
                this.clearCars();
                this.clearButtons();
                this.kaboomCtx.go(SelectLevelScene.id);
            }
        );

    };

    private clearCars() {
        for (const car of this.cars) {
            car.destroy();
        }
        this.cars.length = 0;
    }

    private clearButtons() {
        this.startButton.destroy();
        this.selectLevelButton.destroy();
    }

}
