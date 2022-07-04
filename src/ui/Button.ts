import { AreaComp, GameObj, KaboomCtx, Origin, OriginComp, PosComp, SpriteComp, Vec2 } from 'kaboom';

export class Button {

    private gameObject?: GameObj<SpriteComp | OriginComp | PosComp | AreaComp | { clicked: boolean, disabled: boolean }>;

    constructor(private kaboomCtx: KaboomCtx) { }

    addButton(gameObjectTag: string, origin: Vec2 | Origin, pos: Vec2, spriteId: string, onClickHandle: () => void) {
        this.gameObject = this.kaboomCtx.add([
            this.kaboomCtx.sprite(spriteId),
            this.kaboomCtx.origin(origin),
            this.kaboomCtx.pos(pos),
            this.kaboomCtx.area(),
            gameObjectTag,
            {
                clicked: false,
                disabled: false
            }
        ]);

        this.gameObject.onClick(() => {
            if (!this.gameObject) return;
            if (!this.gameObject.disabled) this.gameObject.play('click');
        });

        this.gameObject.onAnimEnd('click', () => {
            onClickHandle();
        });
    }

    destroy() {
        this.gameObject?.destroy();
    }

    disable() {
        if (this.gameObject) {
            this.gameObject.disabled = true;
            this.gameObject.play('disabled');
        }
    }

    enable() {
        if (this.gameObject) {
            this.gameObject.disabled = false;
            this.gameObject.play('default');
        }
    }

}
