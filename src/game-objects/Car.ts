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

    private async loadAssets() {
        const spriteSrc = this.orientation === 'horizontal'
            ? CAR_SPRITE_DATA[this.carId].horizontalSprite
            : CAR_SPRITE_DATA[this.carId].verticalSprite;
        try {
            await this.kaboomCtx.loadSprite(CAR_SPRITE_DATA[this.carId].name, 'car-sprites/' + spriteSrc);
        } catch (error) {
            alert('Problema al cargar recursos');
            throw error;
        }
    }

    async addGameObject() {
        await this.loadAssets();

        const carOrigin = {
            x: BOARD_QUADRANTS_COORDINATES[this.x][this.y].X,
            y: BOARD_QUADRANTS_COORDINATES[this.x][this.y].Y
        };

        const position = this.kaboomCtx.vec2(carOrigin.x, carOrigin.y);

        this.gameObject = this.kaboomCtx.add([
            this.kaboomCtx.sprite(CAR_SPRITE_DATA[this.carId].name),
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

            const xVelocityDirection = this.kaboomCtx.mousePos().sub(this.dragOffset).sub(this.gameObject.pos).x;
            const yVelocityDirection = this.kaboomCtx.mousePos().sub(this.dragOffset).sub(this.gameObject.pos).y;

            if (this.orientation === 'horizontal') {
                this.gameObject.move(xVelocityDirection * 28 / this.kaboomCtx.dt(), 0);
            }

            if (this.orientation === 'vertical') {
                this.gameObject.move(0, yVelocityDirection * 28 / this.kaboomCtx.dt());
            }
        });

        this.kaboomCtx.onMouseRelease(() => {
            this.isDragging = false;
            this.kaboomCtx.cursor('default');
        });

        this.kaboomCtx.onMouseMove(() => {
            if (!this.gameObject) return;

            this.kaboomCtx.cursor(this.gameObject.isHovering() || this.isDragging ? 'pointer' : 'default');
            this.gameObject.color = this.gameObject.isHovering() || this.isDragging
                ? this.kaboomCtx.rgb(230, 230, 230)
                : this.kaboomCtx.rgb(255, 255, 255);
        });

    }
}
