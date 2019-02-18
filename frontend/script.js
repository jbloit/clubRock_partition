/*************************
 * Consts for everyone!
 ************************/

// Which notes the pedal is sustaining.
let sustaining = false
let sustainingNotes = [];

// Mousedown/up events are weird because you can mouse down in one element and mouse up
// in another, so you're going to lose that original element and never mouse it up.
let mouseDownButton = null;
const painter = new FloatyNotes();


initEverything();

/*************************
 * Basic UI bits
 ************************/
function initEverything() {

  // Start the drawing loop.
  onWindowResize();
  window.requestAnimationFrame(() => painter.drawLoop());

  // Event listeners.
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('orientationchange', onWindowResize);
}

// Here touch means either touch or mouse.
function doTouchStart(event) {
  event.preventDefault();
  mouseDownButton = event.target; 
  buttonDown(event.target.dataset.id, true);
}
function doTouchEnd(event) {
  event.preventDefault();
  if (mouseDownButton && mouseDownButton !== event.target) {
    buttonUp(mouseDownButton.dataset.id);
  }
  mouseDownButton = null;
  buttonUp(event.target.dataset.id);
}
function doTouchMove(event, down) {
   // If we're already holding a button down, start holding this one too.
  if (!mouseDownButton)
    return;
  
  if (down)
    buttonDown(event.target.dataset.id, true);
  else 
    buttonUp(event.target.dataset.id, true);
}

/*************************
 * Button actions
 ************************/
function buttonDown(button, fromKeyDown) {
  // If we're already holding this button down, nothing new to do.

  const pitch = CONSTANTS.LOWEST_PIANO_KEY_MIDI_NOTE + note;

  // Float it.
  const noteToPaint = painter.addNote(button, rect.getAttribute('x'), rect.getAttribute('width'));
  heldButtonToVisualData.set(button, {rect:rect, note:note, noteToPaint:noteToPaint});
}

// function buttonUp(button) {
//   const el = document.getElementById(`btn${button}`);
//   if (!el)
//     return;
//   el.removeAttribute('active');
  
//   const thing = heldButtonToVisualData.get(button);
//   if (thing) {
//     // Don't see it.
//     piano.clearNote(thing.rect);
    
//     // Stop holding it down.
//     painter.stopNote(thing.noteToPaint);
    
//     // Maybe stop hearing it.
//     const pitch = CONSTANTS.LOWEST_PIANO_KEY_MIDI_NOTE + thing.note;
//     if (!sustaining) {
//       player.playNoteUp(pitch);
//     } else {
//       sustainingNotes.push(CONSTANTS.LOWEST_PIANO_KEY_MIDI_NOTE + thing.note);
//     }
//   }
//   heldButtonToVisualData.delete(button);
// }

/*************************
 * Events
 ************************/
function onKeyDown(event) {
  // Keydown fires continuously and we don't want that.
  if (event.repeat) {
    return;
  }
  if (event.keyCode === 32) {  // sustain pedal
    sustaining = true;
  } else if (event.keyCode === 48) { // 0
    console.log('🧞‍♀️ resetting!');
    genie.resetState();
  } else {
    const button = getButtonFromKeyCode(event.keyCode);
    if (button != null) {
      buttonDown(button, true);
    }
  }
}

function onKeyUp(event) {
  if (event.keyCode === 32) {  // sustain pedal
    sustaining = false;
    // Release everything.

    sustainingNotes.forEach((note) => player.playNoteUp(note));
    sustainingNotes = [];
  } else {
    const button = getButtonFromKeyCode(event.keyCode);
    if (button != null) {
      buttonUp(button);
    }
  }
}

function onWindowResize() {

  painter.resize(piano.config.whiteNoteHeight);

}

