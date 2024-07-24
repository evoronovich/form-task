import { IsValidDirective } from './is-valid.directive';
import {Component, DebugElement, Renderer2} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormsModule, NgControl, FormGroup} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="formGroup">
      <input formControlName="test" isInputInvalid>
    </form>
  `
})
class TestComponent {
  formGroup = new FormGroup({
    test:  new FormControl('')
  });
}

describe('IsValidDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, FormsModule, IsValidDirective],
      providers: [Renderer2]
    });

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new IsValidDirective(inputEl, TestBed.inject(Renderer2), inputEl.injector.get(NgControl));
    expect(directive).toBeTruthy();
  });

  it('should add is-invalid class when input is invalid', () => {
    const control = inputEl.injector.get(NgControl).control as FormControl;
    control.setErrors({ invalid: true });
    fixture.detectChanges();

    expect(inputEl.nativeElement.classList.contains('is-invalid')).toBe(true);
  });

  it('should remove is-invalid class when input is valid', () => {
    const control = inputEl.injector.get(NgControl).control as FormControl;
    control.setErrors(null);
    fixture.detectChanges();

    expect(inputEl.nativeElement.classList.contains('is-invalid')).toBe(false);
    expect(inputEl.nativeElement.classList.contains('is-valid')).toBe(true);
  });

  it('should create invalid-feedback element when input is invalid', () => {
    const control = inputEl.injector.get(NgControl).control as FormControl;
    control.setErrors({ invalid: true });
    fixture.detectChanges();

    const feedbackEl = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(feedbackEl).toBeTruthy();
    expect(feedbackEl.nativeElement.textContent).toContain('Please provide a correct');
  });

  it('should remove invalid-feedback element when input is valid', () => {
    const control = inputEl.injector.get(NgControl).control as FormControl;
    control.setErrors(null)
    fixture.detectChanges();

    const feedbackEl = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(feedbackEl).toBeFalsy();
  });
});
