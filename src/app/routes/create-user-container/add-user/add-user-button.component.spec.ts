import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddUserButton} from './add-user-button.component';
import {By} from '@angular/platform-browser';
import {ChangeDetectionStrategy} from '@angular/core';

describe('AddUserButton', () => {
  let component: AddUserButton;
  let fixture: ComponentFixture<AddUserButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserButton],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addFormClicked event when button is clicked', () => {
    jest.spyOn(component.addFormClicked, 'emit');
    component.formsCount = 5;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.addFormClicked.emit).toHaveBeenCalled();
  });

  it('should disable button when formsCount is 10 or more', () => {
    fixture.componentRef.setInput('formsCount', 11)
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should enable button when formsCount is less than 10', () => {
    component.formsCount = 9;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBe(false);
  });
});
