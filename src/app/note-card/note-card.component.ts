import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() title : string = '';
  @Input() body : string = '';

  @ViewChild('truncator')
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText')
  bodyText!: ElementRef<HTMLElement>;

  showTruncator = false;

  constructor(private cdRef:ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);
    this.showTruncator = this.bodyText.nativeElement.scrollHeight > viewableHeight;
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
  }

}
