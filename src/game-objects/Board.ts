import { KaboomCtx } from 'kaboom';
import { BoardCoordinates, BoardMainMeasurements, BoardSpritesMeasurements, BOARD_QUADRANTS_COORDINATES } from '../constants/board-constants';

export class Board {

    constructor(private kaboomCtx: KaboomCtx) { }

    async addGameObject() {
        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-wall-left'),
            this.kaboomCtx.pos(BoardCoordinates.X, BoardCoordinates.Y),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            'wall'
        ]);

        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-wall-top'),
            this.kaboomCtx.pos(BoardCoordinates.X + BoardMainMeasurements.BOARD_WALLS_WIDTH, BoardCoordinates.Y),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            'wall'
        ]);

        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-wall-right-top'),
            this.kaboomCtx.pos(BoardCoordinates.X + BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH, BoardCoordinates.Y),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            'wall'
        ]);
        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-exit'),
            this.kaboomCtx.pos(BoardCoordinates.X + BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH, BoardCoordinates.Y + BoardMainMeasurements.BOARD_WALLS_WIDTH + (BoardSpritesMeasurements.BOARD_QUADRANT_WIDTH * 2)),
            this.kaboomCtx.area(),
            'exit'
        ]);

        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-wall-right-bottom'),
            this.kaboomCtx.pos(BoardCoordinates.X + BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH, BoardCoordinates.Y + BoardMainMeasurements.BOARD_WALLS_WIDTH + (BoardSpritesMeasurements.BOARD_QUADRANT_WIDTH * 3)),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            'wall'
        ]);

        this.kaboomCtx.add([
            this.kaboomCtx.sprite('board-wall-bottom'),
            this.kaboomCtx.pos(BoardCoordinates.X + BoardMainMeasurements.BOARD_WALLS_WIDTH, BoardCoordinates.Y + BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            'wall'
        ]);

        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                this.kaboomCtx.add([
                    this.kaboomCtx.sprite(y === 0 ? 'board-quadrant-top-row' : 'board-quadrant'),
                    this.kaboomCtx.pos(BOARD_QUADRANTS_COORDINATES[x][y].X, BOARD_QUADRANTS_COORDINATES[x][y].Y)
                ]);
            }
        }
    }


}
