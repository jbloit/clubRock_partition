const CONSTANTS = {
  COLORS: ['#EE2B29', '#ff9800', '#ffff00', '#c6ff00', '#00e5ff', '#2979ff', '#651fff', '#d500f9'],
  BEATCOLOR: '#d500f9',
  MAXNOTES: 4,
}

/*************************
 * Floaty notes
 ************************/
class FloatyNotes {
  constructor() {
    this.notes = [];  // the notes floating on the screen.
    this.beats = [];  // the beats floating on the screen.


    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 4;
    this.context.lineCap = 'round';

    this.contextHeight = 0;
    this.contextWidth = 0;

    this.endLinePosition = 0.8; // height pct
    this.endLineY = 0; // end line y
  }

  resize(whiteNoteHeight) {
    this.canvas.width = this.contextWidth = window.innerWidth;
    this.canvas.height = this.contextHeight = window.innerHeight - whiteNoteHeight - 20;
  }

  addNote(button, x, width) {
    const noteToPaint = {
      x: parseFloat(x),
      y: 0,
      width: parseFloat(width),
      height: 0,
      color: CONSTANTS.COLORS[button],
      on: true
    };
    this.notes.push(noteToPaint);
    return noteToPaint;
  }

  addBeat() {
    const beatToPaint = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: 4,
      color: CONSTANTS.BEATCOLOR,
      on: true
    };
    this.beats.push(beatToPaint);
    return beatToPaint;
  }

  stopNote(noteToPaint) {
    noteToPaint.on = false;
  }

  drawLoop() {
    const dy = 3;
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.endLineY = this.endLinePosition * this.contextHeight;

    // Remove all the notes that will be off the page;
    this.notes = this.notes.filter((note) => note.on || note.y < (this.endLineY));

    // Remove all the beats that will be off the page;
    this.beats = this.beats.filter((beat) => beat.y < (this.endLineY));

    // Advance all the notes.
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];

      // If the note is still on, then its height goes up but it
      // doesn't start sliding down yet.
      if (note.on) {
        note.height += dy;
      } else {
        note.y += dy;
      }

      // this.context.globalAlpha = note.y / this.contextHeight ;
      this.context.fillStyle = note.color;

      // if note touches end line
      if (note.y + note.height >= this.endLineY){
        this.context.fillRect(note.x - 5, note.y, note.width + 10, note.height);
      } else {
        this.context.fillRect(note.x, note.y, note.width, note.height);
      }
    
    }

    // Advance all the beats.
    for (let i = 0; i < this.beats.length; i++) {
      const beat = this.beats[i];
      beat.y += dy;

      // draw beat line
      this.context.stroke.color = CONSTANTS.BEATCOLOR;
      this.context.lineWidth = 2;
      this.context.beginPath();
      this.context.moveTo(0, beat.y);
      this.context.lineTo(this.contextWidth, beat.y);
      this.context.stroke();
    }

    // draw end line
    this.context.stroke.color = CONSTANTS.BEATCOLOR;
    this.context.lineWidth = 7;
    this.context.beginPath();
    this.context.moveTo(0, this.endLinePosition * this.contextHeight);
    this.context.lineTo(this.contextWidth, this.endLineY);
    this.context.stroke();


    window.requestAnimationFrame(() => this.drawLoop());
  }
}

