import { KaboomCtx, Vec2 } from 'kaboom';

export class Button {

    static async addButton(kaboomCtx: KaboomCtx, gameObjectTag: string, pos: Vec2, spriteId: string, spriteSrc: string, onClickHandle: () => void) {
        await kaboomCtx.loadSprite(spriteId, `ui-sprites/buttons/${spriteSrc}`, {
            sliceX: 2,
            anims: {
                default: 0,
                click: 1
            }
        });

        await kaboomCtx.loadFont('custom-font', 'ui-sprites/custom-font.png', 14, 18, {
            chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ,.:;'
        });

        const button = kaboomCtx.add([
            kaboomCtx.sprite(spriteId),
            kaboomCtx.origin('top'),
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


    }

}
