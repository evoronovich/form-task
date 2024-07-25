import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserActionsComponent} from './user-actions.component';
import {By} from '@angular/platform-browser';

describe('UserActionsComponent', () => {
  let component: UserActionsComponent;
  let fixture: ComponentFixture<UserActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancelButtonClicked event when cancel button is clicked', () => {
    jest.spyOn(component.cancelButtonClicked, 'emit');
    fixture.componentRef.setInput('countdown', 5);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-danger'));
    button.triggerEventHandler('click', null);
    expect(component.cancelButtonClicked.emit).toHaveBeenCalled();
  });

  it('should emit submitButtonClicked event when submit button is clicked', () => {
    jest.spyOn(component.submitButtonClicked, 'emit');
    fixture.componentRef.setInput('countdown', null);
    component.value = 0;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    button.triggerEventHandler('click', null);
    expect(component.submitButtonClicked.emit).toHaveBeenCalled();
  });

  it('should disable submit button when value is greater than 0', () => {
    fixture.componentRef.setInput('countdown', null);
    component.value = 1;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should enable submit button when value is 0', () => {
    fixture.componentRef.setInput('countdown', null);
    component.value = 0;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should display countdown when countdown is not null', () => {
    fixture.componentRef.setInput('countdown', 5);
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.textContent).toContain('0:05');
  });

  it('should display invalid forms message when value is greater than 0', () => {
    fixture.componentRef.setInput('countdown', null);
    component.value = 2;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.text-danger'));
    expect(span.nativeElement.textContent).toContain('Invalid forms: 2');
  });
});
