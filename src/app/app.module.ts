import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ClientiComponent } from './components/clienti/clienti.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

import { ServiciiComponent } from './components/servicii/servicii.component';
import { ServiciuComponent } from './components/serviciu/serviciu.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';

import { MesteriComponent } from './components/mesteri/mesteri.component';
import { MesterulComponent } from './components/mesterul/mesterul.component';
import { AddMesterComponent } from './components/add-mester/add-mester.component';
import { EditMesterComponent } from './components/edit-mester/edit-mester.component';
import { MesterDetailsComponent } from './components/mester-details/mester-details.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientService } from './services/client.service';
import { ServiceService } from './services/service.service';
import { MesterService } from './services/mester.service';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,

    ClientiComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,

    ServiciiComponent,
    ServiciuComponent,
    AddServiceComponent,
    EditServiceComponent,
    ServiceDetailsComponent,

    MesteriComponent,
    MesterulComponent,
    AddMesterComponent,
    EditMesterComponent,
    MesterDetailsComponent,

    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [ClientService, ServiceService, MesterService, AuthService, SettingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
