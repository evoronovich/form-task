import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {AddFormButton} from './add-user-form/add-form-button.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserFormActionsComponent} from './user-form-actions/user-form-actions.component';
import {FormArray, FormGroup, FormsModule} from '@angular/forms';
import {CreateFormService} from '../../services/create-form.service';
import {CreateUserForm} from '../../model/create-user-form';
import {finalize, interval, Observable, of, Subject, take, takeUntil, tap, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

const COUNTDOWN_SECONDS = 5;

@Component({
  selector: 'app-create-user-container',
  standalone: true,
  imports: [AddFormButton, UserFormComponent, UserFormActionsComponent, FormsModule, AsyncPipe],
  templateUrl: './create-user-container.component.html',
  styleUrl: './create-user-container.component.scss'
})
export class CreateUserContainerComponent implements OnInit, OnDestroy {
  public createUserFormArray = new FormArray<FormGroup<CreateUserForm>>([]);
  public invalidFormsCount = signal(1);
  private destroy$: Subject<void> = new Subject();
  public isFormSubmitting: boolean = false;
  public countdown$?: Observable<number | null>;
  private cancelClicked$: Subject<void> = new Subject<void>();

  constructor(private createFormService: CreateFormService) {
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
    this.isFormSubmitting = true;
    this.countdown$ = this.getCountdown();
  }

  public cancelTimer(): void {
    this.cancelClicked$.next();
  }

  private submitForms(): void {

  }

  getCountdown(): Observable<number> {
    return timer(0, 1000).pipe(
      map(i => COUNTDOWN_SECONDS - i),
      take(COUNTDOWN_SECONDS + 1),
      takeUntil(this.cancelClicked$),
      finalize(() => {
        this.countdown$ = of(null);
        this.isFormSubmitting = false;
      }),
      tap((secondsLeft) => secondsLeft === 0 && this.submitForms())
    );
  }
}
