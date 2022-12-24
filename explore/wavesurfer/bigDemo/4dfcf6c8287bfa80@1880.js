// https://observablehq.com/@hellonearthis/wave-surfer-regions@1880
function _1(md){return(
md`
# Wave Surfer Regions
<div style="background-color:#C0F1B0">  
This is a look at the WaveSurfer regions plug in.  
Regions can be add, resize, move and removed.

Clicking on a region plays it once.  
Shift + Clicking on a region plays it on loop.  
CTRL + Clicking on a region removes the region.  

Checking out: https://wavesurfer-js.org/ - https://github.com/katspaugh/wavesurfer.js

- https://wavesurfer-js.org/docs/methods.html
- https://wavesurfer-js.org/docs/options.html
- https://wavesurfer-js.org/docs/events.html


# Plugins used:

https://wavesurfer-js.org/plugins/ - https://github.com/katspaugh/wavesurfer.js/tree/master/src/plugin

- [Regions plugin](https://wavesurfer-js.org/plugins/regions.html):
Adds ability to display and interact with audio regions. Regions are visual overlays that can be resized and dragged around the waveform. You can play back and loop a region.


- [Cursor plugin](https://wavesurfer-js.org/plugins/cursor.html):
Shows a cursor on your waveform with time position.  
<br>`
)}

function _2(md){return(
md`# todo

add buttons and sliders and colour selects to these.

## UI changes
- \`wavesurfer.setBackgroundColor(color)\` – Sets the background color of the waveform container.
- \`wavesurfer.setCursorColor(color)\` – Sets the fill color of the cursor indicating the playhead position.
- \`wavesurfer.setProgressColor(color)\` – Sets the fill color of the waveform behind the cursor.
- \`wavesurfer.setWaveColor(color)\` – Sets the fill color of the waveform after the cursor.
- \`wavesurfer.setHeight(height)\` – Sets the height of the waveform.

## Adjust Play
- \`wavesurfer.setPlaybackRate(rate)\` – Sets the speed of playback (0.5 is half speed, 1 is normal speed, 2 is double speed and so on).
- \`wavesurfer.setVolume(newVolume)\` – Sets the playback volume to a new value [0..1] (0 = silent, 1 = maximum).
- \`wavesurfer.setPlayEnd(position)\` – Sets set a point in seconds for playback to stop at.
- \`wavesurfer.setMute(mute)\` – Mute the current sound. Can be a boolean value of *true* to mute sound or *false* to unmute

More TODOs

Have a different colour for each region.

The minLength needs to be define too,  to match region.end - region.start (could have issues if zoomed out due to edge/border of region)

Add an export regions button and maybe save it to local storage.
---`
)}

