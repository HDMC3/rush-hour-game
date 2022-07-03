import { KaboomCtx } from 'kaboom';
import { CAR_SPRITE_DATA } from './constants/car-constants';

export class AssetsLoader {
    constructor(private kaboomCtx: KaboomCtx) { }

    async loadSprites() {
        try {
            for (const entrie of Object.entries(CAR_SPRITE_DATA)) {
                await this.kaboomCtx.loadSprite(entrie[1].horizontal.name, `car-sprites/${entrie[1].horizontal.sprite}`);
                await this.kaboomCtx.loadSprite(entrie[1].vertical.name, `car-sprites/${entrie[1].vertical.sprite}/`);
            }
        } catch (error) {
            alert('Problema al cargar recursos');
            throw error;
        }
    }
}
