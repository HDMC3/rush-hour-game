import { AreaComp, GameObj, KaboomCtx, OriginComp, PosComp, SceneDef, SpriteComp, TextComp, Vec2 } from 'kaboom';
import { PuzzleLevelDifficulty } from '../constants/puzzle-level-contants';
import { PuzzleLevel } from '../types/PuzzleLevel';
import { SpriteLoadData } from '../types/SpriteLoadData';
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
        | { levelNumber: number, difficulty: PuzzleLevelDifficulty, selected: boolean, clicked: boolean }
    >[];

    private levelSelectedCard?: GameObj<SpriteComp | PosComp | OriginComp>;
    private puzzleLevelSelected?: PuzzleLevel;


    private BANNERS_SPRITE_DATA: Record<PuzzleLevelDifficulty, SpriteLoadData> = {
        0: { name: 'levels-beginner-banner-sprite', spriteSource: 'levels-beginner-banner-sprite.png' },
        1: { name: 'levels-intermediate-banner-sprite', spriteSource: 'levels-intermediate-banner-sprite.png' },
        2: { name: 'levels-advanced-banner-sprite', spriteSource: 'levels-advanced-banner-sprite.png' },
        3: { name: 'levels-expert-banner-sprite', spriteSource: 'levels-expert-banner-sprite.png' }
    };

    private leftPadding = 50;
    private rightPadding = 50;
    private headerHeight = 76;

    constructor(private kaboomCtx: KaboomCtx, private levelLoader: LevelLoader) {
        this.levelButtons = [];
    }

    sceneDef: SceneDef = async() => {
        await this.kaboomCtx.loadSprite('level-button-sprite', 'ui-sprites/select-level-scene/level-button-sprite.png',
            {
                sliceX: 3,
                anims: {
                    default: 0,
                    click: 1,
                    selected: 2
                }
            }
        );
        await this.kaboomCtx.loadSprite(
            this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.BEGINNER].name,
            'ui-sprites/select-level-scene/' + this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.BEGINNER].spriteSource
        );
        await this.kaboomCtx.loadSprite(
            this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.INTERMEDIATE].name,
            'ui-sprites/select-level-scene/' + this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.INTERMEDIATE].spriteSource
        );
        await this.kaboomCtx.loadSprite(
            this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.ADVANCED].name,
            'ui-sprites/select-level-scene/' + this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.ADVANCED].spriteSource
        );
        await this.kaboomCtx.loadSprite(
            this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.EXPERT].name,
            'ui-sprites/select-level-scene/' + this.BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.EXPERT].spriteSource
        );

        await this.kaboomCtx.loadSprite('level-cards-sprite', 'ui-sprites/select-level-scene/level-cards-sprite.png',
            {
                sliceX: 10,
                sliceY: 4
            }
        );

        SceneHeader.addHeader(this.kaboomCtx, 'NIVELES', this.headerHeight);

        Button.addButton(
            this.kaboomCtx,
            'back-button',
            'left',
            this.kaboomCtx.vec2(10, this.headerHeight / 2),
            'back-button-sprite',
            () => {
                this.kaboomCtx.go(GameScene.id, this.puzzleLevelSelected);
            }
        );

        this.levelSelectedCard = this.kaboomCtx.add([
            this.kaboomCtx.sprite('level-cards-sprite', { frame: this.puzzleLevelSelected ? this.puzzleLevelSelected.levelNumber - 1 : 0 }),
            this.kaboomCtx.origin('right'),
            this.kaboomCtx.pos(this.kaboomCtx.width() - this.rightPadding, this.kaboomCtx.center().y)
        ]);

        Button.addButton(
            this.kaboomCtx,
            'select-button',
            'top',
            this.kaboomCtx.vec2(this.levelSelectedCard.pos.x - this.levelSelectedCard.width / 2, this.levelSelectedCard.pos.y + this.levelSelectedCard.height / 2 + 20),
            'select-button-sprite',
            async() => {
                const levelButtonSelected = this.levelButtons.find(btn => btn.selected);
                if (!levelButtonSelected) return;
                this.puzzleLevelSelected = await this.levelLoader.loadLevel(levelButtonSelected.levelNumber, levelButtonSelected.difficulty);
                if (!this.puzzleLevelSelected) return;
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
                this.kaboomCtx.sprite(this.BANNERS_SPRITE_DATA[difficultyLevel].name),
                this.kaboomCtx.pos(xCoord, yCoord)
            ]);

            for (const levelNumber of numberOfLevels[difficultyLevel]) {

                const levelButtonPos = this.kaboomCtx.vec2(xCoord + levelButtonWidth / 2, yCoord + levelBanner.height + 10 + levelButtonHeight / 2);
                const levelButton = this.addLevelButton(levelButtonPos, levelNumber, difficultyLevel, levelButtonWidth);
                this.levelButtons.push(levelButton);
                xCoord += levelButtonWidth + 10;
            }
        }
    };

    private addLevelButton(pos: Vec2, levelNumber: number, difficultyLevel: PuzzleLevelDifficulty, levelButtonWidth: number) {
        const levelButton = this.kaboomCtx.add([
            this.kaboomCtx.sprite('level-button-sprite'),
            this.kaboomCtx.text(`${levelNumber}`, { font: 'custom-font', lineSpacing: 30, width: levelButtonWidth }), // lineSpacing y width son para ajustar las dimensiones del texto a las del boton
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(pos),
            this.kaboomCtx.area(),
            {
                levelNumber,
                difficulty: difficultyLevel,
                selected: this.puzzleLevelSelected ? this.puzzleLevelSelected.levelNumber === levelNumber : levelNumber === 1,
                clicked: false
            }
        ]);

        levelButton.play('default');
        levelButton.onClick(async() => {
            if (!levelButton.clicked) {
                this.levelButtons.forEach(btn => { btn.selected = false; });
                levelButton.selected = true;
                if (this.levelSelectedCard) {
                    this.levelSelectedCard.frame = levelButton.levelNumber - 1;
                }
            }
            levelButton.clicked = true;
        });

        this.kaboomCtx.onMouseRelease(() => {
            levelButton.clicked = false;
        });

        levelButton.onUpdate(() => {
            levelButton.play(levelButton.clicked && levelButton.isHovering() ? 'click' : levelButton.selected ? 'selected' : 'default');
            this.kaboomCtx.cursor(this.levelButtons.some(btn => btn.isHovering()) ? 'pointer' : 'default');
        });

        return levelButton;
    }

}
