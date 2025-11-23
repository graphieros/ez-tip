# ez-tip

[![npm](https://img.shields.io/npm/v/ez-tip)](https://github.com/graphieros/ez-tip)
[![GitHub issues](https://img.shields.io/github/issues/graphieros/ez-tip)](https://github.com/graphieros/ez-tip/issues)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/graphieros/ez-tip?tab=MIT-1-ov-file#readme)
[![npm](https://img.shields.io/npm/dt/ez-tip)](https://github.com/graphieros/ez-tip)

A lightweight, zero-dependency JavaScript tooltip library that uses CSS custom properties for full styling flexibility. Tooltips can be triggered on hover or displayed permanently, with configurable delay, offset, and positioning.

[DEMO](https://ez-tip.graphieros.com)

## Features

- **Easy to integrate:** Just import the JS and call `render()`
- **CSS variables for styling:** Customize colors, padding, radii, and offsets without touching the JS
- **Configurable delay:** Set a show delay per-instance or globally
- **Hover lock mode:** Can be configured to keep the tooltip open when it is hovered
- **Smart positioning:** Automatically chooses the best placement (`top`, `bottom`, `left`, `right`) or honors your preference
- **Auto-update:** Repositions on scroll/resize/element resize
- **Auto-cleanup:** Removes tooltips when their target elements are removed from the DOM

## Installation

Install via npm/yarn:

```bash
npm install ez-tip
# or
yarn add ez-tip
```

> **Note:** This library ships only JS. You must provide minimal CSS in your project to style the tooltip using the CSS variables defined below.

## Quick Start

1. **Import and call `render()`**

   ```js
   import { render } from "ez-tip";

   // Optional: pass a global debounce delay (ms) for repositioning
   render({ delay: 100 });
   ```

2. **Add `data-ez-tip` to any element**

   ```html
   <button data-ez-tip="Hello, world!">Hover me</button>
   ```

3. **Provide CSS to style the tooltip**

   ```css
   /* e.g. in your global stylesheet */
   :root {
     --tooltip-arrow-size: 6px;
   }

   .ez-tip {
     background-color: var(--ez-tooltip-background-color);
     color: var(--ez-tooltip-color);
     padding: var(--ez-tooltip-padding);
     border-radius: var(--ez-tooltip-border-radius);
     opacity: 0;
     transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
   }

   .ez-tip.ez-tip-visible {
     opacity: 1;
   }

   .ez-tip::after {
     content: "";
     position: absolute;
     width: 0;
     height: 0;
     border-style: solid;
   }

   /* ─── TOP placement ───
    Tooltip sits above the element,
    arrow on the bottom edge pointing DOWN toward the element */
   .ez-tip[data-position="top"]::after {
     bottom: calc(-1 * var(--tooltip-arrow-size));
     left: 50%;
     transform: translateX(-50%);
     border-width: var(--tooltip-arrow-size) var(--tooltip-arrow-size) 0 var(--tooltip-arrow-size);
     border-color: var(--ez-tooltip-background-color) transparent transparent transparent;
   }

   /* ─── BOTTOM placement ───
    Tooltip sits below the element,
    arrow on the top edge pointing UP toward the element */
   .ez-tip[data-position="bottom"]::after {
     top: calc(-1 * var(--tooltip-arrow-size));
     left: 50%;
     transform: translateX(-50%);
     border-width: 0 var(--tooltip-arrow-size) var(--tooltip-arrow-size) var(--tooltip-arrow-size);
     border-color: transparent transparent var(--ez-tooltip-background-color) transparent;
   }

   /* ─── LEFT placement ───
    Tooltip sits to the left of the element,
    arrow on the right edge pointing RIGHT toward the element */
   .ez-tip[data-position="left"]::after {
     right: calc(-1 * var(--tooltip-arrow-size));
     top: 50%;
     transform: translateY(-50%);
     border-width: var(--tooltip-arrow-size) 0 var(--tooltip-arrow-size) var(--tooltip-arrow-size);
     border-color: transparent transparent transparent var(--ez-tooltip-background-color);
   }

   /* ─── RIGHT placement ───
    Tooltip sits to the right of the element,
    arrow on the left edge pointing LEFT toward the element */
   .ez-tip[data-position="right"]::after {
     left: calc(-1 * var(--tooltip-arrow-size));
     top: 50%;
     transform: translateY(-50%);
     border-width: var(--tooltip-arrow-size) var(--tooltip-arrow-size) var(
         --tooltip-arrow-size
       ) 0;
     border-color: transparent var(--ez-tooltip-background-color) transparent transparent;
   }
   ```

## API

### `render(options?: EzTipOptions)`

Initializes tooltips for all elements with `data-ez-tip`. The library listens to the ready state of the dom.

- `options.delay?` — **number**
  - Global debounce delay (in ms) for repositioning on scroll/resize.
  - Default: `0`

```ts
interface EzTipOptions {
  delay?: number;
}
```

## Configuration

Before or after calling `render()`, you can override default styles globally by setting CSS variables on the `<body>` (or any ancestor):

| Variable                        | Default    | Description                     |
| ------------------------------- | ---------- | ------------------------------- |
| `--ez-tooltip-background-color` | `#FFFFFF`  | Tooltip background color        |
| `--ez-tooltip-color`            | `#1A1A1A`  | Tooltip text color              |
| `--ez-tooltip-padding`          | `0 0.5rem` | Tooltip padding (CSS shorthand) |
| `--ez-tooltip-border-radius`    | `3px`      | Tooltip border radius           |

```js
// in JS before `render()` or anytime later
document.body.style.setProperty("--ez-tooltip-background-color", "#222");
document.body.style.setProperty("--ez-tooltip-offset", "12px");
```

```js
// or import the config object and change the values directly:

import { render, config } from "ez-tip";

config.backgroundColor = "#E1E5E8";
config.color = "#4A4A4A";
config.padding = "0 0.5rem";
config.borderRadius = "5px";
```

## Data Attributes

| Attribute                   | Type                          | Default | Description                                                                        |
| --------------------------- | ----------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `data-ez-tip`               | string                        | **—**   | **Required.** HTML content or text for the tooltip.                                |
| `data-ez-tip-hover`         | `true` or `false`             | `true`  | If `false`, tooltip is always visible; if `true` (or absent), shows on hover only. |
| `data-ez-tip-delay`         | number (ms)                   | `0`     | Milliseconds to wait after hover before showing the tooltip.                       |
| `data-ez-tip-position`      | `top`,`bottom`,`left`,`right` |         | Preferred placement; library will auto-fallback to best-fit if it doesn’t fit.     |
| `data-ez-tip-background`    | string                        |         | Force background color for a single tooltip                                        |
| `data-ez-tip-color`         | string                        |         | Force text color for a single tooltip                                              |
| `data-ez-tip-padding`       | string                        |         | Force padding for a single tooltip                                                 |
| `data-ez-tip-border-radius` | string                        |         | Force border-radius for a single tooltip                                           |
| `data-ez-tip-hover-lock`    | `true` or `false`             | `false` | If `true`, keeps the tooltip open when it is hovered                               |

```html
<button
  data-ez-tip="Detailed info"
  data-ez-tip-hover="true"
  data-ez-tip-delay="300"
  data-ez-tip-offset="10"
  data-ez-tip-position="bottom"
>
  Show at bottom on hover with a 300ms delay
</button>
```

## Examples

### Basic tooltip

```html
<button data-ez-tip="Simple tooltip">Hover me</button>
```

### Tooltip with delay and custom offset

```html
<button data-ez-tip="Delayed" data-ez-tip-delay="500" data-ez-tip-offset="16">
  Delayed tooltip
</button>
```

### Always-visible tooltip

```html
<p data-ez-tip="Persistent" data-ez-tip-hover="false">Persistent tooltip</p>
```

### Hoverable tooltip

If the content of your tooltip should be selectable, it is possible to lock it on hover:

```html
<p data-ez-tip="I'm locked on hover" data-ez-tip-hover-lock>
  Hoverable tooltip
</p>
```

## Cleanup

Tooltips auto-remove themselves if their target element is removed from the DOM—no memory leaks or orphan nodes.

## License

MIT © Alec Lloyd Probert
