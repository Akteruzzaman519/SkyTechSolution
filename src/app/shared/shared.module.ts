import { CrossModuleService } from './services/cross-module.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from "./layouts/menu-bar/menu-bar.component";
import { WrapperComponent } from "./layouts/wrapper/wrapper.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgStyle } from '@angular/common';
import { NumericDirective } from './_directives/numbers-only.directive';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SingleElementSelectionComponent } from './components/single-element-selection/single-element-selection.component';
import { MultiElementSelectionComponent } from './components/multi-element-selection/multi-element-selection.component';
import { HighlightPipe } from './_pipes/highlight-text';
import { MenuBarV2Component } from './layouts/menu-bar-v2/menu-bar-v.component';
import { PdfService } from './services/pdf.service';
import { CustomPinnedRowRendererComponent } from './custom-pinned-row-renderer/custom-pinned-row-renderer.component';

@NgModule({

   imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      RouterModule,
      CollapseModule,
      BsDropdownModule,
      ModalModule,
      NgStyle
   ],
   providers: [
      CrossModuleService,
      PdfService
   ],
   declarations: [
      NumericDirective,
		HighlightPipe,
      WrapperComponent,
      MenuBarComponent,
		MenuBarV2Component,
      ConfirmationDialogComponent,
		MultiElementSelectionComponent,
		SingleElementSelectionComponent,
      FooterComponent,
      CustomPinnedRowRendererComponent
   ],

   exports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ModalModule,
      NumericDirective,
		HighlightPipe,
      WrapperComponent,
      MenuBarComponent,
		MenuBarV2Component,
      ConfirmationDialogComponent,
		MultiElementSelectionComponent,
		SingleElementSelectionComponent,
      CustomPinnedRowRendererComponent,
      NgStyle
   ],
   schemas: []
})

export class SharedModule { }
