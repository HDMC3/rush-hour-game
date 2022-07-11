import { GameObj, KaboomCtx, OriginComp, PosComp, SpriteComp, TextComp, Vec2 } from 'kaboom';

export class MovesIndicator {

    private gameObject?: GameObj<SpriteComp | OriginComp | TextComp | PosComp>;
    private moves: number;

    constructor(private kaboomCtx: KaboomCtx) {
        this.moves = 0;
    }

    addMovesIndicator(position: Vec2) {
        position.x -= 192 / 2;
        position.y += 130 / 2;
        this.gameObject = this.kaboomCtx.add([
            this.kaboomCtx.sprite('time-and-moves-indicator-sprite'),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.text(' MOVS.\n0', { font: 'custom-font', size: 27, lineSpacing: 10 }),
            this.kaboomCtx.pos(position)
        ]);
    }

    increment() {
        if (!this.gameObject) return;
        this.gameObject.text = ` MOVS.\n${++this.moves}`;
    }

    destroy() {
        if (!this.gameObject) return;
        this.moves = 0;
        this.gameObject.destroy();
    }

    get movesCount() {
        return this.moves;
    }
}
