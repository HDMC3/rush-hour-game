import { EventCanceller, KaboomCtx, SceneDef } from 'kaboom';
import { BoardCoordinates, BoardMainMeasurements } from '../constants/board-constants';
import { CAR_OBJECT_NAMES } from '../constants/car-constants';
import { Board } from '../game-objects/Board';
import { Car } from '../game-objects/Car';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { Button } from '../ui/Button';
import { MovesIndicator } from '../ui/MovesIndicator';
import { SceneHeader } from '../ui/SceneHeader';
import { TimeIndicator } from '../ui/TimeIndicator';
import { LevelWinScene } from './LevelWinScene';
import { SelectLevelScene } from './SelectLevelScene';

export class GameScene {
    static readonly id: string = 'GameScene';
    private cars: Car[];
    private startButton: Button;
    private pauseButton: Button;
    private selectLevelButton: Button;
    private timeIndicator: TimeIndicator;
    private movesIndicator: MovesIndicator;
    private onMoveCarEvent?: EventCanceller;

    constructor(private kaboomCtx: KaboomCtx) {
        this.cars = [];
        this.startButton = new Button(this.kaboomCtx);
        this.pauseButton = new Button(this.kaboomCtx);
        this.selectLevelButton = new Button(this.kaboomCtx);
        this.timeIndicator = new TimeIndicator(this.kaboomCtx);
        this.movesIndicator = new MovesIndicator(this.kaboomCtx);
    }

    readonly sceneDef: SceneDef = async(level?: PuzzleLevel) => {

        SceneHeader.addHeader(this.kaboomCtx, level ? `NIVEL ${level.levelNumber}` : 'NIVEL NO SELECCIONADO');

        const board = new Board(this.kaboomCtx);
        await board.addGameObject();

        const timeIndicatorPos = this.kaboomCtx.vec2(50, BoardCoordinates.Y);
        this.timeIndicator.addTimeIndicator(timeIndicatorPos);
        const movesIndicatorPos = this.kaboomCtx.vec2(this.kaboomCtx.width() - 50, BoardCoordinates.Y);
        this.movesIndicator.addMovesIndicator(movesIndicatorPos);

        const startButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x - BoardMainMeasurements.BOARD_SIDE_LENGTH / 4, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);
        const pauseButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x + BoardMainMeasurements.BOARD_SIDE_LENGTH / 4, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);
        const selectLevelButtonPos = this.kaboomCtx.vec2(this.kaboomCtx.center().x, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH + 20);

        if (level) {
            for (const levelCar of level.cars) {
                const car = new Car(this.kaboomCtx, levelCar.carId, levelCar.x, levelCar.y, levelCar.orientation);
                car.addGameObject();
                car.lock();
                this.cars.push(car);
            }

            this.startButton.addButton(
                'start-button',
                'top',
                startButtonPos,
                'start-button-sprite',
                () => {
                    this.unlockCars();
                    this.timeIndicator.start();
                    this.pauseButton.enable();
                    this.startButton.disable();
                    this.selectLevelButton.disable();
                    this.onMoveCarEvent = this.kaboomCtx.on('movecar', 'car', () => {
                        this.movesIndicator.increment();
                    });
                }
            );

            this.pauseButton.addButton(
                'pause-button',
                'top',
                pauseButtonPos,
                'pause-button-sprite',
                () => {
                    this.lockCars();
                    this.timeIndicator.pause();
                    this.startButton.enable();
                    this.pauseButton.disable();
                    this.selectLevelButton.enable();
                    if (this.onMoveCarEvent) this.onMoveCarEvent();
                }
            );
            this.pauseButton.disable();

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
                this.timeIndicator.destroy();
                this.movesIndicator.destroy();
                if (this.onMoveCarEvent) {
                    this.onMoveCarEvent();
                }
                this.kaboomCtx.go(SelectLevelScene.id);
            }
        );

        this.kaboomCtx.onCollide(CAR_OBJECT_NAMES.X, 'exit', () => {
            const xCar = this.cars.find(car => car.carId === 'X');
            if (xCar) {
                this.lockCars();
                xCar.startWinAnimation();
            }
            this.kaboomCtx.wait(0.5, () => {
                this.clearCars();
                this.clearButtons();
                this.timeIndicator.destroy();
                this.movesIndicator.destroy();
                if (this.onMoveCarEvent) {
                    this.onMoveCarEvent();
                }
                const levelsData = this.kaboomCtx.getData<number[]>('completedLevels');
                if (level && level.levelNumber !== 40 && !levelsData.includes(level.levelNumber + 1)) {
                    levelsData.push(level.levelNumber + 1);
                    this.kaboomCtx.setData('completedLevels', levelsData);
                }
                this.kaboomCtx.go(LevelWinScene.id, level);
            });
        });

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

    private unlockCars() {
        for (const car of this.cars) {
            car.unlock();
        }
    }

    private lockCars() {
        for (const car of this.cars) {
            car.lock();
        }
    }

}
