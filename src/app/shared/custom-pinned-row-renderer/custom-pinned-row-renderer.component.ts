import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-pinned-row-renderer',
  templateUrl: './custom-pinned-row-renderer.component.html',
  styleUrls: ['./custom-pinned-row-renderer.component.css']
})
export class CustomPinnedRowRendererComponent implements ICellRendererAngularComp {
  public params: any;
  public style: any;

  agInit(params: any): void {
    this.params = params;
    this.style = this.params.style;
  }

  refresh(): boolean {
    return false;
  }
}