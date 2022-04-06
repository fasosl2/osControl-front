import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FuncionarioService } from "../funcionario.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-func-add",
  templateUrl: "./func-add.component.html",
  styleUrls: ["./func-add.component.css"]
})
export class FuncAddComponent implements OnInit {
  adicionarFuncionarioForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {
    this.createForm();
  }

  //Método que trata as validações do Form que criará um novo Funcionário
  createForm() {
    this.adicionarFuncionarioForm = this.formBuilder.group({
      nomeFuncionario: ["", Validators.required],
      cargo: ["", Validators.required],
      cpf: ["", Validators.required]
    });
  }

  /**
   * Método responsável por adicionar um novo 'Funcionário com ação do btn '+ Funcionar':
   */
  adicionarFuncionario(nomeFuncionario, cargo, cpf) {
    this.funcionarioService.adicionarFuncionario(nomeFuncionario, cargo, cpf);

    //Botão OK + carregar lista
    Swal.fire("Criado!", "Técnico criado com sucesso!", "success").then(
      result => {
        this.router.navigate([`/funcionario`]);
      }
    );

  }

  ngOnInit() {}
}
