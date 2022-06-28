import { PuzzleLevelDifficulty } from '../constants/game-constants';
import { PuzzleLevelCar } from './PuzzleLevelCar';
import { SolutionInstruction } from './SolutionInstruction';

export type PuzzleLevel = {
    levelNumber: number;
    cars: PuzzleLevelCar[];
    difficulty: PuzzleLevelDifficulty;
    solution: SolutionInstruction[]
}
