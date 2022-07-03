import { KaboomCtx, Origin, Vec2 } from 'kaboom';

export class Button {

    static async addButton(kaboomCtx: KaboomCtx, gameObjectTag: string, origin: Vec2 | Origin, pos: Vec2, spriteId: string, onClickHandle: () => void) {
        const button = kaboomCtx.add([
            kaboomCtx.sprite(spriteId),
            kaboomCtx.origin(origin),
            kaboomCtx.pos(pos),
            kaboomCtx.area(),
            gameObjectTag,
            {
                clicked: false
            }
        ]);

        button.onClick(() => {
            if (!button.clicked) onClickHandle();
            button.clicked = true;
        });

        kaboomCtx.onMouseRelease(() => {
            button.clicked = false;
        });

        button.onUpdate(() => {
            button.play(button.clicked && button.isHovering() ? 'click' : 'default');
            kaboomCtx.cursor(button.isHovering() ? 'pointer' : 'default');
        });

        return button;
    }

}
