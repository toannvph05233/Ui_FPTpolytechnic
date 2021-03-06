import {AdminPatientComponent} from './admin/admin-patient/admin-patient.component';
import {AdminSpecialitiesComponent} from './admin/admin-specialities/admin-specialities.component';
import {AdminComponent} from './admin/admin.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {BookingDoctorComponent} from './booking-doctor/booking-doctor.component';
import {SearchDoctorComponent} from './search-doctor/search-doctor.component';
import {LoginComponent} from './user/login/login.component';
import {ReviewComponent} from './review/review.component';
import {MypatientsComponent} from './mypatients/mypatients.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminDoctorsComponent} from './admin/admin-doctors/admin-doctors.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './helper/auth-guard';
import {Websocket2Component} from './websocket2/websocket2.component';
import {MyApplicationsComponent} from './admin/my-applications/my-applications.component';
import {ApplicationsComponent} from './admin/applications/applications.component';
import {PostsComponent} from './admin/posts/posts.component';
import {DoctorBookingComponent} from './doctor-booking/doctor-booking.component';
import {CallvideoComponent} from './callvideo/callvideo.component';
import {FillDoctorNearMeComponent} from './fill-doctor-near-me/fill-doctor-near-me.component';
import {FillNannyNearMeComponent} from './fill-nanny-near-me/fill-nanny-near-me.component';
import {RegisterComponent} from "./user/register/register.component";

const routes: Routes = [
  {path: 'index', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'my-patients', component: MypatientsComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'review-doctor', component: ReviewComponent},
  {path: 'call-video', component: CallvideoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'search-doctor', component: SearchDoctorComponent},
  {path: 'doctor-booking', component: DoctorBookingComponent},
  {path: 'booking-doctor', component: BookingDoctorComponent},
  {path: 'doctor-dashboard', component: DoctorDashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'websocket', component: Websocket2Component},
  {path: 'fill-doctor-near-me', component: FillDoctorNearMeComponent},
  {path: 'fill-nanny-near-me', component: FillNannyNearMeComponent},
  {path: 'invoices', component: InvoicesComponent},
  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: AdminDashboardComponent
      },
      {
        path: 'myApplications', component: MyApplicationsComponent
      }, {
        path: 'specialties', component: AdminSpecialitiesComponent
      },
      {
        path: 'doctors', component: AdminDoctorsComponent
      },
      {
        path: 'applications', component: ApplicationsComponent
      },
      {
        path: 'posts', component: PostsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
