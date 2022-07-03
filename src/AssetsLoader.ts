import { KaboomCtx } from 'kaboom';
import { CAR_SPRITE_DATA } from './constants/car-constants';

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
        } catch (error) {
            alert('Problema al cargar recursos');
            throw error;
        }
    }
}
