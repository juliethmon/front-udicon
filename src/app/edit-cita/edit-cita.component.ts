import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from '../user-login';
import { Asesoria } from '../asesoria';
import { HttpClient } from '@angular/common/http'; 
import { GlobalConstants } from 'src/common/global-constants';
import { __importStar } from 'tslib';
import { Citas } from '../Citas';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrls: ['./edit-cita.component.css']
})
export class EditCitaComponent implements OnInit {
  constructor(public http: HttpClient, public service: NotificationsService, @ Inject(MAT_DIALOG_DATA) public data: Citas, public dialogRef: MatDialogRef<EditCitaComponent>) {}

  ngOnInit(): void {}


  agendar() {
    if (this.data.hora_cita != '') {
      const body = {
        fecha_cita:
          Number(this.data.fecha_cita.getMonth() + 1)  +
          '/' +
          Number(this.data.fecha_cita.getUTCDate()) +
          '/' +
          this.data.fecha_cita.getUTCFullYear(),
        hora_cita: this.data.hora_cita,
      };
      console.log(body);
      console.log('entro a asesorias', GlobalConstants.API + 'updateCita');
      this.http
        .put<Asesoria>(GlobalConstants.API + 'updateCita/'+ this.data.id_cita, body)
        .subscribe(() => {
          console.log('jjj');
        });

      this.onSuccess('La cita fue agendada correctamente');
    }else{
      this.onError('Todos los campos son obligatorios');

    }


    this.dialogRef.close(this.data);
  }

  onError(message: any){
    this.service.error('Error', message, {
      postition: ['bottom', 'right'],
      timeOut: 4000,
      animate: 'fade',
      showProgress: true
    });
  }

  onSuccess(message: any) {
    this.service.success('Completado', message, {
      postition: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgress: true,
    });
  }
}

  
  