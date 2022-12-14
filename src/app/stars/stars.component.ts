import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(public dialogRef: MatDialogRef<StarsComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: number) { }
  
  ngOnInit() {
  }

  cancelar() {
    this.data = this.selectedValue;
    this.dialogRef.close(this.data);
  }
  
  countStars(star:number) {
    this.selectedValue = star;
    this.cancelar();
  }
}
