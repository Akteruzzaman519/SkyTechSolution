import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    @ViewChild('footerL', { static: true }) footerL: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

}
