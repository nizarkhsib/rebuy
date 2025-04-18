import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  registerError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }]),
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(): any { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const register = {
      email: this.registerForm.controls.email.value,
      username: this.registerForm.controls.email.value,
      password: this.registerForm.controls.email.value,
    };

    this.loading = true;
    this.authenticationService
      .signUp(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['auth/login']);
        },
        error => {
          this.registerError = true;
          this.errorMessage = error.error.errorMessage;
          // this.registerForm.reset();
          this.loading = false;
        });
  }
}
