import { PuzzleLevelDifficulty } from '../constants/puzzle-level-contants';
import { PuzzleLevelCar } from './PuzzleLevelCar';
import { SolutionInstruction } from './SolutionInstruction';

export type PuzzleLevel = {
    levelNumber: number;
    cars: PuzzleLevelCar[];
    difficulty: PuzzleLevelDifficulty;
    solution: SolutionInstruction[]
}
