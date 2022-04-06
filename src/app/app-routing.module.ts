import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncAddComponent } from './func-add/func-add.component';
import { FuncEditComponent } from './func-edit/func-edit.component';
import { FuncGetComponent } from './func-get/func-get.component';
import { OsAddComponent } from './os-add/os-add.component';
import { OsEditComponent } from './os-edit/os-edit.component';
import { OsGetComponent } from './os-get/os-get.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientGetComponent } from './client-get/client-get.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGetComponent } from './user-get/user-get.component';
import { OsPanelComponent } from './os-panel/os-panel.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'funcionario',
    component: FuncGetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'funcionario/create',
    component: FuncAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'funcionario/:id',
    component: FuncEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'os',
    component: OsGetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'os/create',
    component: OsAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'os/:id',
    component: OsEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cliente',
    component: ClientGetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cliente/create',
    component: ClientAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cliente/:id',
    component: ClientEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    component: UserGetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/create',
    component: UserAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: OsPanelComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
