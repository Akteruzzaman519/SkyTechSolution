import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ReportMailHistoryComponent } from './report-mail-history/report-mail-history.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AssignToPreferredModuleComponent } from './assign-to-preferred-module/assign-to-preferred-module.component';
import { ToManageUserComponent } from './to-manage-user/to-manage-user.component';
import { LayeredRoutineCheckComponent } from './layered-routine-check/layered-routine-check.component';

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
  { path: "review_on_map", component: ReviewMapComponent, title: "Review On Map" },
  { path: "report/mail-history", component: ReportMailHistoryComponent, title: "Mail History" },
  { path: "assign_to_preferred_module", component: AssignToPreferredModuleComponent, title: "Assign To Preferred Module" },
  { path: "manage-general-user", component: ToManageUserComponent, title: "Manage Users" },
  { path: "layered_routine_check", component: LayeredRoutineCheckComponent, title: "Layered Routine Task" },
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
    ReviewMapComponent,
    ReportMailHistoryComponent,
    PaginationComponent,
    AssignToPreferredModuleComponent,
    ToManageUserComponent,
    LayeredRoutineCheckComponent
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
  schemas: [NO_ERRORS_SCHEMA], // Use NO_ERRORS_SCHEMA here
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
