import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDValueComponent } from './idvalue/idvalue.component';
import { NumericEditorComponent } from './numeric-editor/numeric-editor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IDValueComponent,
    NumericEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [IDValueComponent, NumericEditorComponent]
})
export class IDValueModule { }