function _3(md){return(
md`# Regions
<div style="background-color:#FFE74C">  

**[Regions](https://wavesurfer-js.org/plugins/regions.html) are visual overlays on waveform that can be used to play and loop portions of audio. Regions can be dragged and resized.**

https://wavesurfer-js.org/api/typedef/index.html#static-typedef-RegionParams  
https://wavesurfer-js.org/api/typedef/index.html#static-typedef-RegionsPluginParams


wavesurfer [annotation](https://wavesurfer-js.org/example/annotation/index.html) example also lists region usage.

## Simple wavesurfer [example](https://wavesurfer-js.org/example/regions/index.html):

\`\`\`js
var wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    waveColor: '#A8DBA8',
    progressColor: '#3B8686',
    backend: 'MediaElement',
    plugins: [
        regions.create({
            regionsMinLength: 2,
            regions: [
                {
                    start: 1,  // in seconds
                    end: 3,
                    loop: false,
                    color: 'hsla(400, 100%, 30%, 0.5)'
                }, {
                    start: 5,
                    end: 7,
                    loop: false,
                    color: 'hsla(200, 50%, 70%, 0.4)',
                    minLength: 1,
                }
            ],
            dragSelection: {
                slop: 5
            }
        })
    ]
});
\`\`\`
<br>  
**If I was to save new regions then I would have to build and object like \`regions.create()\` in *plugins:* options.**

### Region events:

> - \`region-in\` – When playback enters a region. Callback will receive the \`Region\` object.
- \`region-out\`– When playback leaves a region. Callback will receive the \`Region\` object.
- \`region-mouseenter\` - When the mouse moves over a region. Callback will receive the \`Region\` object, and a \`MouseEvent\` object.
- \`region-mouseleave\` - When the mouse leaves a region. Callback will receive the \`Region\` object, and a \`MouseEvent\` object.
- \`region-click\` - When the mouse clicks on a region. Callback will receive the \`Region\` object, and a \`MouseEvent\` object.
- \`region-dblclick\` - When the mouse double-clicks on a region. Callback will receive the \`Region\` object, and a \`MouseEvent\` object.
- \`region-created\` – When a region is created. Callback will receive the \`Region\` object.
- \`region-updated\` – When a region is updated. Callback will receive the \`Region\` object.
- \`region-update-end\` – When dragging or resizing is finished. Callback will receive the \`Region\` object.
- \`region-removed\` – When a region is removed. Callback will receive the \`Region\` object.

#### event adding
- \`wavesurfer.on(eventName, callback)\` – Subscribes to an event.
- \`wavesurfer.un(eventName, callback)\` – Unsubscribes from an event. 

\`\`\`js
wavesurfer.on('region-click', function(region, e) {
        e.stopPropagation();
        region.loop = false;  // set region to not loop by default
        // Play on click, loop on shift click
        e.shiftKey ? region.playLoop() : region.play();
    });
\`\`\`
<br>  
### Regions Plugin

> Regions are visual overlays on waveform that can be used to play and loop portions of audio. Regions can be dragged and resized.

> Visual customization is possible via CSS (using the selectors \`.wavesurfer-region\` and \`.wavesurfer-handle\`).

> To enable the plugin, add the script \`plugin/wavesurfer.regions.js\` to your page.

> After doing that, use \`wavesurfer.addRegion()\` to create Region objects.

### Exposed Methods

> * \`addRegion(options)\` – Creates a region on the waveform. Returns a \`Region\` object.  
   See [Region Options](#region-options), [Region Methods](#region-methods) and [Region Events](#region-events) below.
    * **Note:** *You cannot add regions until the audio has finished loading*,  
       otherwise the \`start:\` and \`end:\` properties of the new region will be set to \`0\`, or an unexpected value.
* \`clearRegions()\` – Removes all regions.
* \`enableDragSelection(options)\` – Lets you create regions by selecting. areas of the waveform with mouse. \`options\` are Region objects' params (see [below](#region-options)).
* \`disableDragSelection()\` - **Disables ability to create regions.**

### Region Options

> - \`id\` (string) random: The id of the region.
- \`start\` (float) \`0\`: The start position of the region (in seconds).
- \`end\` (float) \`0\`: The end position of the region (in seconds).
- \`loop\` (boolean) \`false:\` Whether to loop the region when played back.
- \`drag\` (boolean) \`true\`: Allow/disallow dragging the region.
- \`resize\` (boolean) \`true\`: Allow/disallow resizing the region.
- \`color\` (string) \`"rgba(0, 0, 0, 0.1)"\`: HTML color code.
- \`minLength\`	(number)	null:	Optional minimum length for the region (in seconds).
- \`maxLength\`	(number)	null:	Optional maximum length for the region (in seconds).
  
### Region Methods

> * \`update(region_options)\` - Modify the settings of the region. See options above, can be an empty string''
* \`play()\` - Play the audio region from the *start* to *end* position.
* \`playLoop()\` - plays the region on a loop.
* \`remove()\` - Remove the region object.
* \`onDrag(timeInSeconds)\` - adds timeInSeconds to the *start* and *end* params.
* \`onResize(timeInSeconds, 'start')\` - Adds timeInSeconds to *end* by default.  
 The optional parameter 'start' will add timeInSeconds to *start*.


### Region Events
> **General events:**
* \`in\` - When playback enters the region.
* \`out\` - When playback leaves the region.
* \`remove\` - Happens just before the region is removed.
* \`update\` - When the region's options are updated.
* \`update-end\` - When dragging or resizing is finished.
  
> **Mouse events:**
* \`click\` - When the mouse clicks on the region. Callback will receive a *MouseEvent*.
* \`dblclick\` - When the mouse double-clicks on the region. Callback will receive a *MouseEvent*.
* \`over\` - When mouse moves over the region. Callback will receive a *MouseEvent*.
* \`leave\` - When mouse leaves the region. Callback will receive a *MouseEvent*.

[API Regions Plugin](https://wavesurfer-js.org/api/class/src/plugin/regions/index.js~RegionsPlugin.html)


## Method Summary
Public Methods

- \`add(params: object)\` returns (The created region object) Add a region, region parameters object
- \`clear()\`  Remove all regions
- \`destroy()\`
- \`disableDragSelection()\`
- \`enableDragSelection(params: *)\`
- \`getCurrentRegion()\` returns (Region) Get current region, The smallest region that contains the current time.  
 If several such regions exist, take the first. Return null if none exist.
- \`getRegionSnapToGridValue(value: number, params: Object)\` returns (number) Match the value to the grid, if required.  
  If the regions plugin params have a snapToGridInterval set, return the value matching the nearest grid interval. If no snapToGridInterval is set, the passed value will be returned without modification.  
  \`value:\` (number)	the value to snap to the grid, if needed  
  \`params:\` (object) the regions plugin pramas
- \`init()\`  
<br>`
)}

