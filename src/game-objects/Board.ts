import { KaboomCtx } from 'kaboom';
import { BoardCoordinates, BoardMainMeasurements, BoardSpritesMeasurements, BOARD_QUADRANTS_COORDINATES } from '../constants/board-constants';

export class Board {

    constructor(private kaboomCtx: KaboomCtx) { }

    private async loadAssets() {
        try {
            await this.kaboomCtx.loadSprite('board-wall-left', 'board-sprites/board-wall-left.png');
            await this.kaboomCtx.loadSprite('board-wall-right-top', 'board-sprites/board-wall-right-top.png');
            await this.kaboomCtx.loadSprite('board-exit', 'board-sprites/board-exit.png');
            await this.kaboomCtx.loadSprite('board-wall-right-bottom', 'board-sprites/board-wall-right-bottom.png');
            await this.kaboomCtx.loadSprite('board-wall-top', 'board-sprites/board-wall-top.png');
            await this.kaboomCtx.loadSprite('board-wall-bottom', 'board-sprites/board-wall-bottom.png');
            await this.kaboomCtx.loadSprite('board-quadrant-top-row', 'board-sprites/board-quadrant-top-row.png');
            await this.kaboomCtx.loadSprite('board-quadrant', 'board-sprites/board-quadrant.png');
        } catch (error) {
            alert('Problema al cargar recursos');
            throw error;
        }
    }

    async addGameObject() {

        await this.loadAssets();

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
