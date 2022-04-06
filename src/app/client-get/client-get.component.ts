import { Component, OnInit } from "@angular/core";
import { ClienteService } from "../cliente.service";
import Swal from "sweetalert2";
import Cliente from "../Cliente";
import { Router } from "@angular/router";

@Component({
  selector: "app-client-get",
  templateUrl: "./client-get.component.html",
  styleUrls: ["./client-get.component.css"]
})
export class ClientGetComponent implements OnInit {
  clientes: Cliente[];

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  //------------Método Responsável Por excluir cliente-----------
  excluirCliente(clienteId: String) {
    
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
        this.clienteService.excluirCliente(clienteId);

        Swal.fire("Excluído!", "cliente Excluído!", "success").then(result => {
          //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          location.reload();
          this.router.navigate(["/cliente"]);
        });
      }
    });
  }
}
