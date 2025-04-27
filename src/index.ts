type EzTipOptions = {
    delay?: number
}

type Rect = {
    width: number;
    height: number;
    top: number;
    left: number;
};

interface BoundsObserver {
    disconnect: () => void;
}

type Position = 'top' | 'bottom' | 'left' | 'right';

export const config = {
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    padding: '0 0.5rem',
    borderRadius: '3px'
};

export function render({ delay = 0} : EzTipOptions = {}) {
    window.addEventListener('DOMContentLoaded', () => onRender({ delay }))
}

function onRender({
    delay = 0
}: EzTipOptions = {}) {
    const targets: NodeListOf<HTMLElement> = document.querySelectorAll('[data-ez-tip]');

    if (targets.length) {
        document.body.style.setProperty('--ez-tooltip-background-color', config.backgroundColor);
        document.body.style.setProperty('--ez-tooltip-color', config.color);
        document.body.style.setProperty('--ez-tooltip-padding', config.padding);
        document.body.style.setProperty('--ez-tooltip-border-radius', config.borderRadius);
    }

    targets.forEach((target) => {
        const content = target.dataset.ezTip;
        if (!content) return;

        const isHover = target.dataset.ezTipHover !== 'false';

        const individualDelay = parseInt(target.dataset.ezTipDelay ?? '0', 10) || 0;
        let showTimeout: ReturnType<typeof setTimeout> | null = null;

        const tooltip = document.createElement('div');
        tooltip.classList.add('ez-tip');
        tooltip.style.position = 'fixed';
        tooltip.style.pointerEvents = 'none';

        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);

        positionTooltip(target, tooltip);

        if (isHover) {
            tooltip.classList.remove('ez-tip-visible');

            target.addEventListener('mouseenter', () => {
                positionTooltip(target, tooltip);

                showTimeout = setTimeout(() => {
                    tooltip.classList.add('ez-tip-visible');
                }, individualDelay);

            });
            target.addEventListener('mouseleave', () => {
                if (showTimeout !== null) {
                    clearTimeout(showTimeout);
                    showTimeout = null;
                }
                tooltip.classList.remove('ez-tip-visible');
            });
        } else {
            tooltip.classList.add('ez-tip-visible');
        }

        const targetObserver = observeTarget(
            target,
            () => {
                if (!target.isConnected) {
                    tooltip.remove()
                    targetObserver.disconnect()
                    return
                }

                if (tooltip.classList.contains('ez-tip-visible')) {
                    positionTooltip(target, tooltip);
                }
            },
            delay
        );
    });
}

function observeTarget(
    element: HTMLElement,
    onUpdate: (rect: Rect) => void,
    debounceMs: number
): BoundsObserver {
    const emit = () => {
        const { width, height, top, left } = element.getBoundingClientRect();
        onUpdate({ width, height, top, left });
    };

    const debouncedEmit = debounce(emit, debounceMs);

    emit();

    const ro = new ResizeObserver(() => {
        emit();
    });
    ro.observe(element);

    window.addEventListener('scroll', debouncedEmit, true);
    window.addEventListener('resize', debouncedEmit);

    return {
        disconnect() {
            ro.disconnect();
            window.removeEventListener('scroll', debouncedEmit, true);
            window.removeEventListener('resize', debouncedEmit);
        },
    };
}

function positionTooltip(
    target: HTMLElement,
    tooltip: HTMLElement
): void {
    const pref = target.dataset.ezTipPosition as Position | undefined;
    const candidates: Position[] = pref
        ? [pref, 'top', 'bottom', 'right', 'left']
        : ['top', 'bottom', 'right', 'left'];

    const gap = Number(target.dataset.ezTipOffset || 8);

    const { width: tw, height: th } = tooltip.getBoundingClientRect();
    const { top: et, left: el, width: ew, height: eh } =
        target.getBoundingClientRect();

    for (const pos of candidates) {
        let anchorX: number, anchorY: number;
        let tx = 0, ty = 0;

        switch (pos) {
            case 'top':
                anchorX = el + ew / 2;
                anchorY = et - gap;
                tx = -50; ty = -100;
                break;
            case 'bottom':
                anchorX = el + ew / 2;
                anchorY = et + eh + gap;
                tx = -50; ty = 0;
                break;
            case 'left':
                anchorX = el - gap;
                anchorY = et + eh / 2;
                tx = -100; ty = -50;
                break;
            case 'right':
                anchorX = el + ew + gap;
                anchorY = et + eh / 2;
                tx = 0; ty = -50;
                break;
        }

        tooltip.setAttribute('data-position', pos ?? 'top')

        const finalLeft = anchorX + (tx / 100) * tw;
        const finalTop = anchorY + (ty / 100) * th;
        const fitsH = finalLeft >= 0 && finalLeft + tw <= window.innerWidth;
        const fitsV = finalTop >= 0 && finalTop + th <= window.innerHeight;

        if (fitsH && fitsV) {
            tooltip.style.left = `${anchorX}px`;
            tooltip.style.top = `${anchorY}px`;
            tooltip.style.transform = `translate(${tx}%, ${ty}%)`;
            return;
        }
    }

    const fb = pref ?? 'top';
    let anchorX: number, anchorY: number;
    let tx = 0, ty = 0;

    tooltip.setAttribute('data-ez-tip-position', pref ?? 'top')

    switch (fb) {
        case 'top':
            anchorX = el;
            anchorY = et - gap;
            tx = -50; ty = -100;
            break;
        case 'bottom':
            anchorX = el + ew / 2;
            anchorY = et + eh + gap;
            tx = -50; ty = 0;
            break;
        case 'left':
            anchorX = el - gap;
            anchorY = et + eh / 2;
            tx = -100; ty = -50;
            break;
        case 'right':
            anchorX = el + ew + gap;
            anchorY = et + eh / 2;
            tx = 0; ty = -50;
            break;
    }

    tooltip.style.left = `${anchorX}px`;
    tooltip.style.top = `${anchorY}px`;
    tooltip.style.transform = `translate(${tx}%, ${ty}%)`;
}

function debounce<F extends (...args: any[]) => void>(fn: F, wait = 100): F {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
            timeoutId = null;
        }, wait);
    } as F;
}