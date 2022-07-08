import { KaboomCtx, SceneDef } from 'kaboom';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { Button } from '../ui/Button';
import { GameScene } from './GameScene';
import { LevelLoader } from './LevelLoader';

export class LevelWinScene {
    static readonly id = 'LevelWinScene';


    constructor(private kaboomCtx: KaboomCtx) { }

    readonly sceneDef: SceneDef = async(level: PuzzleLevel) => {
        const borderW = level.levelNumber === 40 ? 670 : 495;
        const border = this.kaboomCtx.add([
            this.kaboomCtx.rect(borderW, 200),
            this.kaboomCtx.color(34, 42, 61),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y - 50)
        ]);
        border.radius = 16;

        const bgW = level.levelNumber === 40 ? 660 : 485;
        const bg = this.kaboomCtx.add([
            this.kaboomCtx.rect(bgW, 190),
            this.kaboomCtx.color(237, 242, 226),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y - 50)
        ]);
        bg.radius = 12;

        const text = level.levelNumber === 40 ? ' FELICIDADES!\nJUEGO COMPLETADO' : ` NIVEL-${level.levelNumber}\nCOMPLETADO!`;
        this.kaboomCtx.add([
            this.kaboomCtx.text(text, { font: 'custom-font', size: 45 }),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y - 50)
        ]);

        if (level.levelNumber === 40) {
            const mainMenuButton = new Button(this.kaboomCtx);
            mainMenuButton.addButton(
                'main-menu-button',
                'center',
                this.kaboomCtx.vec2(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 120),
                'main-menu-button-sprite',
                () => {}
            );
        } else {
            const levelLoader = new LevelLoader();
            const nextLevelNumber = level.levelNumber + 1;
            const difficulty = Math.floor(level.levelNumber / 10);
            const nextPuzzleLevel = await levelLoader.loadLevel(nextLevelNumber, difficulty);

            if (!nextPuzzleLevel) return;

            const nextLevelButton = new Button(this.kaboomCtx);
            nextLevelButton.addButton(
                'next-level-button',
                'center',
                this.kaboomCtx.vec2(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 120),
                'next-level-button-sprite',
                () => {
                    this.kaboomCtx.go(GameScene.id, nextPuzzleLevel);
                }
            );
        }
    };

}
