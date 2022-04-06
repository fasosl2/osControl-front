import { Component, OnInit } from "@angular/core";
import { FuncionarioService } from "../funcionario.service";
import Swal from "sweetalert2";
import Funcionario from "../Funcionario";
import { Router } from "@angular/router";

@Component({
  selector: "app-func-get",
  templateUrl: "./func-get.component.html",
  styleUrls: ["./func-get.component.css"]
})
export class FuncGetComponent implements OnInit {
  funcionarios: Funcionario[];

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((data: Funcionario[]) => {
        this.funcionarios = data;
      });
  }

  //------------Método Responsável Por excluir funcionário-----------
  excluirFuncionario(funcionarioId: String) {
    //Botão de Confirmar exclusão
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
        this.funcionarioService.excluirFuncionario(funcionarioId);

        //Botão OK + recarregar
        Swal.fire("Excluído!", "Funcionário Excluído!", "success").then(
          result => {
            //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            location.reload();
            this.router.navigate(['/funcionario']);
          }
        );
      }
    });
  }
}
