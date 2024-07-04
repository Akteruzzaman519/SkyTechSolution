import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-idvalue',
  templateUrl: './idvalue.component.html',
  styleUrls: ['./idvalue.component.css']
})
export class IDValueComponent implements ICellRendererAngularComp {

  public value: any;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}
