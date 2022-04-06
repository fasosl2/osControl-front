import { Component } from "@angular/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Event,
  Router,
} from "@angular/router";
import { UserService } from "./user.service";
import User from "./User";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { AppSettings }from './config/appSettings';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "front";
  loginForm: FormGroup;
  user: User;
  autenticado: String;
  tipoUsuario = AppSettings.tipoUsuario;
  
  constructor(
    private loadingBarService: SlimLoadingBarService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this.createForm();
    this.authUser();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      senha: ["", Validators.required],
    });
  }

  /**
   * Método responsável por fazer login
   */

  loginUser(email, senha) {
    this.userService.loginUser(email, senha).subscribe(
      (data: any) => {
        localStorage.setItem("x-access-token", data.token);
        this.user = data.user;

        if (this.user) {
          localStorage.setItem("user-type", this.user.tipo);
          localStorage.setItem("user-baseOp", this.user.baseOp);
          //Botão OK + recarregar
          Swal.fire(
            "Bem-Vindo, " + this.user.nome,
            "Tipo de Usuário: " + this.user.tipo,
            "success"
          ).then((result) => {
            location.reload();
          });
        }
      },
      (err: HttpErrorResponse) => {
        Swal.fire(
          "Falha!",
          "Verifique email e senha!",
          "warning"
        );
      }
    );
  }

  authUser() {
    const localToken = localStorage.getItem("x-access-token");
    this.userService.authUserToken(localToken).subscribe((data: any) => {
      this.autenticado = data.message;
    });
  }

  logoutUser() {
    this.userService.logoutUser().subscribe((data: any) => {
      location.href = AppSettings.front;
    });
  }
  /**
   * Método responsável por lidar com as ações do 'Loading Bar progress' da Navegação
   */
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBarService.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBarService.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBarService.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBarService.stop();
    }
  }
}
