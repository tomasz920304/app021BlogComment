import { AppUser } from './../../shared/entities/app-user.entity';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from 'src/app/shared/services/appUser.service';
import { comparePasswords } from 'src/app/shared/validators/compare-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  formModel: FormGroup;

  get _userName() {
    return this.formModel.get('userName');
  }

  get _email() {
    return this.formModel.get('email');
  }

  get _phoneNumber() {
    return this.formModel.get('phoneNumber');
  }

  get _password() {
    return this.formModel.get('passwords.password');
  }

  get _confirmPassword() {
    return this.formModel.get('passwords.confirmPassword');
  }

  get _fullName() {
    return this.formModel.get('fullName');
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
      email: ['address@address.com', [Validators.required, Validators.email]],
      phoneNumber: [''],
      passwords: this.formBuilder.group({
        password: ['123', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['123', Validators.required]
      }, { validator: comparePasswords }),
      fullName: [''],
    });
  }

  onSubmit() {

    let _appUser =this.formModel.value;
    let appUser = new AppUser(_appUser.userName, _appUser.email, _appUser.phoneNumber, _appUser.passwords.password, _appUser.fullName);
    
    this.appUserService.register(appUser).subscribe(
      responce => {
        this.toastr.success('Submitted successfully', 'Done');
        console.log("Success", responce);
        this.router.navigate(["../blogComment-list"], { relativeTo: this.route });
      },
      error => {
        this.toastr.error('Error', 'Blog comment');
        console.log("Error", error);
      }
    );
  }

}
