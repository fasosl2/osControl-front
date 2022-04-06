import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { OsService } from "../os.service";
import { FuncionarioService } from "../funcionario.service";
import OS from "../OS";
import Funcionario from "../Funcionario";
import { ClienteService } from "../cliente.service";
import Cliente from '../Cliente';

@Component({
  selector: "app-os-add",
  templateUrl: "./os-add.component.html",
  styleUrls: ["./os-add.component.css"]
})
//OsAddComponent
export class OsAddComponent implements OnInit {
  adicionarOSForm: FormGroup;
  BaseArray: any = ["Pernambuco", "Ceará", "Bahia", "Alagoas"];
  TecnicoArray: any = [];
  ClienteArray: any = [];
  StatusArray: any = [
    "Aguardando_Avaliação",
    "Em_Avaliação",
    "Aguardando_Aprovação",
    "Aprovado",
    "Aprovado_Executando",
    "Aprovado_Testes",
    "Aprovado_Pendencia",
    "Aguardando_Coleta"

  ];
  PrioridadeArray: any = [
    "Alta",
    "Média",
    "Baixa"
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private osService: OsService,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService
  ) {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((data: Funcionario[]) => {
        this.TecnicoArray = data;
      });
    this.clienteService
    .getClientes()
    .subscribe((data: Cliente[]) => {
      this.ClienteArray = data;
    });
    this.createForm();
  }

  //Método que trata as validações do Form que criará um novo Funcionário
  createForm() {
    this.adicionarOSForm = this.formBuilder.group({
      codOS: ["", Validators.required],
      status: ["", Validators.required],
      clienteOS: ["", Validators.required],
      baseOp: ["", Validators.required],
      tecnicoOS: ["", Validators.required],
      dtEntrada: ["", Validators.required],
      dtPrevOrcamento: [""],
      dtConcOrcamento: [""],
      dtAprovacao: [""],
      dtPrevConclusao: [""],
      dtDevolucao: [""],
      prioridade: [""]
    });
  }

  /**
   * Método responsável por adicionar um novo 'Cliente' com ação do btn '+ Cliente':
   */
  adicionarOS(
    codOS,
    status,
    clienteOS,
    baseOp,
    tecnicoOS,
    dtEntrada,
    dtPrevOrcamento,
    dtConcOrcamento,
    dtAprovacao,
    dtPrevConclusao,
    dtDevolucao,
    prioridade
  ) {
    this.osService.adicionarOS(
      codOS,
      status,
      clienteOS,
      baseOp,
      tecnicoOS,
      dtEntrada,
      dtPrevOrcamento,
      dtConcOrcamento,
      dtAprovacao,
      dtPrevConclusao,
      dtDevolucao,
      prioridade
    );

    //Botão OK + carregar lista
    Swal.fire("Criada!", "O.S. criada com sucesso!", "success").then(result => {
      this.router.navigate([`/os`]);
    });
  }

  ngOnInit() {}
}
