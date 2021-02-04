import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { ActivatedRoute, Params } from '@angular/router';

import { Note } from './../../shared/note.model';
import { CustomRouterLinkDirective } from 'src/app/Directives/custom-router-link.directive';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note | undefined;
  editMode = false;
  @ViewChild(CustomRouterLinkDirective) vc!: CustomRouterLinkDirective;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute
     ) { }

  ngOnInit(): void {
    this.note = new Note();
    this.route.params.subscribe( (params: Params) => {
      if (params.id) {
        this.note = this.notesService.getById(params.id);
        this.editMode = true;
      }
      else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this.notesService.update(this.note!.id, form.value);
    }
    else {
      this.notesService.add(form.value);
    }
    this.vc.customRouterLink = 'list';
    this.vc.activate();
  }
}
