import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptorsProvider } from './z_app_common/_interceptors/http-interceptor.provider';
import { HomeComponent } from './z_app_common/components/home/home.component';
import { LoaderComponent } from './z_app_common/components/loader/loader.component';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerConfig, BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig, getDaterangepickerConfig } from 'shared/_constants/set-global-datepicker-config.function';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoaderComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
		BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      ModalModule.forRoot(),
      PopoverModule.forRoot(),
      SharedModule,
      AppRoutingModule,
      AgGridModule,
      ToastrModule.forRoot({
         timeOut: 5000,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true,
         closeButton: true,
         enableHtml: true
      }),
   ],
   schemas: [NO_ERRORS_SCHEMA], // Use NO_ERRORS_SCHEMA her
   providers: [
		HttpInterceptorsProvider,
		{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    	{ provide: BsDaterangepickerConfig, useFactory: getDaterangepickerConfig }
	],
   bootstrap: [AppComponent]
})
export class AppModule { }
