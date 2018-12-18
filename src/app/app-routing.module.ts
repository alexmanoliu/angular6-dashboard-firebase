import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { ServiciiComponent } from './components/servicii/servicii.component';
import { MesteriComponent } from './components/mesteri/mesteri.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

import { AddMesterComponent } from './components/add-mester/add-mester.component';
import { EditMesterComponent } from './components/edit-mester/edit-mester.component';

import { AddServiceComponent } from './components/add-service/add-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';

import { SettingsComponent } from './components/settings/settings.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { MesterDetailsComponent } from './components/mester-details/mester-details.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
  { path: 'client/add', component: AddClientComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'clienti', component: ClientiComponent, canActivate: [AuthGuard] },
  { path: 'service/add', component: AddServiceComponent, canActivate: [AuthGuard] },
  { path: 'service/edit/:id', component: EditServiceComponent, canActivate: [AuthGuard] },
  { path: 'service/:id', component: ServiceDetailsComponent, canActivate: [AuthGuard] },
  { path: 'servicii', component: ServiciiComponent, canActivate: [AuthGuard] },
  { path: 'mester/add', component: AddMesterComponent, canActivate: [AuthGuard] },
  { path: 'mester/edit/:id', component: EditMesterComponent, canActivate: [AuthGuard] },
  { path: 'mester/:id', component: MesterDetailsComponent, canActivate: [AuthGuard] },
  { path: 'mesteri', component: MesteriComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule {}
