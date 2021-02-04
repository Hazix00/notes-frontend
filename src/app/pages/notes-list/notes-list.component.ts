import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ActivationEnd, Router } from '@angular/router';

import { NotesService } from './../../shared/notes.service';
import { Note } from 'src/app/shared/note.model';

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
    ]),
    trigger('listAnimate', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0, height: 0}),
          stagger(100, [
            animate('0.2s ease')
          ])
        ],
        { optional: true },
        )
      ])
    ]
    )
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(
    private notesService: NotesService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      if (ev instanceof ActivationEnd &&
        Object.is(ev?.snapshot?.component, NotesListComponent)) {
          this.notes = this.notesService.get();
          console.log('Back');
      }
    });
    this.notes = this.notesService.get();
    console.log('init list');
  }

  trackElement(index: number, element: any): number | null {
    return element ? element.id : null;
  }

  filter(event: any): void {
    // tslint:disable-next-line: no-shadowed-variable
    const query: string = (event.target as HTMLInputElement).value;
    this.notes = this.notesService.filterNotes(query);
    this.cdRef.detectChanges();
  }
}
