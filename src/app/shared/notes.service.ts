import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes : Note[] = new Array<Note>();
  constructor() { }

  get() : Note[] {
    return this.notes;
  }

  getById(id : number) : Note {
    return this.notes[id];
  }

  getid(note : Note) : number {
    return this.notes.indexOf(note);
  }

  add(note : Note) : number {
    const newLength = this.notes.push(note);
    return newLength - 1;
  }

  update(id : number, note : Note) {
    let getNote = this.getById(id);
    getNote.title = note.title;
    getNote.body = note.body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
