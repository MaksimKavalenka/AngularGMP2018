import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReleaseBorder]',
})
export class ReleaseBorderDirective implements OnInit {

  @Input('appReleaseBorder')
  public creationDate: Date;

  public constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  public ngOnInit() {
    if (this.creationDate.getTime() > Date.now()) {
      this.renderer.setStyle(this.element.nativeElement, 'border-color', 'blue');
    } else if (this.creationDate.getTime() > (Date.now() - 14 * 24 * 60 * 60 * 1000)) {
      this.renderer.setStyle(this.element.nativeElement, 'border-color', 'green');
    }
  }

}
