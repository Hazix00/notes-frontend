import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appCustomRouterLink]'
})
export class CustomRouterLinkDirective implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('appCustomRouterLink') customRouterLink: string | undefined;
  pathParts: string[] | undefined = [];

  constructor(
    private elementRef: ElementRef,
    private router: Router) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.addEventListener('click', this.activate.bind(this));
  }

  activate(): void {
    if (this.customRouterLink) {
      this.pathParts = this.customRouterLink?.split('/');
      if (this.pathParts?.length) {
        let p = this.pathParts[0];
        // console.log("navigating to " + p);
        let promise: Promise<any> = this.router.navigateByUrl(p);

        for (let i = 1; i < this.pathParts.length; i++) {
          p = p + '/' + this.pathParts[i];
          promise = promise.then(() => {
            // console.log("navigating to " + p);
            this.router.navigateByUrl(p);
          });
        }
      }
    }
  }

}
