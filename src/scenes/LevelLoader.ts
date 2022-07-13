import { PuzzleLevelDifficulty } from '../constants/puzzle-level-contants';
import { PuzzleLevel } from '../types/PuzzleLevel';

export class LevelLoader {
    private fileLevelNames: Record<PuzzleLevelDifficulty, string> = {
        0: 'beginner-levels.json',
        1: 'intermediate-levels.json',
        2: 'advanced-levels.json',
        3: 'expert-levels.json'
    };

    constructor() { }

    async loadLevel(levelNumber: number, dificulty: PuzzleLevelDifficulty) {

        const levels: PuzzleLevel[] = await this.loadLevelsByDifficulty(dificulty);

        const selectedLevel = levels.find(lvl => lvl.levelNumber === levelNumber);

        if (!selectedLevel) {
            alert('Nivel no encontrado');
            return;
        }

        return selectedLevel;
    }

    async loadLevelsByDifficulty(dificulty: PuzzleLevelDifficulty) {
        let levels: PuzzleLevel[] = [];
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}levels/${this.fileLevelNames[dificulty]}`);
            levels = await response.json();
        } catch (error) {
            alert('Problema al cargar niveles');
        }

        return levels;
    }
}