function _4(md){return(
md`---`
)}

function _5(htl){return(
htl.html`WaveForm 
<div id="wavDiv"></div><br>
<button id='playb'>▶️Play</button> <button id='pauseb'>⏸Pause</button> <button id='stopb'>⏹Stop</button>
<br><br>
`
)}

function _zoom(Inputs,Event){return(
Object.assign(Inputs.range([0, 500], {value: 0, label: "Zoom", step: 1 }), {
  oninput: event => event.isTrusted && event.stopImmediatePropagation(),
  onchange: event => event.currentTarget.dispatchEvent(new Event("input"))
})
)}

function _playSpeed(Inputs,Event){return(
Object.assign(Inputs.range([0.7, 1], {value: 1, label: "Play Back Speed", step: 0.1 }), {
  oninput: event => event.isTrusted && event.stopImmediatePropagation(),
  onchange: event => event.currentTarget.dispatchEvent(new Event("input"))
})
)}

function _8(wavesurfer){return(
wavesurfer.getVolume()
)}

function _playSpeed_function(wavesurfer,playSpeed){return(
wavesurfer.setPlaybackRate(playSpeed)
)}

function _zoom_function(wavesurfer,zoom){return(
wavesurfer.zoom(zoom)
)}

function _11(wavesurfer){return(
wavesurfer.on('region-click', function(region, e) {
  e.stopPropagation();
  region.loop = false;  // set region to not loop by default

  // if ctrl key pressed delete region
  // Play on click and Play_loop on shift click
  e.ctrlKey ? region.remove() : e.shiftKey ? region.playLoop() : region.play();
})
)}

function _12(wavesurfer){return(
wavesurfer.on('region-created', function(region, e) {
  region.color = 'rgba(0, 200, 0, 0.1)'
})
)}

function _14(now,wavesurfer)
{
  now
  return wavesurfer.getCurrentTime()  
}


function _15(wavesurfer){return(
wavesurfer.setPlaybackRate(1)
)}

function _16(wavesurfer){return(
wavesurfer.getDuration()
)}

function _17(wavesurfer){return(
wavesurfer.getPlaybackRate()
)}

