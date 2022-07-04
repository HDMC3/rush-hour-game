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
            if (!this.gameObject.clicked && !this.gameObject.disabled) onClickHandle();
            this.gameObject.clicked = true;
        });

        this.kaboomCtx.onMouseRelease(() => {
            if (!this.gameObject) return;
            this.gameObject.clicked = false;
        });

        this.gameObject.onUpdate(() => {
            if (!this.gameObject) return;
            if (this.gameObject.disabled) {
                this.gameObject.play('disabled');
                return;
            }
            this.gameObject.play(this.gameObject.clicked && this.gameObject.isHovering() ? 'click' : 'default');
        });
    }

    destroy() {
        this.gameObject?.destroy();
    }

    disable() {
        if (this.gameObject) this.gameObject.disabled = true;
    }

    enable() {
        if (this.gameObject) this.gameObject.disabled = false;
    }

}
