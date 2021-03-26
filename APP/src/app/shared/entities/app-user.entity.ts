export class AppUser {
    
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    fullName: string;

    constructor(userName:string, email:string, phoneNumber:string, password:string, fullName:string) {
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.fullName = fullName;
    }
}
