import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import { FooterComponent } from './home/footer/footer.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MypatientsComponent } from './mypatients/mypatients.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './user/login/login.component';
import { SearchDoctorComponent } from './search-doctor/search-doctor.component';
import { BookingDoctorComponent } from './booking-doctor/booking-doctor.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderadminComponent } from './admin/headeradmin/headeradmin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminAppointmentsComponent } from './admin/admin-appointments/admin-appointments.component';
import { AdminSpecialitiesComponent } from './admin/admin-specialities/admin-specialities.component';
import { AdminDoctorsComponent } from './admin/admin-doctors/admin-doctors.component';
import { AdminPatientComponent } from './admin/admin-patient/admin-patient.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Websocket2Component } from './websocket2/websocket2.component';
import { MyApplicationsComponent } from './admin/my-applications/my-applications.component';
import { ApplicationsComponent } from './admin/applications/applications.component';
import { PostsComponent } from './admin/posts/posts.component';
import { DoctorBookingComponent } from './doctor-booking/doctor-booking.component';
import {NotificationService} from './Services/notificationService';
import { CallvideoComponent } from './callvideo/callvideo.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { FillDoctorNearMeComponent } from './fill-doctor-near-me/fill-doctor-near-me.component';
import { FillNannyNearMeComponent } from './fill-nanny-near-me/fill-nanny-near-me.component';
import { RegisterComponent } from './user/register/register.component';
import {ChatService} from "./Services/chatService";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    AppointmentsComponent,
    MypatientsComponent,
    ReviewComponent,
    LoginComponent,
    SearchDoctorComponent,
    BookingDoctorComponent,
    DoctorDashboardComponent,
    InvoicesComponent,
    AdminComponent,
    HeaderadminComponent,
    SidebarComponent,
    AdminAppointmentsComponent,
    AdminSpecialitiesComponent,
    AdminDoctorsComponent,
    AdminPatientComponent,
    AdminDashboardComponent,
    Websocket2Component,
    MyApplicationsComponent,
    ApplicationsComponent,
    PostsComponent,
    DoctorBookingComponent,
    CallvideoComponent,
    FillDoctorNearMeComponent,
    FillNannyNearMeComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [NotificationService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
