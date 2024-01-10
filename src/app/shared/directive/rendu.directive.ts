import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective implements OnChanges {
  @Input() appRendu?: boolean; // Accepte une valeur booléenne

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appRendu']) {
      this.updateStyle(this.appRendu);
    }
  }

  private updateStyle(rendu: boolean | undefined) {
    if (rendu) {
      this.el.nativeElement.style.color = "green";
      this.el.nativeElement.style.border = "1px dashed green";
      this.el.nativeElement.style.backgroundColor = "yellow";
    } else {
      // Réinitialiser les styles si nécessaire
      this.el.nativeElement.style.color = null;
      this.el.nativeElement.style.border = null;
      this.el.nativeElement.style.backgroundColor = null;
    }
  }
}
