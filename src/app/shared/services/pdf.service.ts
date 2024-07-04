import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfService {

  constructor() { }
  generatePdf(documentDefinition: any) {
    pdfMake.createPdf(documentDefinition).open();
  }

  public getNameToKeyWise(keyProperty: any, valueProperty: any,key:any, list: any[], defaultValue: any): any {
    let name = defaultValue;
    let findDate = list.find(x => x[keyProperty] == key);
    if (findDate) {
      name = findDate[valueProperty]
    }
    return name;
  }
}
