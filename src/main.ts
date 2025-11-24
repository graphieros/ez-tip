import './style.css'
import { render, config } from "../src/index"

// Set custom config:
config.backgroundColor = '#E1E5E8'
config.color = '#4A4A4A'
config.padding = '0 0.5rem'
config.borderRadius = '5px'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>ez-tip</h1>
    <h2>Testing arena</h2>

    <div class="example-wrapper">
      <div class="example" data-ez-tip="Top" data-ez-tip-position="top">
        TOP
      </div>
      <div class="example" data-ez-tip="Right" data-ez-tip-position="right">
        RIGHT
      </div>
      <div class="example" data-ez-tip="Bottom" data-ez-tip-position="bottom">
        BOTTOM
      </div>
      <div class="example" data-ez-tip="Left" data-ez-tip-position="left">
        LEFT
      </div>
      <div class="example" data-ez-tip="Permanent" data-ez-tip-hover="false">
        PERMANENT
      </div>
      <div class="example" data-ez-tip="Locked" data-ez-tip-hover-lock="true">
        HOVER LOCK
      </div>
    </div>

    <div class="example-wrapper">
      <div class="example" data-ez-tip="Delay" data-ez-tip-delay="500">
        DELAY 500ms
      </div>
      <div class="example" data-ez-tip="<b>I'm bold</b> <i>I'm italic</i> <svg width='3rem' viewBox='0 0 40 20'><text x='0' y='18' fill='red'>SVG</text></svg>">
        WITH HTML
      </div>
      <div class="example" data-ez-tip="Padded" data-ez-tip-padding="2rem">
        WITH FORCED PADDING
      </div>
      <div class="example" data-ez-tip="Offset" data-ez-tip-offset="24">
        WITH OFFSET
      </div>
      <div class="example" data-ez-tip="Rounded" data-ez-tip-border-radius="1rem">
        WITH BORDER RADIUS
      </div>
      <div class="example" data-ez-tip="Colors" data-ez-tip-color="#FFDD00" data-ez-tip-background="#9f1571ff">
        WITH BACKGROUND & COLOR
      </div>
    </div>

    <p data-ez-tip="Scroll to test position shift">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget dolor non purus tempor faucibus. Donec rutrum ullamcorper augue, et vulputate arcu sodales vitae. Quisque varius nunc eu mi rhoncus tempor. Phasellus vitae nisi id libero molestie tristique a vel nisl. Donec sit amet feugiat urna, eget luctus nunc. Integer porta aliquam arcu, et ornare elit efficitur a. Proin auctor tempus turpis, a ultrices elit consectetur eget. Donec ac leo quis lorem commodo semper in ac nunc. Donec efficitur tincidunt ante, at porta est imperdiet ac. Quisque vestibulum, dolor quis dapibus posuere, nisi felis auctor mauris, at suscipit nisl metus ut turpis. Sed rhoncus pulvinar ante ac pellentesque. Praesent in magna eget purus ullamcorper tincidunt. Phasellus non nisi sit amet risus malesuada rutrum non vel tortor. Sed neque ante, dapibus mattis semper suscipit, feugiat at enim.

      Fusce dictum tincidunt hendrerit. Duis sed erat eu felis malesuada porta egestas nec velit. Suspendisse pellentesque nisl eu ipsum vehicula, sit amet suscipit nisi viverra. Praesent sodales scelerisque lorem, eu gravida est malesuada in. Quisque efficitur leo a massa iaculis tristique. Fusce rutrum dui et eros suscipit, sed venenatis elit fringilla. Nulla ut nisl congue, scelerisque nulla a, ultrices est. Proin tincidunt id orci id semper. Curabitur elementum varius nisi, ut venenatis purus cursus at. Suspendisse eget mi et diam condimentum tincidunt in ac metus. Praesent laoreet, ex id auctor ornare, ex erat interdum lorem, sit amet mattis dui ipsum vitae ante. Vestibulum pharetra iaculis odio, id sodales libero ultrices et. Etiam commodo magna massa, quis finibus purus dictum at.

      Pellentesque nibh magna, ullamcorper eget nisi a, aliquet consectetur nibh. In sed turpis rutrum, mollis turpis vel, imperdiet neque. Nulla vehicula fermentum lacus, et aliquam tellus iaculis at. Maecenas placerat justo tortor, sit amet finibus nulla dignissim eget. Cras eget fermentum nisi. Maecenas quis ligula sem. Mauris ipsum neque, porta eu elit a, bibendum rhoncus sem. Nullam tincidunt auctor orci, non congue turpis. Nunc sapien enim, cursus sed posuere eget, rutrum a orci. Nullam sed sem efficitur, hendrerit neque convallis, vestibulum dui. Nulla consequat porttitor nisl, quis dignissim nibh pulvinar vel. Nullam vel erat neque.

      Maecenas molestie convallis lorem id dapibus. Aenean ac risus consequat, pharetra nunc quis, interdum mauris. Nam vel ipsum mauris. Proin aliquet vestibulum magna quis aliquet. Ut porttitor commodo dui. Donec a neque ac neque ornare blandit sed vitae elit. Suspendisse a consequat justo. Curabitur dapibus odio diam, ac hendrerit purus luctus in.

      Nunc in facilisis eros. Curabitur nec tempor ante. Nulla viverra sit amet turpis tincidunt aliquam. Vivamus tincidunt erat vitae nibh facilisis, eget cursus tellus consequat. Aenean mattis tempus blandit. Mauris quis massa et risus posuere mollis sit amet non turpis. Duis laoreet, nulla vel commodo aliquet, ante ligula condimentum arcu, sed volutpat velit eros sit amet quam.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget dolor non purus tempor faucibus. Donec rutrum ullamcorper augue, et vulputate arcu sodales vitae. Quisque varius nunc eu mi rhoncus tempor. Phasellus vitae nisi id libero molestie tristique a vel nisl. Donec sit amet feugiat urna, eget luctus nunc. Integer porta aliquam arcu, et ornare elit efficitur a. Proin auctor tempus turpis, a ultrices elit consectetur eget. Donec ac leo quis lorem commodo semper in ac nunc. Donec efficitur tincidunt ante, at porta est imperdiet ac. Quisque vestibulum, dolor quis dapibus posuere, nisi felis auctor mauris, at suscipit nisl metus ut turpis. Sed rhoncus pulvinar ante ac pellentesque. Praesent in magna eget purus ullamcorper tincidunt. Phasellus non nisi sit amet risus malesuada rutrum non vel tortor. Sed neque ante, dapibus mattis semper suscipit, feugiat at enim.

      Fusce dictum tincidunt hendrerit. Duis sed erat eu felis malesuada porta egestas nec velit. Suspendisse pellentesque nisl eu ipsum vehicula, sit amet suscipit nisi viverra. Praesent sodales scelerisque lorem, eu gravida est malesuada in. Quisque efficitur leo a massa iaculis tristique. Fusce rutrum dui et eros suscipit, sed venenatis elit fringilla. Nulla ut nisl congue, scelerisque nulla a, ultrices est. Proin tincidunt id orci id semper. Curabitur elementum varius nisi, ut venenatis purus cursus at. Suspendisse eget mi et diam condimentum tincidunt in ac metus. Praesent laoreet, ex id auctor ornare, ex erat interdum lorem, sit amet mattis dui ipsum vitae ante. Vestibulum pharetra iaculis odio, id sodales libero ultrices et. Etiam commodo magna massa, quis finibus purus dictum at.

      Pellentesque nibh magna, ullamcorper eget nisi a, aliquet consectetur nibh. In sed turpis rutrum, mollis turpis vel, imperdiet neque. Nulla vehicula fermentum lacus, et aliquam tellus iaculis at. Maecenas placerat justo tortor, sit amet finibus nulla dignissim eget. Cras eget fermentum nisi. Maecenas quis ligula sem. Mauris ipsum neque, porta eu elit a, bibendum rhoncus sem. Nullam tincidunt auctor orci, non congue turpis. Nunc sapien enim, cursus sed posuere eget, rutrum a orci. Nullam sed sem efficitur, hendrerit neque convallis, vestibulum dui. Nulla consequat porttitor nisl, quis dignissim nibh pulvinar vel. Nullam vel erat neque.

      Maecenas molestie convallis lorem id dapibus. Aenean ac risus consequat, pharetra nunc quis, interdum mauris. Nam vel ipsum mauris. Proin aliquet vestibulum magna quis aliquet. Ut porttitor commodo dui. Donec a neque ac neque ornare blandit sed vitae elit. Suspendisse a consequat justo. Curabitur dapibus odio diam, ac hendrerit purus luctus in.

      Nunc in facilisis eros. Curabitur nec tempor ante. Nulla viverra sit amet turpis tincidunt aliquam. Vivamus tincidunt erat vitae nibh facilisis, eget cursus tellus consequat. Aenean mattis tempus blandit. Mauris quis massa et risus posuere mollis sit amet non turpis. Duis laoreet, nulla vel commodo aliquet, ante ligula condimentum arcu, sed volutpat velit eros sit amet quam.
    </p>
    <p id="p2" style="margin-bottom:10rem" class="read-the-docs" data-ez-tip="my tooltip" data-ez-tip-hover="true" data-ez-tip-position="bottom">
      With position bottom (unless scrolling forces it on top :)
    </p>
  </div>
`
render();