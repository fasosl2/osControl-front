import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router} from "@angular/router";
import { ClienteService } from "../cliente.service";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.css"]
})
export class ClientAddComponent implements OnInit {
  adicionarClienteForm: FormGroup;
  EstadoArray: any = [
    "Acre (AC)",
    "Alagoas (AL)",
    "Amapá (AP)",
    "Amazonas (AM)",
    "Bahia (BA)",
    "Ceará (CE)",
    "Distrito Federal (DF)",
    "Espírito Santo (ES)",
    "Goiás (GO)",
    "Maranhão (MA)",
    "Mato Grosso (MT)",
    "Mato Grosso do Sul (MS)",
    "Minas Gerais (MG)",
    "Pará (PA)",
    "Paraíba (PB)",
    "Paraná (PR)",
    "Pernambuco (PE)",
    "Piauí (PI)",
    "Rio de Janeiro (RJ)",
    "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)",
    "Rondônia (RO)",
    "Roraima (RR)",
    "Santa Catarina (SC)",
    "São Paulo (SP)",
    "Sergipe (SE)",
    "Tocantins (TO)"
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.createForm();
  }

  //Método que trata as validações do Form que criará um novo Funcionário
  createForm() {
    this.adicionarClienteForm = this.formBuilder.group({
      nomeCliente: ["", Validators.required],
      estado: ["", Validators.required],
      cnpj: ["", Validators.required]
    });
  }

  /**
   * Método responsável por adicionar um novo 'Cliente' com ação do btn '+ Cliente':
   */
  adicionarCliente(nomeCliente, estado, cnpj) {
    this.clienteService.adicionarCliente(nomeCliente, estado, cnpj);
  
        //Botão OK + carregar lista
        Swal.fire("Criado!", "Cliente criado com sucesso!", "success").then(
          result => {
            this.router.navigate([`/cliente`]);
          }
        );
  
  }

  ngOnInit() {}
}
