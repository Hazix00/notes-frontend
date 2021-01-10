import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from './../shared/notes.service';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() id!: number;


  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText')
  bodyText!: ElementRef<HTMLElement>;

  showTruncator = false;

  constructor(
    private cdRef:ChangeDetectorRef,
    private notesService: NotesService,
    private route: ActivatedRoute,

    ) { }

  ngAfterViewInit(): void {
    const style = window.getComputedStyle(this.bodyText.nativeElement, null);
    const viewableHeight = parseInt(style.getPropertyValue('height'), 10);
    this.showTruncator = this.bodyText.nativeElement.scrollHeight > viewableHeight;
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.notesService.delete(this.id);
  }
}
