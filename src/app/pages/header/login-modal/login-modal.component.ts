import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/login/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        loginId: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log( 'this.returnUrl: ' + this.returnUrl); 
  }

  get f() { return this.loginForm.controls; }

  alerts(){
    alert("d");
  }
  onLoginForCode() {
    alert('s');
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        console.log('xeta!');
        return;
    }
    
    this.authenticationService.login(this.f.loginId.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
              console.log('xeta!');
            });
}

}
