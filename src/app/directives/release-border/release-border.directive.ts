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
    if (this.creationDate) {
      if (this.creationDate.getTime() > Date.now()) {
        return this.renderer.setStyle(this.element.nativeElement, 'border-color', 'blue');
      }
      if (this.creationDate.getTime() > (Date.now() - 14 * 24 * 60 * 60 * 1000)) {
        return this.renderer.setStyle(this.element.nativeElement, 'border-color', 'green');
      }
    }
    return this.renderer.setStyle(this.element.nativeElement, 'border-color', 'black');
  }

}
