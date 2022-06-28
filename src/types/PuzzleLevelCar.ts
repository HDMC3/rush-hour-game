import { CarId } from './CarId';
import { CarOrientation } from './CarOrientation';

export type PuzzleLevelCar = {
    carId: CarId;
    x: number;
    y: number;
    orientation: CarOrientation;
}
