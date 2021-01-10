import { NotesService } from './../../shared/notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ]),
  ],
  // animations: [
  //   trigger('noteAdding', [
  //     transition( ':enter', [
  //       // init state
  //       style({
  //         height: 0,
  //         opacity: 0,
  //         transform: 'scale(0.85)',
  //         marginBottom: 0,
  //         // We have to expand out the padding property
  //         paddingTop : 0,
  //         paddingBottom : 0,
  //         paddingRight : 0,
  //         paddingLeft : 0
  //       }),
  //       // Animate spacing
  //       animate('50ms', keyframes([
  //         style({
  //           height: '*',
  //           marginBottom: '*',
  //           paddingTop: '*',
  //           paddingBottom : '*',
  //           paddingRight : '*',
  //           paddingLeft : '*'
  //       })])),
  //       animate(500)
  //     ])
  //   ])
  // ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.get();
  }

}
