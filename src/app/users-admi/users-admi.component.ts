import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from 'src/common/global-constants';
import { Citas } from '../Citas';
import { EditCitaComponent } from '../edit-cita/edit-cita.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-users-admi',
  templateUrl: './users-admi.component.html',
  styleUrls: ['./users-admi.component.css'],
})
export class UsersAdmiComponent implements OnInit {
  columnas: string[] = ['Id', 'Usuario', 'Nombre', 'Correo', 'Acciones'];
  datos: Citas[] = [];
  constructor(public http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fillUsers();
  }

  deleteUser(id: number) {
    const User = this.datos[id];
    const filtro = this.datos.filter((datos)=> {
      return datos.id_cita !== User.id_cita
    })
    this.datos = filtro;
    console.log(this.datos);

    this.http
      .delete<Citas[]>(GlobalConstants.API + 'deleteCita/' + User.id_cita)
      .subscribe(() => {
      });
  }

  fillUsers() {
    this.http
      .get<Citas[]>(GlobalConstants.API + 'Citas')
      .subscribe((data: Citas[]) => {
        this.datos = data;
      });
  }

  editUser(id: number) {
    const dialogo1 = this.dialog.open(EditCitaComponent, {
      panelClass: 'my-dialog',
      data: new Citas(this.datos[id].id_cita, new Date(), '', ''),
      height: '50%',
      width: '300px',
    });

    dialogo1.afterClosed().subscribe((art: UserLogin) => {
      const body = {
        id: this.datos[id],
        name: art.nombre,
        email: art.email,
        rol: this.validatePersmission(art.rol),
      };
      this.http
        .put(GlobalConstants.API + 'User' + '/adm', body)
        .subscribe((data: any) => {
          console.log(data);
        });
      window.location.reload();
    });
  }

  validatePersmission(per: string) {
    if (per == '1') {
      return 'Administrador';
    } else if (per == '2') {
      return 'Usuario';
    } else {
      return 'Ventas';
    }
  }
 
  

}
