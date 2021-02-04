import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  static incId = 12;
  private notes = new Array<Note>();
  private filteredNotes = new Array<Note>();
  constructor() {
    this.notes = [
      { id: 1, title: 'Hello', body: 'lorem ipsum' },
      { id: 2, title: 'Anime list', body: 'aBC' },
      { id: 3, title: 'courses', body: 'lorem ipsum' },
      { id: 4, title: 'Movies', body: 'lorem ipsum' },
      { id: 5, title: 'Ip adress', body: '192.168.43.4' },
      { id: 6, title: 'Wi-fi pass', body: 'lorem ipsum' },
      { id: 7, title: 'my car', body: 'Super nice' },
      { id: 8, title: 'Mobile Apps', body: 'Learnig apps and health' },
      { id: 9, title: 'Games', body: 'Evertale, Dofus\nPrince of persia the two thrones' },
      { id: 10, title: 'Phone number', body: '06661155448' },
      { id: 11, title: 'Server pass', body: 'dfd@$!548' },
    ];
    this.filteredNotes = this.notes;
  }

  get(): Note[] {
    return this.filteredNotes;
  }

  getById(id: number): Note | undefined {
    return this.notes.find( note => note.id == id);
  }

  // getid(note: Note): number {
  //   return this.notes.indexOf(note);
  // }

  add(note: Note): number {
    note.id = NotesService.incId;
    const newLength = this.notes.push(note);
    NotesService.incId++;
    return newLength - 1;
  }

  update(id: number, note: Note): void {
    const getNote = this.getById(id);
    getNote!.title = note.title;
    getNote!.body = note.body;
  }

  delete(note: Note): void {
    // const id = this.getid(note);
    this.notes.splice(note.id, 1);
    // delete from filteredNotes if notes are filtered
    const fIndex = this.filteredNotes.indexOf(note);
    if (fIndex >= 0) {
      this.filteredNotes.splice(fIndex, 1);
    }
  }

  filterNotes(query: string): Note[] {
    if (query.trim() === ''){
      this.filteredNotes = this.notes;
      return this.filteredNotes;
    }
    query = query.toLowerCase().trim();

    let terms = query.split(' ');
    // get unique term values
    terms = Array.from(new Set<any>(terms));
    let allResults = new Array<Note>();
    terms.forEach(term => {
      const results: Note[] = this.notes.filter(note => {
        return note.title.toLowerCase().includes(term) || note.body?.toLowerCase().includes(term);
      });
      allResults = [...allResults, ...results];
    });
    this.filteredNotes = Array.from(new Set<any>(allResults));
    return this.filteredNotes;
  }
}
