import { AdminPatientComponent } from './admin/admin-patient/admin-patient.component';
import { AdminSpecialitiesComponent } from './admin/admin-specialities/admin-specialities.component';
import { AdminAppointmentsComponent } from './admin/admin-appointments/admin-appointments.component';
import { AdminComponent } from './admin/admin.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { BookingDoctorComponent } from './booking-doctor/booking-doctor.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { LoginComponent } from './user/login/login.component';
import { ReviewComponent } from './review/review.component';
import { MypatientsComponent } from './mypatients/mypatients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDoctorsComponent } from './admin/admin-doctors/admin-doctors.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './helper/auth-guard';

const routes: Routes = [
  { path: 'index', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'my-patients', component: MypatientsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'review-doctor', component: ReviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search-doctor', component: SearchDoctorComponent },
  { path: 'booking-doctor', component: BookingDoctorComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'admin', component: AdminComponent , canActivate:[AuthGuard],
    children : [
      {
        path : 'dashboard' , component: AdminDashboardComponent
      },
        {
          path : 'appointments' , component: AdminAppointmentsComponent
        }, {
          path : 'specialties' , component: AdminSpecialitiesComponent
        },
        {
          path : 'doctors' , component: AdminDoctorsComponent
        },
        {
          path : 'patient' , component: AdminPatientComponent
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
export class AppRoutingModule { }
