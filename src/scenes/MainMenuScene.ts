import { KaboomCtx, SceneDef } from 'kaboom';
import { Button } from '../ui/Button';
import { GameScene } from './GameScene';
import { InstructionsScene } from './InstructionsScene';
import { LevelLoader } from './LevelLoader';

export class MainMenuScene {
    static readonly id = 'MainMenuScene';
    private playButton: Button;
    private instructionsButton: Button;
    private punctuationsButton: Button;

    constructor(private kaboomCtx: KaboomCtx, private levelLoader: LevelLoader) {
        this.playButton = new Button(this.kaboomCtx);
        this.instructionsButton = new Button(this.kaboomCtx);
        this.punctuationsButton = new Button(this.kaboomCtx);
    }

    readonly sceneDef: SceneDef = () => {
        const bg = this.kaboomCtx.add([
            this.kaboomCtx.rect(500, 200),
            this.kaboomCtx.outline(10),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.color(237, 242, 226),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y - 140)
        ]);

        bg.radius = 10;

        this.kaboomCtx.add([
            this.kaboomCtx.text(' RUSH HOUR\nGAME', { font: 'custom-font', size: 54 }),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y - 140)
        ]);

        this.playButton.addButton(
            'play-button',
            'center',
            this.kaboomCtx.vec2(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 40),
            'play-button-sprite',
            async() => {
                const levelsData = this.kaboomCtx.getData<number[]>('availableLevels');
                const currentLevel = levelsData[levelsData.length - 1];
                const difficulty = Math.floor(currentLevel === 40 ? 3 : currentLevel / 10);
                const level = await this.levelLoader.loadLevel(currentLevel, difficulty);
                this.kaboomCtx.go(GameScene.id, level);
            }
        );

        this.punctuationsButton.addButton(
            'punctuations-button',
            'center',
            this.kaboomCtx.vec2(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 130),
            'punctuations-button-sprite',
            () => {
                console.log(this.kaboomCtx.getData('completedLevels'));
            }
        );

        this.instructionsButton.addButton(
            'instructions-button',
            'center',
            this.kaboomCtx.vec2(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 220),
            'instructions-button-sprite',
            () => {
                this.kaboomCtx.go(InstructionsScene.id);
            }
        );
    };
}
