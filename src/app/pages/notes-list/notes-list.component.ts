import { NotesService } from './../../shared/notes.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition( 'void => *', [
        // init state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          // We have to expand out the padding property
          paddingTop : 0,
          paddingBottom : 0,
          paddingRight : 0,
          paddingLeft : 0
        }),
        // Animate spacing
        animate(50,
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom : '*',
            paddingRight : '*',
            paddingLeft : '*'
        })),
        animate(68)
      ]),
      transition('* => void', [
        // First scale up
        animate(50 , style({transform : 'scale(1.01)'})),
        // then scale back to normal with fading
        animate(50 , style({transform : 'scale(1)', opacity : 0.75})),
        // scale down and fading completely
        animate('120ms ease-out' , style({transform : 'scale(0.68)', opacity : 0})),
        // void state
        animate('150ms ease-out',
          style({
            height: 0,
            'margin-bottom': 0,
            paddingTop : 0,
            paddingBottom : 0,
            paddingRight : 0,
            paddingLeft : 0
          })
        )
      ])
      // transition(':enter', [
      //   animate('200ms', style({ opacity: 1 }))
      // ]),
      // transition(':leave', [
      //   animate('200ms', style({ opacity: 0 }))
      // ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.get();
  }

}
