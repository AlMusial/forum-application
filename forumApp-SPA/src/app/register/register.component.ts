import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      birth: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.matchPassword});
  }
  matchPassword(p: FormGroup) {
    return p.get('password').value === p.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => { // wywolujemy metode register z AuthService
        this.alertify.successMessage('registration successfull');
       }, error => {
          this.alertify.errorMessage(error);
       }, () => {
         this.authService.login(this.user).subscribe(() => {
           this.router.navigate(['/members']);
         });
       });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
