import { GameObj, KaboomCtx, OriginComp, PosComp, SpriteComp, TextComp, Vec2 } from 'kaboom';

export class TimeIndicator {

    private active: boolean;
    private minutes: number;
    private seconds: number;
    private gameObject?: GameObj<SpriteComp | OriginComp | TextComp | PosComp>;
    // eslint-disable-next-line no-undef
    private interval?: number | NodeJS.Timeout;

    constructor(private kaboomCtx: KaboomCtx) {
        this.active = false;
        this.minutes = 0;
        this.seconds = 0;
    }

    addTimeIndicator(position: Vec2) {

        position.x += 192 / 2;
        position.y += 130 / 2;
        this.gameObject = this.kaboomCtx.add([
            this.kaboomCtx.sprite('time-and-moves-indicator-sprite'),
            this.kaboomCtx.origin('center'),
            this.kaboomCtx.text(' TIEMPO\n00:00', { font: 'custom-font', size: 27, lineSpacing: 10 }),
            this.kaboomCtx.pos(position)
        ]);
    }

    start() {
        this.interval = setInterval(() => {
            if (++this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
            if (this.gameObject) {
                const secondsText = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
                const minutesText = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
                this.gameObject.text = ` TIEMPO\n${minutesText}:${secondsText}`;
            }
        }, 1000);
        this.active = true;
    }

    pause() {
        this.clearInterval();
        this.active = false;
    }

    stop() {
        this.clearInterval();
        this.active = false;
        this.seconds = 0;
        this.minutes = 0;
        if (this.gameObject) this.gameObject.text = ' TIEMPO\n00:00';
    }

    destroy() {
        if (this.gameObject) {
            this.stop();
            this.gameObject.destroy();
        }
    }

    get time() {
        const secondsText = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        const minutesText = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        return `${minutesText}:${secondsText}`;
    }

    get isActive() {
        return this.active;
    }

    private clearInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }
}
