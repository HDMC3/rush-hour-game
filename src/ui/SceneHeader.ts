import { KaboomCtx } from 'kaboom';

export class SceneHeader {
    static addHeader(kaboomCtx: KaboomCtx, text: string, height?: number) {
        kaboomCtx.add([
            kaboomCtx.rect(kaboomCtx.width(), height ?? 76),
            kaboomCtx.color(237, 242, 226)
        ]);

        kaboomCtx.add([
            kaboomCtx.rect(kaboomCtx.width(), 2),
            kaboomCtx.color(0, 0, 0),
            kaboomCtx.pos(0, height ?? 76 - 2)
        ]);

        kaboomCtx.add([
            kaboomCtx.text(text, { font: 'custom-font', size: 36 }),
            kaboomCtx.origin('top'),
            kaboomCtx.pos(kaboomCtx.center().x, 20)
        ]);
    }
}
