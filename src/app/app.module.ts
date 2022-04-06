import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FuncAddComponent } from "./func-add/func-add.component";
import { FuncEditComponent } from "./func-edit/func-edit.component";
import { FuncGetComponent } from "./func-get/func-get.component";
import { OsAddComponent } from "./os-add/os-add.component";
import { OsEditComponent } from "./os-edit/os-edit.component";
import { OsGetComponent } from "./os-get/os-get.component";
import { ClientAddComponent } from "./client-add/client-add.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientGetComponent } from "./client-get/client-get.component";
import { FuncionarioService } from "./funcionario.service";
import { ClienteService } from "./cliente.service";
import { OsService } from "./os.service";
import { OsPanelComponent } from "./os-panel/os-panel.component";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { UserAddComponent } from './user-add/user-add.component';
import { UserGetComponent } from './user-get/user-get.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserService } from './user.service';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    FuncAddComponent,
    FuncEditComponent,
    FuncGetComponent,
    OsAddComponent,
    OsEditComponent,
    OsGetComponent,
    ClientAddComponent,
    ClientEditComponent,
    ClientGetComponent,
    OsPanelComponent,
    UserAddComponent,
    UserGetComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlimLoadingBarModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers: [FuncionarioService, ClienteService, OsService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
