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

export function render({ delay = 0 }: EzTipOptions = {}) {
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

        let escHandler: (e: KeyboardEvent) => void;

        const isHover = target.dataset.ezTipHover !== 'false';

        const individualDelay = parseInt(target.dataset.ezTipDelay ?? '0', 10) || 0;
        let showTimeout: ReturnType<typeof setTimeout> | null = null;

        const tooltip = document.createElement('div');
        tooltip.classList.add('ez-tip');

        if (target.dataset.ezTipClasses) {
            const _classes = target.dataset.ezTipClasses.trim().split(' ');
            _classes.forEach(_class => {
                tooltip.classList.add(_class);
            });
        }

        tooltip.style.position = 'fixed';
        tooltip.style.pointerEvents = 'none';

        if (target.dataset.ezTipBackground) {
            tooltip.style.backgroundColor = target.dataset.ezTipBackground;
        }

        if (target.dataset.ezTipColor) {
            tooltip.style.color = target.dataset.ezTipColor;
        }

        if (target.dataset.ezTipPadding) {
            tooltip.style.padding = target.dataset.ezTipPadding;
        }

        if (target.dataset.ezTipBorderRadius) {
            tooltip.style.borderRadius = target.dataset.ezTipBorderRadius;
        }

        const uid = createUid();
        tooltip.setAttribute('id', uid);
        tooltip.setAttribute('role', 'tooltip');
        tooltip.setAttribute('aria-live', 'polite');
        target.setAttribute('aria-describedby', uid);

        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);

        positionTooltip(target, tooltip);

        function showTooltip() {
            positionTooltip(target, tooltip);

            showTimeout = setTimeout(() => {
                tooltip.classList.add('ez-tip-visible');
                tooltip.setAttribute('aria-hidden', 'false');

                escHandler = (e: KeyboardEvent) => {
                    if (e.key === 'Escape') {
                        hideTooltip();
                    }
                };
                document.addEventListener('keydown', escHandler);
            }, individualDelay);
        }

        function hideTooltip() {
            if (showTimeout !== null) {
                clearTimeout(showTimeout);
                showTimeout = null;
            }
            tooltip.classList.remove('ez-tip-visible');
            tooltip.setAttribute('aria-hidden', 'true');

            if (escHandler) {
                document.removeEventListener('keydown', escHandler);
            }
        }


        if (isHover) {
            tooltip.classList.remove('ez-tip-visible');
            target.addEventListener('mouseenter', showTooltip);
            target.addEventListener('focus', showTooltip);
            target.addEventListener('mouseleave', hideTooltip);
            target.addEventListener('blur', hideTooltip);

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
    const {
        top: et,
        left: el,
        width: ew,
        height: eh
    } = target.getBoundingClientRect();

    const fullWidth = ew >= window.innerWidth;
    const fullHeight = eh >= window.innerHeight;
    const isHover = target.dataset.ezTipHover !== 'false';

    const isVisible =
        et + eh > 0 &&
        et < window.innerHeight &&
        el + ew > 0 &&
        el < window.innerWidth;

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

        tooltip.setAttribute('data-position', pos);

        const finalLeft = anchorX + (tx / 100) * tw;
        const finalTop = anchorY + (ty / 100) * th;
        const fitsH = finalLeft >= 0 && finalLeft + tw <= window.innerWidth;
        const fitsV = finalTop >= 0 && finalTop + th <= window.innerHeight;

        const allowOverflowFix =
            pos === pref &&
            ((['top', 'bottom'].includes(pos) && fullWidth) ||
                (['left', 'right'].includes(pos) && fullHeight));

        if ((fitsH && fitsV) || allowOverflowFix) {
            if (isHover || isVisible) {
                // clamp within viewport
                const clampedLeft = Math.min(Math.max(finalLeft, 0), window.innerWidth - tw);
                const clampedTop = Math.min(Math.max(finalTop, 0), window.innerHeight - th);
                tooltip.style.left = `${clampedLeft}px`;
                tooltip.style.top = `${clampedTop}px`;
                tooltip.style.transform = `translate(0,0)`;
            } else {
                // always-visible & off-screen: no clamping
                tooltip.style.left = `${anchorX}px`;
                tooltip.style.top = `${anchorY}px`;
                tooltip.style.transform = `translate(${tx}%, ${ty}%)`;
            }
            return;
        }
    }

    // fallback: preferred position
    const fb = pref ?? 'top';
    let anchorX: number, anchorY: number;
    let tx = 0, ty = 0;

    // still use the same data-position attribute
    tooltip.setAttribute('data-position', fb);

    switch (fb) {
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

    if (!isHover && !isVisible) {
        // always-visible & off-screen: no clamping
        tooltip.style.left = `${anchorX}px`;
        tooltip.style.top = `${anchorY}px`;
        tooltip.style.transform = `translate(${tx}%, ${ty}%)`;
        return;
    }

    // clamp fallback
    const rawLeft = anchorX + (tx / 100) * tw;
    const rawTop = anchorY + (ty / 100) * th;
    tooltip.style.left = `${Math.min(Math.max(rawLeft, 0), window.innerWidth - tw)}px`;
    tooltip.style.top = `${Math.min(Math.max(rawTop, 0), window.innerHeight - th)}px`;
    tooltip.style.transform = `translate(0,0)`;
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

function createUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}