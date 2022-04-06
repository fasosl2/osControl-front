import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSettings }from './config/appSettings';

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  // ==> Uri da api (Back-End)
  uri = AppSettings.api;

  constructor(private http: HttpClient) {}

  // Método responsável por adicionar um novo 'Cliente' btn 'Adicionar Cliente':
  adicionarCliente(nomeCliente, estado, cnpj) {
    const objCliente = {
      nomeCliente,
      estado,
      cnpj
    };
    console.log(objCliente);

    // ==> (POST - URL no Back-End:): http://localhost:8000/api/clientes
    this.http
      .post(`${this.uri}/clientes`, objCliente)
      .subscribe(res => console.log("Feito"));
  }

  //Método responsável por selecionar todos os 'Clientes'
  getClientes() {
    // ==> (GET - Url no Back-End): http://localhost:8000/api/clientes
    return this.http.get(`${this.uri}/clientes`);
  }

  //Método responsável por excluir cliente
  excluirCliente(clienteId) {
    console.log(`${this.uri}/clientes/${clienteId}`);
    this.http.delete(`${this.uri}/clientes/${clienteId}`).subscribe();
  }

  //Método responsável por editar cliente
  editarCliente(clienteId, nomeCliente, estado, cnpj) {
    const objCliente = {
      nomeCliente,
      estado,
      cnpj
    };
    // ==> (POST - URL no Back-End:): http://localhost:8000/api/clientes
    this.http
      .put(`${this.uri}/clientes/${clienteId}`, objCliente)
      .subscribe(res => console.log("Feito"));
    console.log(`${clienteId}`);
  }

  getCliente(clienteId) {
    return this.http.get(`${this.uri}/clientes/${clienteId}`);
  }
}
