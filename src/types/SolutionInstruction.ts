import { CarId } from './CarId';

export type SolutionInstruction = `${CarId}${'U' | 'R' | 'D' | 'L'}${1 | 2 | 3 | 4 | 5 | 6}`;
