import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { ClienteService } from "../cliente.service";
import Cliente from '../Cliente';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  cliente: Cliente;
  clienteId: any = this.route.snapshot.paramMap.get("id");
  editarClienteForm: FormGroup;
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.createForm();
  }

  //Método que trata as validações do Form que irá alterar o Cliente
  createForm() {
    this.editarClienteForm = this.formBuilder.group({
      nomeCliente: ["", Validators.required],
      estado: ["", Validators.required],
      cnpj: ["", Validators.required]
    });
  }

  /**
   * Método responsável por alterar o 'Cliente com ação do btn '+ Funcionar':
   */
  editarCliente(nomeCliente, estado, cnpj){
    this.clienteService.editarCliente(this.clienteId,nomeCliente, estado, cnpj);
  
    //Botão OK + recarregar
    Swal.fire("Editado!", "Cliente alterado com sucesso!", "success").then(
      result => {
        this.router.navigate([`/cliente`]);
      }
    );
    
  }

  ngOnInit() {
    
    this.clienteService
      .getCliente(this.clienteId)
      .subscribe((data: Cliente) => {
        this.cliente = data;
        this.editarClienteForm.get('nomeCliente').setValue(this.cliente.nomeCliente);
        this.editarClienteForm.get('estado').setValue(this.cliente.estado);
        this.editarClienteForm.get('cnpj').setValue(this.cliente.cnpj);
      });
  }


}
