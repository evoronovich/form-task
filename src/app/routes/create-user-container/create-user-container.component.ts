import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {AddFormButton} from './add-user-form/add-form-button.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserFormActionsComponent} from './user-form-actions/user-form-actions.component';
import {FormArray, FormGroup, FormsModule} from '@angular/forms';
import {CreateFormService} from '../../services/create-form.service';
import {CreateUserForm} from '../../model/create-user-form.model';
import {finalize, Observable, of, Subject, take, takeUntil, tap, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {DataService} from '../../services/api/data.service';

const COUNTDOWN_SECONDS = 5;

@Component({
  selector: 'app-create-user-container',
  standalone: true,
  imports: [AddFormButton, UserFormComponent, UserFormActionsComponent, FormsModule, AsyncPipe],
  providers: [CreateFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-user-container.component.html',
  styleUrl: './create-user-container.component.scss'
})
export class CreateUserContainerComponent implements OnInit, OnDestroy {
  public createUserFormArray = new FormArray<FormGroup<CreateUserForm>>([]);
  public invalidFormsCount = signal(1);
  private destroy$: Subject<void> = new Subject();
  public countdown$?: Observable<number | null>;
  private cancelClicked$: Subject<void> = new Subject<void>();

  constructor(private createFormService: CreateFormService,
              private dataService: DataService) {
  }

  public ngOnInit(): void {
    this.addNewForm();
    this.createUserFormArray.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.invalidFormsCount.set(
          this.createUserFormArray?.controls.filter(c => c.invalid).length))
      )
      .subscribe()
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public addNewForm(): void {
    this.createUserFormArray.push(this.createFormService.createUserForm());
  }

  public removeForm(formIndex: number): void {
    this.createUserFormArray.removeAt(formIndex);
  }

  public startTimer(): void {
    this.countdown$ = this.getCountdown();
    this.toggleFormArray(false);
  }

  private toggleFormArray(enable: boolean) {
    this.createUserFormArray.controls.forEach(c => enable ? c.enable() : c.disable());
  }

  public cancelTimer(): void {
    this.cancelClicked$.next();
    this.toggleFormArray(true);
  }

  private submitForms(): void {
    this.dataService.submitForms({
      forms: this.createUserFormArray.controls.map(c => ({
        country: c.get('country')?.getRawValue(),
        username: c.get('username')?.getRawValue(),
        birthday: c.get('birthday')?.getRawValue()
      }))
    }).pipe(tap(() => {
      this.createUserFormArray.controls.forEach(c => c.setValue({
        country: '',
        username: '',
        birthday: new Date()
      }));
      this.toggleFormArray(true);
    }))
      .subscribe()
  }

  getCountdown(): Observable<number> {
    return timer(0, 1000).pipe(
      map(i => COUNTDOWN_SECONDS - i),
      take(COUNTDOWN_SECONDS + 1),
      takeUntil(this.cancelClicked$),
      finalize(() => {
        this.countdown$ = of(null);
      }),
      tap((secondsLeft) => secondsLeft === 0 && this.submitForms())
    );
  }
}
