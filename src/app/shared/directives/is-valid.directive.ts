import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
  selector: '[appIsInvalid]',
  standalone: true
})
export class IsValidDirective {
  @Input() appIsInvalid: boolean = true;
  @Input() formControlName: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appIsInvalid'] || changes['formControlName']) {
      this.updateValidationState();
    }
  }

  private updateValidationState() {
    const inputElement = this.el.nativeElement;
    const parentElement = inputElement.parentElement;
    let feedbackElement = parentElement.querySelector('.invalid-feedback');

    if (this.appIsInvalid) {
      this.renderer.removeClass(inputElement, 'is-valid');
      this.renderer.addClass(inputElement, 'is-invalid');
      if (!feedbackElement) {
        feedbackElement = this.renderer.createElement('div');
        this.renderer.addClass(feedbackElement, 'invalid-feedback');
        this.renderer.setStyle(feedbackElement, 'display', 'block');
        this.renderer.appendChild(parentElement, feedbackElement);
      }
      this.renderer.setProperty(feedbackElement, 'textContent', `Please provide a correct ${this.formControlName}`);
    } else {
      this.renderer.removeClass(inputElement, 'is-invalid');
      this.renderer.addClass(inputElement, 'is-valid');
      if (feedbackElement) {
        this.renderer.removeChild(parentElement, feedbackElement);
      }
    }
  }
}
