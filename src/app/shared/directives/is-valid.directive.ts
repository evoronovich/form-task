import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appIsInvalid]',
  standalone: true
})
export class IsValidDirective implements OnChanges {
  @Input() appIsInvalid: boolean = true;
  @Input() formControlName: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appIsInvalid'] || changes['formControlName']) {
      this.updateValidationState();
    }
  }

  private updateValidationState() {

    const hostElement = this.el.nativeElement;
    const parentElement = hostElement.parentElement;
    let feedbackElement = parentElement.querySelector('.invalid-feedback');
    let inputElement;
    if (hostElement.tagName.toLowerCase() === 'input') {
      inputElement = hostElement
    } else {
      inputElement = hostElement.getElementsByTagName('input')[0];
    }
    if (!this.ngControl.valid) {
      this.renderer.removeClass(inputElement, 'is-valid');
      this.renderer.addClass(inputElement, 'is-invalid');
      if (!feedbackElement) {
        feedbackElement = this.renderer.createElement('div');
        this.renderer.addClass(feedbackElement, 'invalid-feedback');
        this.renderer.setStyle(feedbackElement, 'display', 'block');
        this.renderer.appendChild(parentElement, feedbackElement);
      }
      this.renderer.setProperty(feedbackElement, 'textContent', `Please provide a correct ${this.ngControl.name}`);
    } else {
      this.renderer.removeClass(inputElement, 'is-invalid');
      this.renderer.addClass(inputElement, 'is-valid');
      if (feedbackElement) {
        this.renderer.removeChild(parentElement, feedbackElement);
      }
    }
  }
}