function _18(wavesurfer){return(
wavesurfer.getVolume()
)}

function _19(regies,md){return(
md`
# Clicked and Other region data
<div style="background-color:#FFE74C">

wavesurfer.regions.list returns all the region objects. They have a unique name wavesurfer_random

These region objects can be edited and then updated.

\`\`\`js
wavesurfer.regions.list[${regies[0]}].start=30
wavesurfer.regions.list[${regies[0]}].end=60
wavesurfer.regions.list[${regies[0]}].update('')
\`\`\`
onResize(timeInSeconds, 'start') - Adds timeInSeconds to end by default. Value can be -/+.  
The optional parameter 'start' will add timeInSeconds to start.
\`\`\`js
wavesurfer.regions.list[${regies[0]}].onResize(10, 'start')  // adds to start (reducing the region size)
wavesurfer.regions.list[${regies[0]}].onResize(20) // adds to end
\`\`\`

move the region by 5 seconds
\`\`\`js
wavesurfer.regions.list[${regies[0]}].onDrag(5)
\`\`\`

<br>  `
)}

function _20(md){return(
md`if saving a region then it needs to be structured like the the plug-ins \`regions.create(array[{objects}]\`.

#### Region Options that are useful:

> - \`start\` (float) \`0\`: The start position of the region (in seconds).
- \`end\` (float) \`0\`: The end position of the region (in seconds).
- \`loop\` (boolean) \`false:\` Whether to loop the region when played back.
- \`drag\` (boolean) \`true\`: Allow/disallow dragging the region.
- \`resize\` (boolean) \`true\`: Allow/disallow resizing the region.

I need to read the start and end of each region,  the loop, drag and resize would default to false`
)}

function _21(wavesurfer){return(
wavesurfer.regions.list
)}

function _regies(wavesurfer){return(
Object.keys(wavesurfer.regions.list)
)}

function _regionsJSON(regies,wavesurfer)
{

  let regs = []
  for (let index = 0; index < regies.length; index++) {
    
    regs.push({ 
      start: wavesurfer.regions.list[regies[index]].start,
      end: wavesurfer.regions.list[regies[index]].end,
      loop: false,
      drag: false,
      resize: false
    })
  }
  return regs
}


function _controlButtons(d3,wavesurfer)
{ 
  d3.select('#playb').on('click',() =>  wavesurfer.playPause())
  d3.select('#pauseb').on('click',() => wavesurfer.pause())
  d3.select('#stopb').on('click',() => wavesurfer.stop()) 
}


function _33(md){return(
md`---`
)}

function _wavesurfer(d3,WaveSurfer,cursor,regions,audioURL)
{
  
  d3.select('#wavDiv > wave').remove()  // delete the wave displayed
    
  let ws = WaveSurfer.create({
    container: '#wavDiv',
    waveColor: '#048BA8',
    progressColor: '#F2CE4C',
    cursorColor: '#A4036F',
    cursorWidth: 1,
    height: 300,
    scrollParent: true,
 //   hideScrollbar: true,
      plugins: [
      cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          'background-color': '#004',  // can't use alpha channel rgba(0, 0, 4, 0.2) as the text doesn't get complely cleared
          color: '#ffa',
          padding: '2px',
          'font-size': '12px'
        }
      }),
      regions.create({
        regionsMinLength: 0.5,
        regions: [
          {
            start: 0,
            end: 20.5,
            loop: false,
            color: 'hsla(300, 100%, 30%, 0.5)',
            minLength: 1,
          }, {
            start: 32,
            end: 50,
            loop: false,
            color: 'hsla(500, 50%, 70%, 0.4)',
            minLength: 1,
          }
        ],
        dragSelection: {
          slop: 5
        }
      })
    ]
});
    
ws.load(audioURL)
  
return ws}


async function _audioURL(FileAttachment){return(
await FileAttachment("Trish Mar 13a.mp3").url()
)}

