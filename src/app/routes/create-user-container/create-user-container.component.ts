import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {AddUserButton} from './add-user/add-user-button.component';
import {UserCardComponent} from './user-card/user-card.component';
import {UserActionsComponent} from './user-form-actions/user-actions.component';
import {FormGroup, FormsModule} from '@angular/forms';
import {CreateFormService} from '../../services/create-form.service';
import {finalize, Observable, of, Subject, take, takeUntil, tap, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {DataService} from '../../services/api/data.service';
import {CreateUserForm} from '../../shared/model/create-user-form.model';
import {UserFormArray} from '../../shared/form/user-form-array';

const COUNTDOWN_SECONDS = 5;

@Component({
  selector: 'app-create-user-container',
  standalone: true,
  imports: [AddUserButton, UserCardComponent, UserActionsComponent, FormsModule, AsyncPipe],
  providers: [CreateFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-user-container.component.html',
  styleUrl: './create-user-container.component.scss'
})
export class CreateUserContainerComponent implements OnInit, OnDestroy {
  public createUserFormArray: UserFormArray<FormGroup<CreateUserForm>> =
    new UserFormArray<FormGroup<CreateUserForm>>([]);
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
          this.createUserFormArray?.getInvalidControlsCount()))
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
    this.createUserFormArray.toggleFormArray(false);
  }

  public cancelTimer(): void {
    this.cancelClicked$.next();
    this.createUserFormArray.toggleFormArray(true);
  }

  private submitForms(): void {
    this.dataService.submitForms({
      forms: this.createUserFormArray.getFormValues()
    }).pipe(tap(() => {
      this.createUserFormArray.clearFormArrayValues();
      this.createUserFormArray.toggleFormArray(true);
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
