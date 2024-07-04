import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgStyle } from '@angular/common';
import { EmailUploadComponent } from './email-upload/email-upload.component';
import { AsignToAgentComponent } from './asign-to-agent/asign-to-agent.component';
import { ChangeMailCredentialComponent } from './change-mail-credential/change-mail-credential.component';
import { AssignMailClaimingComponent } from './assign-mail-claiming/assign-mail-claiming.component';
import { MailClaimingComponent } from './mail-claiming/mail-claiming.component';
import { AssignRoutineCheckComponent } from './assign-routine-check/assign-routine-check.component';
import { RoutineCheckComponent } from './routine-check/routine-check.component';
import { AssignChangeMapInfoComponent } from './assign-change-map-info/assign-change-map-info.component';
import { ChangeMapInfoComponent } from './change-map-info/change-map-info.component';
import { AssignReviewMapComponent } from './assign-review-map/assign-review-map.component';
import { ReviewMapComponent } from './review-map/review-map.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'shared/shared.module';
import { IDValueModule } from 'src/app/cod/Modules/idvalue/idvalue.module';

const routes: Routes = [
  { path: "fresh_email_upload", component: EmailUploadComponent, title: "Email Upload" },
  { path: "assign_to_change_mail_credential", component: AsignToAgentComponent, title: "Assign To Change Mail Credential" },
  { path: "change_mail_credential", component: ChangeMailCredentialComponent, title: "Change Mail Credential" },
  { path: "assign_for_mail_claiming", component: AssignMailClaimingComponent, title: "Assign For Map Claiming" },
  { path: "mail_claiming", component: MailClaimingComponent, title: "Map Claiming" },
  { path: "assign_for_routine_check", component: AssignRoutineCheckComponent, title: "Assign For Routine Check" },
  { path: "routine_check", component: RoutineCheckComponent, title: "Routine Check" },
  { path: "assign_to_change_map_info", component: AssignChangeMapInfoComponent, title: "Assign To Change Map Info" },
  { path: "change_map_info", component: ChangeMapInfoComponent, title: "Change Map Info" },
  { path: "assign_for_review_on_map", component: AssignReviewMapComponent, title: "Assign For Review On Map" },
  { path: "review_on_map", component: ReviewMapComponent, title: "Review On Map" }
]

@NgModule({
  declarations: [
    EmailUploadComponent,
    AsignToAgentComponent,
    ChangeMailCredentialComponent,
    AssignMailClaimingComponent,
    MailClaimingComponent,
    AssignRoutineCheckComponent,
    RoutineCheckComponent,
    AssignChangeMapInfoComponent,
    ChangeMapInfoComponent,
    AssignReviewMapComponent,
    ReviewMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    RouterModule.forChild(routes),
    IDValueModule,
    SharedModule,
    NgStyle
  ],
  exports: [
    EmailUploadComponent,
    AsignToAgentComponent,
    ChangeMailCredentialComponent,
    AssignMailClaimingComponent,
    MailClaimingComponent,
    AssignRoutineCheckComponent,
    RoutineCheckComponent,
    AssignChangeMapInfoComponent,
    ChangeMapInfoComponent,
    AssignReviewMapComponent,
    ReviewMapComponent
  ]
  ,
  providers: [DatePipe],
})
export class OperationModule { }
