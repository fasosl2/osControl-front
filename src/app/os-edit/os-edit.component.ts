import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { OsService } from "../os.service";
import { FuncionarioService } from "../funcionario.service";
import { ClienteService } from "../cliente.service";
import OS from '../OS';
import Funcionario from '../Funcionario';
import Cliente from '../Cliente';

@Component({
  selector: 'app-os-edit',
  templateUrl: './os-edit.component.html',
  styleUrls: ['./os-edit.component.css']
})
export class OsEditComponent implements OnInit {
  os: OS;
  osId: any = this.route.snapshot.paramMap.get("id");
  editarOSForm: FormGroup;
  BaseArray: any = ["Pernambuco", "Ceará", "Bahia", "Alagoas"];
  TecnicoArray: any = [];
  ClienteArray: any[];
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
    private route: ActivatedRoute,
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

  //Método que trata as validações do Form que criará um novo OS
  createForm() {
    this.editarOSForm = this.formBuilder.group({
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
   * Método responsável por editar 'OS com ação do btn '+ OS':
   */
  editarOS(
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
  ){
    
    this.osService.editarOS(
      this.osId,
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
  
    //Botão OK + recarregar
    Swal.fire("Alterado!", "OS alterada com sucesso!", "success").then(
      result => {
        this.router.navigate([`/os`]);
      }
    );
    
  }

  ngOnInit() {
    
    this.osService
      .getOS(this.osId)
      .subscribe((data: OS) => {
        this.os = data;
        this.editarOSForm.get('codOS').setValue(this.os.codOS);
        this.editarOSForm.get('status').setValue(this.os.status);
        this.editarOSForm.get('clienteOS').setValue(this.os.clienteOS);
        this.editarOSForm.get('baseOp').setValue(this.os.baseOp);
        this.editarOSForm.get('tecnicoOS').setValue(this.os.tecnicoOS);
        this.editarOSForm.get('dtEntrada').setValue(this.os.dtEntrada);
        this.editarOSForm.get('dtPrevOrcamento').setValue(this.os.dtPrevOrcamento);
        this.editarOSForm.get('dtConcOrcamento').setValue(this.os.dtConcOrcamento);
        this.editarOSForm.get('dtAprovacao').setValue(this.os.dtAprovacao);
        this.editarOSForm.get('dtPrevConclusao').setValue(this.os.dtPrevConclusao);
        this.editarOSForm.get('dtDevolucao').setValue(this.os.dtDevolucao);
        this.editarOSForm.get('prioridade').setValue(this.os.prioridade);
      });
  }


}