function _WaveSurfer(require){return(
require("https://unpkg.com/wavesurfer.js/dist/wavesurfer.js")
)}

function _regions(require){return(
require("https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.js")
)}

function _cursor(require){return(
require("https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.cursor.js")
)}

function _markers(require){return(
require("https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.markers.js")
)}

function _40(htl){return(
htl.html`<style>
  * {    font-family: sans-serif;  }

  .katex-display,p,table,ul,h1,h2,h3,h4,pre,code
  {
    max-width: 1100px;
    min-width: 1100px;
  }

  pre,code{
    background-color: #CDFFF9;
    font-size: 1.13vw;
    margin: auto;

    line-height: calc(1.2em + 12px);
  }

  pre{
    border: 1px solid #73AD21;
  }
</style>`
)}

function _41(md){return(
md`# Cursor Plugin [Example](https://wavesurfer-js.org/example/cursor/index.html)
<div style="background-color:#FFE74C">  
https://wavesurfer-js.org/plugins/cursor.html

https://wavesurfer-js.org/api/class/src/plugin/cursor/index.js~CursorPlugin.html


\`\`\`js
let wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    plugins: [
        cursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#004',
                color: '#ffa',
                padding: '2px',
                'font-size': '12px'
            }
        })
    ]
});
\`\`\`
<br>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Trish Mar 13a.mp3", {url: new URL("./files/6c8bff412077b1826a8707489eccca17919ddd934cdfa28e7f39cfd7f1e15a1a80f3c406b5efd225d626770056dcb6d4d7cfd297081c1d614315ed0caab98db4.mpga", import.meta.url), mimeType: "audio/mpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer("viewof zoom")).define("viewof zoom", ["Inputs","Event"], _zoom);
  main.variable(observer("zoom")).define("zoom", ["Generators", "viewof zoom"], (G, _) => G.input(_));
  main.variable(observer("viewof playSpeed")).define("viewof playSpeed", ["Inputs","Event"], _playSpeed);
  main.variable(observer("playSpeed")).define("playSpeed", ["Generators", "viewof playSpeed"], (G, _) => G.input(_));
  main.variable(observer()).define(["wavesurfer"], _8);
  main.variable(observer("playSpeed_function")).define("playSpeed_function", ["wavesurfer","playSpeed"], _playSpeed_function);
  main.variable(observer("zoom_function")).define("zoom_function", ["wavesurfer","zoom"], _zoom_function);
  main.variable(observer()).define(["wavesurfer"], _11);
  main.variable(observer()).define(["wavesurfer"], _12);
  main.variable(observer()).define(["now","wavesurfer"], _14);
  main.variable(observer()).define(["wavesurfer"], _15);
  main.variable(observer()).define(["wavesurfer"], _16);
  main.variable(observer()).define(["wavesurfer"], _17);
  main.variable(observer()).define(["wavesurfer"], _18);
  main.variable(observer()).define(["regies","md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["wavesurfer"], _21);
  main.variable(observer("regies")).define("regies", ["wavesurfer"], _regies);
  main.variable(observer("regionsJSON")).define("regionsJSON", ["regies","wavesurfer"], _regionsJSON);
  main.variable(observer("controlButtons")).define("controlButtons", ["d3","wavesurfer"], _controlButtons);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("wavesurfer")).define("wavesurfer", ["d3","WaveSurfer","cursor","regions","audioURL"], _wavesurfer);
  main.variable(observer("audioURL")).define("audioURL", ["FileAttachment"], _audioURL);
  main.variable(observer("WaveSurfer")).define("WaveSurfer", ["require"], _WaveSurfer);
  main.variable(observer("regions")).define("regions", ["require"], _regions);
  main.variable(observer("cursor")).define("cursor", ["require"], _cursor);
  main.variable(observer("markers")).define("markers", ["require"], _markers);
  main.variable(observer()).define(["htl"], _40);
  main.variable(observer()).define(["md"], _41);
  return main;
}
