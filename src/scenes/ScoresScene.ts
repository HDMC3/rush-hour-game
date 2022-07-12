import { Color, KaboomCtx, SceneDef } from 'kaboom';
import { PuzzleLevelDifficulty } from '../constants/puzzle-level-contants';
import { Button } from '../ui/Button';
import { SceneHeader } from '../ui/SceneHeader';
import { MainMenuScene } from './MainMenuScene';

export class ScoresScene {
    static readonly id = 'ScoresScene';
    private headerHeight = 76;
    private beginnerButton: Button;
    private intermediateButton: Button;
    private advancedButton: Button;
    private expertButton: Button;
    private initialMenuButton: Button;

    constructor(private kaboomCtx: KaboomCtx) {
        this.beginnerButton = new Button(this.kaboomCtx);
        this.intermediateButton = new Button(this.kaboomCtx);
        this.advancedButton = new Button(this.kaboomCtx);
        this.expertButton = new Button(this.kaboomCtx);
        this.initialMenuButton = new Button(this.kaboomCtx);
    }

    sceneDef: SceneDef = () => {
        SceneHeader.addHeader(this.kaboomCtx, 'PUNTUACIONES');

        this.initialMenuButton.addButton(
            'initial-menu-button',
            'left',
            this.kaboomCtx.vec2(10, this.headerHeight / 2),
            'initial-menu-button-sprite',
            () => {
                this.kaboomCtx.go(MainMenuScene.id);
            }
        );

        this.showScores(this.kaboomCtx.color(119, 217, 97).color, PuzzleLevelDifficulty.BEGINNER);

        this.beginnerButton.addButton(
            'beginner-scores-button',
            'left',
            this.kaboomCtx.vec2(100, this.headerHeight + 40),
            'beginner-scores-button-sprite',
            () => {
                const beginnerColor = this.kaboomCtx.color(119, 217, 97).color;
                this.showScores(beginnerColor, PuzzleLevelDifficulty.BEGINNER);
            }
        );

        this.intermediateButton.addButton(
            'intermediate-scores-button',
            'left',
            this.kaboomCtx.vec2(this.kaboomCtx.width() * 0.40 - 35, this.headerHeight + 40),
            'intermediate-scores-button-sprite',
            () => {
                const intermediateColor = this.kaboomCtx.color(255, 169, 84).color;
                this.showScores(intermediateColor, PuzzleLevelDifficulty.INTERMEDIATE);
            }
        );

        this.advancedButton.addButton(
            'advanced-scores-button',
            'left',
            this.kaboomCtx.vec2(this.kaboomCtx.width() * 0.60 - 20, this.headerHeight + 40),
            'advanced-scores-button-sprite',
            () => {
                const advancedColor = this.kaboomCtx.color(32, 157, 232).color;
                this.showScores(advancedColor, PuzzleLevelDifficulty.ADVANCED);
            }
        );

        this.expertButton.addButton(
            'expert-scores-button',
            'left',
            this.kaboomCtx.vec2(this.kaboomCtx.width() * 0.80 - 30, this.headerHeight + 40),
            'expert-scores-button-sprite',
            () => {
                const expertColor = this.kaboomCtx.color(238, 77, 85).color;
                this.showScores(expertColor, PuzzleLevelDifficulty.EXPERT);
            }
        );
    };

    private showScores(color: Color, difficulty: PuzzleLevelDifficulty) {
        this.kaboomCtx.destroyAll('gameobj-data-level');

        const completedLevels = this.kaboomCtx.getData<any[]>('completedLevels');

        const levelRange = {
            0: {
                range1: { init: 1, end: 5 },
                range2: { init: 6, end: 10 }
            },
            1: {
                range1: { init: 11, end: 15 },
                range2: { init: 16, end: 20 }
            },
            2: {
                range1: { init: 21, end: 25 },
                range2: { init: 26, end: 30 }
            },
            3: {
                range1: { init: 31, end: 35 },
                range2: { init: 36, end: 40 }
            }
        };

        let column1Text = '';
        let column2Text = '';

        const levelsData1 = completedLevels
            .filter(
                data => data.levelNumber >= levelRange[difficulty].range1.init && data.levelNumber <= levelRange[difficulty].range1.end
            );
        for (const data of levelsData1) {
            column1Text += `NIVEL: ${data.levelNumber}\nTIEMPO: ${data.time}\nMOVIMIENTOS: ${data.moves}\n\n`;
        }


        const levelsData2 = completedLevels
            .filter(
                data => data.levelNumber >= levelRange[difficulty].range2.init && data.levelNumber <= levelRange[difficulty].range2.end
            );

        for (const data of levelsData2) {
            column2Text += `NIVEL: ${data.levelNumber}\nTIEMPO: ${data.time}\nMOVIMIENTOS: ${data.moves}\n\n`;
        }

        if (levelsData1.length === 0) {
            const bg = this.kaboomCtx.add([
                this.kaboomCtx.rect(575, 100),
                this.kaboomCtx.outline(10),
                this.kaboomCtx.origin('center'),
                this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y),
                'gameobj-data-level'
            ]);
            bg.radius = 10;

            this.kaboomCtx.add([
                this.kaboomCtx.text('NO HAY PUNTUACIONES', { font: 'custom-font', size: 36 }),
                this.kaboomCtx.origin('center'),
                this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y),
                'gameobj-data-level'
            ]);
        } else {
            const column1 = this.kaboomCtx.add([
                this.kaboomCtx.rect(this.kaboomCtx.width() / 2 - 100, this.kaboomCtx.height() - this.headerHeight - 110),
                this.kaboomCtx.color(color),
                this.kaboomCtx.outline(5),
                this.kaboomCtx.pos(50, 80 + this.headerHeight),
                'gameobj-data-level'
            ]);

            column1.radius = 10;

            this.kaboomCtx.add([
                this.kaboomCtx.text(
                    column1Text,
                    { font: 'custom-font', lineSpacing: 2 }
                ),
                this.kaboomCtx.origin('topleft'),
                this.kaboomCtx.pos(column1.pos.x + 60, column1.pos.y + 15),
                'gameobj-data-level'
            ]);

            const column2 = this.kaboomCtx.add([
                this.kaboomCtx.rect(this.kaboomCtx.width() / 2 - 100, this.kaboomCtx.height() - this.headerHeight - 110),
                this.kaboomCtx.color(color),
                this.kaboomCtx.outline(5),
                this.kaboomCtx.pos((this.kaboomCtx.width() / 2 - 100) + 150, 80 + this.headerHeight),
                'gameobj-data-level'
            ]);

            column2.radius = 10;

            this.kaboomCtx.add([
                this.kaboomCtx.text(
                    column2Text,
                    { font: 'custom-font', lineSpacing: 2 }
                ),
                this.kaboomCtx.origin('topleft'),
                this.kaboomCtx.pos(column2.pos.x + 60, column2.pos.y + 15),
                'gameobj-data-level'
            ]);
        }
    }
}
