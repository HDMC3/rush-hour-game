import { AreaComp, ColorComp, GameObj, KaboomCtx, MoveComp, PosComp, SolidComp, SpriteComp, Vec2 } from 'kaboom';
import { BOARD_QUADRANTS_COORDINATES } from '../constants/board-constants';
import { CAR_OBJECT_NAMES, CAR_SPRITE_DATA } from '../constants/car-constants';
import { CarId } from '../types/CarId';
import { CarOrientation } from '../types/CarOrientation';

export class Car {
    private dragOffset: Vec2;
    private isDragging: boolean;
    private gameObject?: GameObj<SpriteComp | PosComp | MoveComp | ColorComp | AreaComp | SolidComp>;
    private gameObjectName: string;

    constructor(
        private kaboomCtx: KaboomCtx,
        private carId: CarId,
        private x: number,
        private y: number,
        private orientation: CarOrientation
    ) {
        this.isDragging = false;
        this.dragOffset = this.kaboomCtx.vec2();
        this.gameObjectName = CAR_OBJECT_NAMES[this.carId];
    }

    async addGameObject() {

        const carOrigin = {
            x: BOARD_QUADRANTS_COORDINATES[this.x][this.y].X,
            y: BOARD_QUADRANTS_COORDINATES[this.x][this.y].Y
        };

        const position = this.kaboomCtx.vec2(carOrigin.x, carOrigin.y);

        this.gameObject = this.kaboomCtx.add([
            this.kaboomCtx.sprite(
                this.orientation === 'horizontal'
                    ? CAR_SPRITE_DATA[this.carId].horizontal.name
                    : CAR_SPRITE_DATA[this.carId].vertical.name
            ),
            this.kaboomCtx.pos(position),
            this.kaboomCtx.area(),
            this.kaboomCtx.solid(),
            this.kaboomCtx.color(),
            this.gameObjectName
        ]);

        this.kaboomCtx.onClick(this.gameObjectName, () => {
            if (this.isDragging) return;

            this.isDragging = true;
            if (this.gameObject) {
                this.dragOffset = this.kaboomCtx.mousePos().sub(this.gameObject.pos);
            }
        });

        this.gameObject.onUpdate(() => {
            if (!this.isDragging || !this.gameObject) return;

            this.kaboomCtx.cursor('pointer');

            if (this.orientation === 'horizontal' && this.kaboomCtx.mousePos().sub(this.dragOffset).x > this.gameObject.pos.x) {
                this.gameObject.move(28 / this.kaboomCtx.dt(), 0);
            }

            if (this.orientation === 'horizontal' && this.kaboomCtx.mousePos().sub(this.dragOffset).x < this.gameObject.pos.x) {
                this.gameObject.move(-28 / this.kaboomCtx.dt(), 0);
            }

            if (this.orientation === 'vertical' && this.kaboomCtx.mousePos().sub(this.dragOffset).y > this.gameObject.pos.y) {
                this.gameObject.move(0, 28 / this.kaboomCtx.dt());
            }
            if (this.orientation === 'vertical' && this.kaboomCtx.mousePos().sub(this.dragOffset).y < this.gameObject.pos.y) {
                this.gameObject.move(0, -28 / this.kaboomCtx.dt());
            }
        });

        this.kaboomCtx.onMouseRelease(() => {
            this.isDragging = false;
            this.kaboomCtx.cursor('default');
        });

        this.kaboomCtx.onMouseMove(() => {
            if (!this.gameObject) return;

            this.kaboomCtx.cursor(this.isDragging ? 'pointer' : 'default');
            this.gameObject.color = this.isDragging
                ? this.kaboomCtx.rgb(230, 230, 230)
                : this.kaboomCtx.rgb(255, 255, 255);
        });

        this.gameObject.onHover(() => {
            if (!this.gameObject) return;
            this.kaboomCtx.cursor('pointer');
            this.gameObject.color = this.kaboomCtx.rgb(230, 230, 230);
        });

    }

    destroy() {
        if (this.gameObject) {
            this.gameObject.destroy();
        }
    }
}
