import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
  import {Router} from "@angular/router"
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { GlobalConstants } from 'src/common/global-constants';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {
   email: string = '';
  password: string = '';
  imageSrc = '/assets/img/Logo.svg'; 
  imageAlt = 'Logo'; 
  constructor(public http: HttpClient , private router: Router , public service: NotificationsService, public dialog: MatDialog) { }

  register(){
    const dialogo1 = this.dialog.open(RegisterUserComponent, {
      data : new UserLogin('' , '', 'u' , ''),
      height: '0%',
      width: '0%',
 
     });
  }

  login() {
    if(this.email != '' && this.password != ''){
          const body = { user_name: this.email, password: this.password };
          console.log("entro a login",GlobalConstants.API+"Login")
          this.http.post<User>(GlobalConstants.API+"Login", body )
          .subscribe((response: User) => {
            localStorage.setItem('id', response.id);
            localStorage.setItem('rol', response.rol); 
            this.router.navigate(['/ProjectHistory']);
            
        },
        (error: HttpErrorResponse) => {
          this.onError('Usuario o contraseña incorrectos');
        });
    }else{
      this.onError('Todos los campos son obligatorios');
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onSuccess(message: any){
    this.service.success('Completado', message, {
      postition: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgress: true
    });
  }

  onError(message: any){
    this.service.error('Error', message, {
      postition: ['bottom', 'right'],
      timeOut: 4000,
      animate: 'fade',
      showProgress: true
    });
  }
}
