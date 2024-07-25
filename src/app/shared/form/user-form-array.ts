import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn} from '@angular/forms';

export class UserFormArray<P, TControl extends AbstractControl<any> = any> extends FormArray {
  override controls!: Array<TControl>

  constructor(controls: Array<TControl>,
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public toggleFormArray(enable: boolean) {
    this.controls.forEach(c => enable ? c.enable() : c.disable());
  }

  public getFormValues() {
    return this.controls.map(c => c.getRawValue())
  }

  public clearFormArrayValues(initialValue: P) {
    this.controls.forEach(c => c.setValue(initialValue));
  }

  public getInvalidControlsCount(): number {
    return this?.controls.filter(c => !c.valid).length;
  }

}
