import { Note } from './../../shared/note.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note! : Note;
  noteId!: number;
  editMode = false;

  constructor(
    private notesService : NotesService,
    private router: Router,
    private route: ActivatedRoute
     ) { }

  ngOnInit(): void {
    this.note = new Note();
    this.route.params.subscribe( (params : Params) => {
      if (params.id) {
        this.note = this.notesService.getById(params.id);
        this.noteId = params.id;
        this.editMode = true;
      }
      else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form : NgForm) {
    if (this.editMode) {
      this.notesService.update(this.noteId, form.value);
    }
    else {
      this.notesService.add(form.value);
    }
    this.router.navigateByUrl('/');
  }
}
