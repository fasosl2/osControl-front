import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import Swal from "sweetalert2";
import User from "../User";
import { Router } from "@angular/router";
import { AppSettings } from '../config/appSettings';

@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {

  users: User[];
  tipoUsuario = AppSettings.tipoUsuario;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  //------------Método Responsável Por excluir user-----------
  excluirUser(userId: String) {
    
    Swal.fire({
      title: "Tem Certeza?",
      text: "Essa operação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!"
    }).then(result => {
      if (result.value) {
        //Enviando o ID para exclusão
        this.userService.excluirUser(userId);

        Swal.fire("Excluído!", "Usoário Excluído!", "success").then(result => {
          //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          location.reload();
          this.router.navigate(["/user"]);
        });
      }
    });
  }
}
