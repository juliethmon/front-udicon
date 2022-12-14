import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/common/global-constants';
import { NotificationsService } from 'angular2-notifications';
import { Asesoria } from '../asesoria';
import { MatDialog } from '@angular/material/dialog';
import { TiposCasa } from '../tipos-casa';
import { Elemento } from '../elemento';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { StarsComponent } from '../stars/stars.component';
@Component({
  selector: 'app-history-buy',
  templateUrl: './history-buy.component.html',
  styleUrls: ['./history-buy.component.css'],
})
export class HistoryBuyComponent implements OnInit {
  datos: any[] = [];
  fecha_cita: Date;
  hora_cita: string = '';
  asesoria: Asesoria[] = [];
  houseTyoe: TiposCasa[] = [];
  elementos: Elemento [] = [];
  validationCita: boolean = true;
  validationTypeHouse: boolean = false;
  validationPisos: boolean = false;
  validationVentana: boolean = false;
  validationPared = false;
  validationLuz= false;
  validationCocina = false;
  validationComedor = false;
  validationSala = false;
  tipoCasa = '';
  pisoSeleccionado = 0;
  ventanaSeleccionada = 0;
  paredSeleccionada = 0;
  lucesSeleccionas = 0;
  cocinaSeleccionada = 0;
  comedorSeleccionado = 0;
  salaSeleccionada = 0;

  estrellasPiso = 0;
  estrellasVentana = 0;
  estrellasPared = 0;
  estrellasLuces = 0;
  estrellasCocina = 0;
  estrellasComedor = 0;
  estrellasSala = 0;

  countDays = 0;

  constructor(public http: HttpClient, public service: NotificationsService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.fillTypeHouse();
  }

  fillTypeHouse() {
    this.http
    .get<TiposCasa[]>(GlobalConstants.API + 'TiposCasa')
    .subscribe((body) => {
      this.houseTyoe = body;
      console.log('entro a tipos de casa', this.houseTyoe);
    });
  }

  pisos(id: number){
    if(this.hora_cita && this.fecha_cita){
      for (let i = 0; i < this.houseTyoe.length; i++) {
        if (this.houseTyoe[i].id_house_type == id) {
          this.tipoCasa = this.houseTyoe[i].name;
        }
      }
      this.http
      .get<Elemento[]>(GlobalConstants.API + 'elementos/'+id)
      .subscribe((body) => {
        this.elementos = body;
        console.log('entro a elementos', this.elementos);
      });
      this.validationTypeHouse = false;
      this.validationPisos = true;
    }else{
      this.onError("Todos los campos son obligatorios")
    }
  }

  ventana(id: number){
    this.countTotal(id);
    const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasPiso = result;
      this.pisoSeleccionado = id;
      this.validationPisos = false;
      this.validationVentana = true;
    });
  }

  pared(id: number){
    this.countTotal(id);
    const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasVentana = result;
      this.ventanaSeleccionada = id;
      this.validationVentana = false;
      this.validationPared = true;
    });
  }

  luces(id: number){
    this.countTotal(id);
     const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasPared = result;
      this.paredSeleccionada = id;
      this.validationPared = false;
      this.validationLuz = true;
    });
  }

  cocina(id: number){
    this.countTotal(id);
    const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasLuces = result;
      this.lucesSeleccionas = id;
      this.validationLuz = false;
      this.validationCocina = true;
    });
  }

    comedor(id: number){
      this.countTotal(id);
       const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasCocina = result;
      this.cocinaSeleccionada = id;
      this.validationCocina = false;
      this.validationComedor = true;
    });
  }

  sala(id: number){
    this.countTotal(id);
     const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.estrellasComedor = result;
      this.comedorSeleccionado = id;
      this.validationComedor = false;
      this.validationSala = true;
    });
  }

  async cita(id: number){
    this.countTotal(id);
    const dialogo = this.dialog.open(StarsComponent, {
      height: '30%',
      width: '30%',
      data: 0
     });

    dialogo.afterClosed().subscribe(result => {
      this.onSuccess('De acuerdo a tu selección tu asesoria tardará al rededor de ' + this.countDays + 'sesiones y cada una de estas tendrá un costo de $180.000');      
      this.estrellasSala = result;
      this.salaSeleccionada = id;
      this.validationSala = false;
      if (this.hora_cita != '') {
        const body = {
          id: localStorage.getItem('id'),
          fecha_cita:
            this.fecha_cita.getMonth() +
            '/' +
            Number(this.fecha_cita.getUTCDate()) +
            '/' +
            this.fecha_cita.getUTCFullYear(),
          hora_cita: this.hora_cita,
          id_piso: this.pisoSeleccionado,
          id_ventana: this.ventanaSeleccionada,
          id_pared: this.paredSeleccionada,
          id_luces: this.lucesSeleccionas,
          id_cocina: this.cocinaSeleccionada,
          id_comedor: this.comedorSeleccionado,
          id_sala: this.salaSeleccionada,
          stars_piso: this.estrellasPiso,
          stars_ventana: this.estrellasVentana,
          stars_pared: this.estrellasPared,
          stars_luces: this.estrellasLuces,
          stars_cocina: this.estrellasCocina,
          stars_comedor: this.estrellasComedor,
          stars_sala: this.estrellasSala,
          total : this.countDays*180000
        };
        console.log('entro a asesorias', GlobalConstants.API + 'createCita');
        this.http
          .post<Asesoria>(GlobalConstants.API + 'createCita', body)
          .subscribe(() => {
            console.log('jjj');
          });
  
        this.onSuccess('La cita fue agendada correctamente');
      }else{
        this.onError('Todos los campos son obligatorios');
  
      }
    });

    this.router.navigate(['/ProjectHistory']);
  }

  countTotal(id:  number){
    this.elementos.map((elemento)=>{
        if(elemento.id_elemento === id) this.countDays += elemento.advisoryNumber
    })
  }


  agendar() {
    if(this.fecha_cita && this.hora_cita){
      this.validationCita = false;
      this.validationTypeHouse = true;    
    }else{
      this.onError("Todos los campos son obligatorios")
    }
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
      timeOut: 6000,
      animate: 'fade',
      showProgress: true,
    });
  }
}
