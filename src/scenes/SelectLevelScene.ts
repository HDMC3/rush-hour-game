import { AreaComp, GameObj, KaboomCtx, OriginComp, PosComp, SceneDef, SpriteComp, TextComp, Vec2 } from 'kaboom';
import { PuzzleLevelDifficulty } from '../constants/puzzle-level-contants';
import { BANNERS_SPRITE_DATA } from '../constants/select-level-scene-constants';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { Button } from '../ui/Button';
import { SceneHeader } from '../ui/SceneHeader';
import { GameScene } from './GameScene';
import { LevelLoader } from './LevelLoader';

export class SelectLevelScene {
    static readonly id: string = 'SelectLevelScene';
    private levelButtons: GameObj<SpriteComp
        | TextComp
        | PosComp
        | AreaComp
        | OriginComp
        | { levelNumber: number, difficulty: PuzzleLevelDifficulty, selected: boolean, clicked: boolean, disabled: boolean }
    >[];

    private levelSelectedCard?: GameObj<SpriteComp | PosComp | OriginComp>;
    private puzzleLevelSelected?: PuzzleLevel;

    private backButton: Button;
    private selectButton: Button;

    private levelsData: number[];

    private leftPadding = 50;
    private rightPadding = 50;
    private headerHeight = 76;

    constructor(private kaboomCtx: KaboomCtx, private levelLoader: LevelLoader) {
        this.levelButtons = [];
        this.backButton = new Button(this.kaboomCtx);
        this.selectButton = new Button(this.kaboomCtx);
        this.levelsData = this.kaboomCtx.getData<number[]>('availableLevels');
    }

    sceneDef: SceneDef = async(currentLevel?: PuzzleLevel) => {

        this.levelsData = this.kaboomCtx.getData<number[]>('availableLevels');

        SceneHeader.addHeader(this.kaboomCtx, 'NIVELES', this.headerHeight);

        this.puzzleLevelSelected = currentLevel;

        this.backButton.addButton(
            'back-button',
            'left',
            this.kaboomCtx.vec2(10, this.headerHeight / 2),
            'back-button-sprite',
            () => {
                this.levelButtons.length = 0;
                this.kaboomCtx.go(GameScene.id, this.puzzleLevelSelected);
            }
        );

        this.levelSelectedCard = this.kaboomCtx.add([
            this.kaboomCtx.sprite('level-cards-sprite', { frame: this.levelsData[this.levelsData.length - 1] - 1 }),
            this.kaboomCtx.origin('right'),
            this.kaboomCtx.pos(this.kaboomCtx.width() - this.rightPadding, this.kaboomCtx.center().y)
        ]);

        this.selectButton.addButton(
            'select-button',
            'top',
            this.kaboomCtx.vec2(this.levelSelectedCard.pos.x - this.levelSelectedCard.width / 2, this.levelSelectedCard.pos.y + this.levelSelectedCard.height / 2 + 20),
            'select-button-sprite',
            async() => {
                const levelButtonSelected = this.levelButtons.find(btn => btn.selected);
                if (!levelButtonSelected) return;
                this.puzzleLevelSelected = await this.levelLoader.loadLevel(levelButtonSelected.levelNumber, levelButtonSelected.difficulty);
                if (!this.puzzleLevelSelected) return;
                this.levelButtons.length = 0;
                this.kaboomCtx.go(GameScene.id, this.puzzleLevelSelected);
            }
        );

        const difficultyLevels: PuzzleLevelDifficulty[] = [PuzzleLevelDifficulty.BEGINNER, PuzzleLevelDifficulty.INTERMEDIATE, PuzzleLevelDifficulty.ADVANCED, PuzzleLevelDifficulty.EXPERT];
        const numberOfLevels = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
        ];
        for (const difficultyLevel of difficultyLevels) {
            const yCoord = this.headerHeight + 10 + ((this.kaboomCtx.height() - this.headerHeight - 10) * difficultyLevel / 4);
            let xCoord = this.leftPadding;
            const levelButtonWidth = 46;
            const levelButtonHeight = 48;
            const levelBanner = this.kaboomCtx.add([
                this.kaboomCtx.sprite(BANNERS_SPRITE_DATA[difficultyLevel].name),
                this.kaboomCtx.pos(xCoord, yCoord)
            ]);

            for (const levelNumber of numberOfLevels[difficultyLevel]) {
                const levelButtonIsDisabled = !this.levelsData.includes(levelNumber);
                const levelButtonPos = this.kaboomCtx.vec2(xCoord + levelButtonWidth / 2, yCoord + levelBanner.height + 10 + levelButtonHeight / 2);
                const levelButton = this.addLevelButton(levelButtonPos, levelNumber, difficultyLevel, levelButtonWidth, levelButtonIsDisabled);
                this.levelButtons.push(levelButton);
                xCoord += levelButtonWidth + 10;
            }
        }
    };

    private addLevelButton(pos: Vec2, levelNumber: number, difficultyLevel: PuzzleLevelDifficulty, levelButtonWidth: number, disabled: boolean) {
        const levelButton = this.kaboomCtx.add([
            this.kaboomCtx.sprite('level-button-sprite'),
            this.kaboomCtx.text(`${levelNumber}`, { font: 'custom-font', lineSpacing: 30, width: levelButtonWidth }), // lineSpacing y width son para ajustar las dimensiones del texto a las del boton
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(pos),
            this.kaboomCtx.area(),
            {
                levelNumber,
                difficulty: difficultyLevel,
                selected: levelNumber === this.levelsData[this.levelsData.length - 1],
                clicked: false,
                disabled
            }
        ]);

        levelButton.play(disabled ? 'disabled' : levelButton.selected ? 'selected' : 'default');
        levelButton.onClick(async() => {
            if (!levelButton.disabled) levelButton.play('click');
        });

        levelButton.onAnimEnd('click', () => {
            this.levelButtons.forEach(btn => {
                btn.selected = false;
                if (!btn.disabled) btn.play('default');
            });
            levelButton.selected = true;
            levelButton.play('selected');
            if (this.levelSelectedCard) {
                this.levelSelectedCard.frame = levelButton.levelNumber - 1;
            }
        });

        this.kaboomCtx.onMouseRelease(() => {
            levelButton.clicked = false;
        });

        return levelButton;
    }

}
