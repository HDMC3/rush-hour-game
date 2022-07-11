import { KaboomCtx, SceneDef } from 'kaboom';
import { Button } from '../ui/Button';
import { SceneHeader } from '../ui/SceneHeader';
import { MainMenuScene } from './MainMenuScene';

export class InstructionsScene {
    static readonly id = 'InstructionsScene';
    private initialMenuButton: Button;
    private headerHeight = 76;
    constructor(private kaboomCtx: KaboomCtx) {
        this.initialMenuButton = new Button(this.kaboomCtx);
    }

    readonly sceneDef: SceneDef = () => {
        SceneHeader.addHeader(this.kaboomCtx, 'INSTRUCCIONES');

        this.initialMenuButton.addButton(
            'initial-menu-button',
            'left',
            this.kaboomCtx.vec2(10, this.headerHeight / 2),
            'initial-menu-button-sprite',
            () => {
                this.kaboomCtx.go(MainMenuScene.id);
            }
        );

        const bg = this.kaboomCtx.add([
            this.kaboomCtx.rect(650, 400),
            this.kaboomCtx.color(237, 242, 226),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 35),
            this.kaboomCtx.outline(10)
        ]);

        bg.radius = 10;

        this.kaboomCtx.add([
            this.kaboomCtx.text(
                ' EL OBJETIVO DEL JUEGO\n ES LLEVAR EL CARRO DE\n COLOR ROJO HACIA LA\n SALIDA DEL TABLERO,\n MOVIENDO LOS DEMAS\n CARROS PARA LIBERAR\n EL CAMINO.',
                { font: 'custom-font', size: 36, lineSpacing: 10 }
            ),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.pos(this.kaboomCtx.center().x, this.kaboomCtx.center().y + 35)
        ]);
    };
}
