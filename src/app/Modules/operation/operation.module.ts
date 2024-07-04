import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: "operation/fresh_email_upload", component: EmailUploadComponent },
  { path: "operation/assign_to_change_mail_credential", component: AsignToAgentComponent },
  { path: "operation/change_mail_credential", component: ChangeMailCredentialComponent },
  { path: "operation/assign_for_mail_claiming", component: AssignMailClaimingComponent },
  { path: "operation/mail_claiming", component: MailClaimingComponent },
  { path: "operation/assign_for_routine_check", component: AssignRoutineCheckComponent },
  { path: "operation/routine_check", component: RoutineCheckComponent },
  { path: "operation/assign_to_change_map_info", component: AssignChangeMapInfoComponent },
  { path: "operation/change_map_info", component: ChangeMapInfoComponent },
  { path: "operation/assign_for_review_on_map", component: AssignReviewMapComponent },
  { path: "operation/review_on_map", component: ReviewMapComponent }
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
    CommonModule
  ]
})
export class OperationModule { }
