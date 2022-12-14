import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Proyecto } from '../proyecto';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/common/global-constants';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserLogin } from '../user-login';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../user';
import { EditProyectComponent } from '../edit-proyect/edit-proyect.component';
import { Contact } from '../contact';
import { FormEditComponent } from '../form-edit/form-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  columnas: string[] = [
    'Codigo',
    'Nombre',
    'Apellido',
    'Tipo documento',
    'Numero documento',
    'Genero',
    'Email',
    'Telefono',
    'Tipo Servicio',
    'Acciones'
  ];
  actual: string = '';
  datos: Proyecto[] = [];
  validation = false;

  @ViewChild(MatTable) tabla1!: MatTable<Proyecto[]>;
  constructor(
    public dialog: MatDialog,
    public http: HttpClient,
    public dialogEdit: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.fillProyects();
    //this.validatePersmission();
  }

  validatePersmission() {
    let perrmission = localStorage.getItem('rol');
    console.log(perrmission);
    if (perrmission == 'Administrador') {
      this.validation = true;
    }
    if (perrmission == 'Usuario') {
      this.validation = true;
    }
    console.log(this.validation);
  }

  fillProyects() {
    return this.http
      .get<Proyecto[]>(GlobalConstants.API + 'Projects')
      .subscribe((data: Proyecto[]) => {
        this.datos = data;
        console.log('jsj',this.datos)
      });
  }

  editProyect(proyecto: Proyecto, codigo: number) {
    this.datos[codigo] = proyecto;
    const body = {
      
    };
    this.http
      .post(GlobalConstants.API + 'Proyects' + '/Notification', {
        message:
          'El usuario ' +
          localStorage.getItem('email') +
          ' ha modificado el proyecto ' +
          '',
      })
      .subscribe((res) => console.log(res));

    return this.http.put(GlobalConstants.API + 'Proyects' + '/edit', body);
  }

  updateUser(proyecto: Proyecto, codigo: number) {
    this.datos[codigo] = proyecto;
    console.log(proyecto);
    const body = {
      
    };
    this.http
      .post(GlobalConstants.API + 'Proyects' + '/Notification', {
        message:
          'El usuario ' +
          localStorage.getItem('email') +
          ' ha cambiado el estado  del proyecto ' +
          '',
      })
      .subscribe((res) => console.log(res));
    return this.http.put(GlobalConstants.API + 'Proyects', body);
  }

  agendar() {
    this.router.navigate(['/AgendarCita']);
  }

  abrirDialogo() {
    const dialogo = this.dialog.open(EditUserComponent, {
     data : new Proyecto('' , '', '' , '','',2,'',1,''),
     height: '70%',
     width: '30%',

    });
  }

  abrirDialog() {
    const dialogo1 = this.dialog.open(RegisterUserComponent, {
      data : new UserLogin('' , '', 'a' , ''),
      height: '0%',
      width: '0%',
 
     });
  }

  fillRecomededMaterial(art: any) {
    this.http
      .post(GlobalConstants.API + 'Proyects' + '/FillMaterial', {
        id: art.ID_PRUECTOS,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  requestMaterial(art: any) {
    this.router.navigate(['/Material/' + art.ID_PRUECTOS]);
  }

  Material(codigo: number) {
    const proyecto = this.datos[codigo];
    this.router.navigate(['/Material/' ]);
  }

  deletePerson(id: number) {
    const Proyecto = this.datos[id];
    const filtro = this.datos .filter((datos)=> {
      return datos.id_persona !== Proyecto.id_persona
    })
    this.datos = filtro;
    console.log(this.datos);

    this.http
      .delete<Proyecto[]>(GlobalConstants.API + 'deletePersona/' + Proyecto.id_persona)
      .subscribe(() => {
        console.log('sipirili');
      });
  }

  editPerson(id: number) {
    const Proyecto =this.datos[id];
    const dialogo1 = this.dialog.open(FormEditComponent, {
      panelClass: 'my-dialog',
      data: Proyecto,
      height: '70%',
      width: '300px',
    });

    dialogo1.afterClosed().subscribe((art: UserLogin) => {
      const body = {
        first_name: this.datos[id].first_name,
        lastName: this.datos[id].lastName,
        document_type: this.datos[id].document_type,
        document_number: this.datos[id].document_number,
        telefono: this.datos[id].telefono,
        genero: this.datos[id].genero,
        email: this.datos[id].email,  
      };
      this.http
        .put(GlobalConstants.API + 'Usuarios' + '/adm', body)
        .subscribe((data: any) => {
          console.log(data);
        });
      window.location.reload();
    });
  }

}
