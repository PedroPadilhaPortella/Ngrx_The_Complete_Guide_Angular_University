import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { login } from '../auth.action';
import { AuthService } from "../auth.service";
import { AuthState } from '../reducers';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private store: Store<AuthState>,
        private router: Router,
    ) { }
    
    ngOnInit() {
        this.form = this.fb.group({
            email: ['test@angular-university.io', [Validators.required]],
            password: ['test', [Validators.required]]
        });
    }

    login() {
        const formValue = this.form.value;
        this.authService.login(formValue.email, formValue.password)
            .pipe(
                tap(user => {
                    this.store.dispatch(login({ user }));
                    this.router.navigateByUrl('/courses');
                }),
            )
            .subscribe(
                () => { },
                () => alert('Login Failed'),
            );
    }
}