import { AbstractControl, FormGroup } from '@angular/forms';

export function comparePasswords(formModel: FormGroup) {
    let confirmPswrdCtrl = formModel.get('confirmPassword');

    if (confirmPswrdCtrl.errors == null || 'passwordMisMatch' in confirmPswrdCtrl.errors) {
        if (formModel.get('password').value != confirmPswrdCtrl.value)
            confirmPswrdCtrl.setErrors({ passwordMisMatch: true });
        else
            confirmPswrdCtrl.setErrors(null);
    }
}