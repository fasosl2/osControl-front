import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSettings }from './config/appSettings';

@Injectable({
  providedIn: "root"
})
export class OsService {

  // ==> Uri da api (Back-End)
  uri = AppSettings.api;

  constructor(private http: HttpClient) {}

  //Método responsável por 'adicionar nova OS' btn 'Adicionar OS':
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
    const objOS = {
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
    };

    console.log(objOS);

    // ==> (POST - URL no Back-End:): http://localhost:8000/api/oss
    this.http
      .post(`${this.uri}/oss`, objOS)
      .subscribe(res => console.log("Feito"));
  }

  //Método responsável por selecionar todas as 'OS´s'
  getOSs() {
    // ==> (GET - Url no Back-End): http://localhost:8000/api/oss
    return this.http.get(`${this.uri}/oss`);
  }

  //Método responsável por excluir os
  excluirOS(osId) {
    console.log(`${this.uri}/oss/${osId}`);
    this.http.delete(`${this.uri}/oss/${osId}`).subscribe();
  }

  //Método responsável por editar OS
  editarOS(
    osId,
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
    const objOS = {
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
    };
    // ==> (POST - URL no Back-End:): http://localhost:8000/api/oss
    this.http
      .put(`${this.uri}/oss/${osId}`, objOS)
      .subscribe(res => console.log("Feito"));
    console.log(`${osId}`);
  }

  getOS(osId) {
    return this.http.get(`${this.uri}/oss/${osId}`);
  }
}
