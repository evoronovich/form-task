import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserFormArray} from './user-form-array'; // Adjust the import path as needed

describe('UserFormArray', () => {
  let formArray: UserFormArray<FormGroup<any>>;

  beforeEach(() => {
    const controls = [
      new FormGroup({
        country: new FormControl('USA'),
        username: new FormControl('john_doe'),
        birthday: new FormControl(new Date(2000, 0, 1))
      }),
      new FormGroup({
        country: new FormControl('Canada'),
        username: new FormControl('jane_doe'),
        birthday: new FormControl(new Date(1990, 5, 15))
      })
    ];
    formArray = new UserFormArray<FormGroup<any>>(controls);
  });

  it('should toggle form array controls', () => {
    formArray.toggleFormArray(false);
    formArray.controls.forEach(control => {
      expect(control.disabled).toBe(true);
    });

    formArray.toggleFormArray(true);
    formArray.controls.forEach(control => {
      expect(control.enabled).toBe(true);
    });
  });

  it('should get form values', () => {
    const expectedValues = [
      {country: 'USA', username: 'john_doe', birthday: new Date(2000, 0, 1)},
      {country: 'Canada', username: 'jane_doe', birthday: new Date(1990, 5, 15)}
    ];

    expect(formArray.getFormValues()).toEqual(expectedValues);
  });

  it('should clear form array values', () => {
    formArray.clearFormArrayValues();

    const clearedValues = [
      {country: '', username: '', birthday: new Date()},
      {country: '', username: '', birthday: new Date()}
    ];

    expect(formArray.getFormValues()).toEqual(clearedValues);
  });

  it('should get the count of invalid controls', () => {
    formArray.push(new FormGroup({
      country: new FormControl('', {validators: [Validators.required]}),
      username: new FormControl('', {validators: [Validators.required]}),
      birthday: new FormControl('', {validators: [Validators.required]})
    }));

    expect(formArray.getInvalidControlsCount()).toBe(1); // All should be invalid
  });
});
