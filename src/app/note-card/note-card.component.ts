import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { NotesService } from './../shared/notes.service';
import { Note } from '../shared/note.model';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() note!: Note;
  id!: number;

  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText')
  bodyText!: ElementRef<HTMLElement>;

  showTruncator = false;

  constructor(
    private cdRef:ChangeDetectorRef,
    private notesService: NotesService

    ) { }

  ngAfterViewInit(): void {
    const style = window.getComputedStyle(this.bodyText.nativeElement, null);
    const viewableHeight = parseInt(style.getPropertyValue('height'), 10);
    this.showTruncator = this.bodyText.nativeElement.scrollHeight > viewableHeight;
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.id = this.note.id;
  }

  onClick(): void {
    this.notesService.delete(this.note);
  }
}
