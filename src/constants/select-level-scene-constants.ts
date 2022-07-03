import { SpriteLoadData } from '../types/SpriteLoadData';
import { PuzzleLevelDifficulty } from './puzzle-level-contants';

export const BANNERS_SPRITE_DATA: Record<PuzzleLevelDifficulty, SpriteLoadData> = {
    0: { name: 'levels-beginner-banner-sprite', spriteSource: 'levels-beginner-banner-sprite.png' },
    1: { name: 'levels-intermediate-banner-sprite', spriteSource: 'levels-intermediate-banner-sprite.png' },
    2: { name: 'levels-advanced-banner-sprite', spriteSource: 'levels-advanced-banner-sprite.png' },
    3: { name: 'levels-expert-banner-sprite', spriteSource: 'levels-expert-banner-sprite.png' }
};
