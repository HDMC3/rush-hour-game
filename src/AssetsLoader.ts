import { KaboomCtx, SpriteLoadOpt } from 'kaboom';
import { CAR_SPRITE_DATA } from './constants/car-constants';
import { PuzzleLevelDifficulty } from './constants/puzzle-level-contants';
import { BANNERS_SPRITE_DATA } from './constants/select-level-scene-constants';

export class AssetsLoader {
    constructor(private kaboomCtx: KaboomCtx) { }

    async loadSprites() {
        try {
            // Car sprites
            for (const entrie of Object.entries(CAR_SPRITE_DATA)) {
                await this.kaboomCtx.loadSprite(entrie[1].horizontal.name, `car-sprites/${entrie[1].horizontal.sprite}`);
                await this.kaboomCtx.loadSprite(entrie[1].vertical.name, `car-sprites/${entrie[1].vertical.sprite}/`);
            }

            // Board sprites
            await this.kaboomCtx.loadSprite('board-wall-left', 'board-sprites/board-wall-left.png');
            await this.kaboomCtx.loadSprite('board-wall-right-top', 'board-sprites/board-wall-right-top.png');
            await this.kaboomCtx.loadSprite('board-exit', 'board-sprites/board-exit.png');
            await this.kaboomCtx.loadSprite('board-wall-right-bottom', 'board-sprites/board-wall-right-bottom.png');
            await this.kaboomCtx.loadSprite('board-wall-top', 'board-sprites/board-wall-top.png');
            await this.kaboomCtx.loadSprite('board-wall-bottom', 'board-sprites/board-wall-bottom.png');
            await this.kaboomCtx.loadSprite('board-quadrant-top-row', 'board-sprites/board-quadrant-top-row.png');
            await this.kaboomCtx.loadSprite('board-quadrant', 'board-sprites/board-quadrant.png');

            // Custom font sprite
            await this.kaboomCtx.loadFont('custom-font', 'ui-sprites/custom-font.png', 14, 18, {
                chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ,.;:'
            });

            // Button sprites
            const buttonSpritesOptions: SpriteLoadOpt = {
                sliceX: 4,
                anims: {
                    default: 0,
                    click: {
                        from: 0,
                        to: 2
                    },
                    disabled: 3
                }
            };
            await this.kaboomCtx.loadSprite('back-button-sprite', 'ui-sprites/buttons/back-button-sprite.png', buttonSpritesOptions);
            await this.kaboomCtx.loadSprite('pause-button-sprite', 'ui-sprites/buttons/pause-button-sprite.png', buttonSpritesOptions);
            await this.kaboomCtx.loadSprite('select-button-sprite', 'ui-sprites/buttons/select-button-sprite.png', buttonSpritesOptions);
            await this.kaboomCtx.loadSprite('select-level-button-sprite', 'ui-sprites/buttons/select-level-button-sprite.png', buttonSpritesOptions);
            await this.kaboomCtx.loadSprite('start-button-sprite', 'ui-sprites/buttons/start-button-sprite.png', buttonSpritesOptions);

            // Select level scene sprites
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
                BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.BEGINNER].name,
                'ui-sprites/select-level-scene/' + BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.BEGINNER].spriteSource
            );
            await this.kaboomCtx.loadSprite(
                BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.INTERMEDIATE].name,
                'ui-sprites/select-level-scene/' + BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.INTERMEDIATE].spriteSource
            );
            await this.kaboomCtx.loadSprite(
                BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.ADVANCED].name,
                'ui-sprites/select-level-scene/' + BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.ADVANCED].spriteSource
            );
            await this.kaboomCtx.loadSprite(
                BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.EXPERT].name,
                'ui-sprites/select-level-scene/' + BANNERS_SPRITE_DATA[PuzzleLevelDifficulty.EXPERT].spriteSource
            );

            await this.kaboomCtx.loadSprite('level-cards-sprite', 'ui-sprites/select-level-scene/level-cards-sprite.png',
                {
                    sliceX: 10,
                    sliceY: 4
                }
            );

            // Time indicator sprite
            await this.kaboomCtx.loadSprite('time-and-moves-indicator-sprite', 'ui-sprites/time-and-moves-indicator-sprite.png');

            // Car names card sprite
            await this.kaboomCtx.loadSprite('car-names-card-sprite', 'ui-sprites/car-names-card-sprite.png');

        } catch (error) {
            alert('Problema al cargar recursos');
            throw error;
        }
    }
}
