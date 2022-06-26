import kaboom from 'kaboom';

const gameContainer = document.querySelector<HTMLElement>('.game-container') || undefined;

export const gameKaboomCtx = kaboom({
    root: gameContainer,
    width: gameContainer?.clientWidth,
    height: gameContainer?.clientHeight,
    background: [250, 177, 160],
    global: false
});
