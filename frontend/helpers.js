const CONSTANTS = {
    COLORS : ['#EE2B29','#ff9800','#ffff00','#c6ff00','#00e5ff','#2979ff','#651fff','#d500f9'], 
    MAXNOTES : 4,
  }
  
  /*************************
   * Floaty notes
   ************************/
  class FloatyNotes {
    constructor() {
      this.notes = [];  // the notes floating on the screen.
      
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d');
      this.context.lineWidth = 4;
      this.context.lineCap = 'round';
      
      this.contextHeight = 0;
    }
    
    resize(whiteNoteHeight) {
      this.canvas.width = window.innerWidth;
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
    
    stopNote(noteToPaint) {
      noteToPaint.on = false;
    }
    
    drawLoop() {
      const dy = 3;
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
      // Remove all the notes that will be off the page;
      this.notes = this.notes.filter((note) => note.on || note.y < (this.contextHeight - 100));
  
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
        
        this.context.globalAlpha = 1 - note.y / this.contextHeight;
        this.context.fillStyle = note.color;
        this.context.fillRect(note.x, note.y, note.width, note.height);
      }
      window.requestAnimationFrame(() => this.drawLoop());
    }
  }
