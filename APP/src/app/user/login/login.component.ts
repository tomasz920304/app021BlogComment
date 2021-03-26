import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUserService } from 'src/app/shared/services/appUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formModel: FormGroup;

  get _userName() {
    return this.formModel.get('userName');
  }

  get _password() {
    return this.formModel.get('password');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appUserService: AppUserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formModel = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['123', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    this.appUserService.login(this.formModel.value).subscribe(
      (responce: any) => {
        localStorage.setItem('token', responce.token);
        this.toastr.success('Submitted successfully', 'Done');
        console.log("Success", responce);
        this.router.navigateByUrl('/home');
      },
      error => {
        if (error.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else {
          this.toastr.error('Error', 'Blog comment');
          console.log("Error", error);
        }
      }
    );
  }

}
