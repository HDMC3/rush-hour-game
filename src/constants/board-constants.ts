import { gameKaboomCtx } from '../kaboomCtx';
import { Coordinate } from '../types/Coordinate';

export enum BoardMainMeasurements {
    BOARD_SIDE_LENGTH = 360,
    BOARD_WALLS_WIDTH = 12,
    BOARD_BOX_WIDTH = 48,
    MARGIN_BOARD_BOX = 4
}

export enum BoardCoordinates {
    X = gameKaboomCtx.center().x - (BoardMainMeasurements.BOARD_SIDE_LENGTH / 2),
    Y = gameKaboomCtx.center().y - (BoardMainMeasurements.BOARD_SIDE_LENGTH / 2) - 25
}

export enum InsideBoardCoordinates {
    X = BoardCoordinates.X + BoardMainMeasurements.BOARD_WALLS_WIDTH,
    Y = BoardCoordinates.Y + BoardMainMeasurements.BOARD_WALLS_WIDTH
}

export enum BoardSpritesMeasurements {
    TOP_BOARD_SIDE_LENGTH = BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH * 2,
    BOTTOM_BOARD_SIDE_LENGTH = BoardMainMeasurements.BOARD_SIDE_LENGTH - BoardMainMeasurements.BOARD_WALLS_WIDTH * 2,
    LEFT_BOARD_SIDE_LENGTH = BoardMainMeasurements.BOARD_SIDE_LENGTH,
    RIGHT_BOARD_SIDE_LENGTH = BoardMainMeasurements.BOARD_SIDE_LENGTH,
    BOARD_QUADRANT_WIDTH = BoardMainMeasurements.BOARD_BOX_WIDTH + BoardMainMeasurements.MARGIN_BOARD_BOX * 2
}

export const BOARD_QUADRANTS_COORDINATES: Coordinate[][] = [];

for (let x = 0; x < 6; x++) {
    const xCoord = (x * BoardSpritesMeasurements.BOARD_QUADRANT_WIDTH) + InsideBoardCoordinates.X;
    BOARD_QUADRANTS_COORDINATES[x] = [];
    for (let y = 0; y < 6; y++) {
        const yCoord = (y * BoardSpritesMeasurements.BOARD_QUADRANT_WIDTH) + InsideBoardCoordinates.Y;
        BOARD_QUADRANTS_COORDINATES[x][y] = { X: xCoord, Y: yCoord };
    }
}
