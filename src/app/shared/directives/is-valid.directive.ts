import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Subscription, tap} from 'rxjs';

@Directive({
  selector: '[isInputInvalid]',
  standalone: true
})
export class IsValidDirective implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private ngControl: NgControl) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.ngControl.statusChanges?.pipe(
        tap(() => this.updateValidationState())
      ).subscribe()
    );
    this.updateValidationState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    if (!this.ngControl.valid && this.ngControl.enabled) {
      this.renderer.removeClass(inputElement, 'is-valid');
      this.renderer.addClass(inputElement, 'is-invalid');
      if (!feedbackElement) {
        feedbackElement = this.renderer.createElement('div');
        this.renderer.addClass(feedbackElement, 'invalid-feedback');
        this.renderer.setStyle(feedbackElement, 'display', 'block');
        this.renderer.appendChild(parentElement, feedbackElement);
      }
      this.renderer.setProperty(feedbackElement, 'textContent', `Please provide a correct
      ${this.capitalizeFirstLetter(this.ngControl.name as string)}`);
    } else {
      this.renderer.removeClass(inputElement, 'is-invalid');
      this.renderer.addClass(inputElement, 'is-valid');
      if (feedbackElement) {
        this.renderer.removeChild(parentElement, feedbackElement);
      }
    }
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
