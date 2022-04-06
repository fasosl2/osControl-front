import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSettings }from './config/appSettings';
@Injectable({
  providedIn: "root"
})
export class FuncionarioService {

  // ==> Uri da api (Back-End)
  uri = AppSettings.api;

  constructor(private http: HttpClient) {}

  // Método responsável por adicionar um novo 'Funcionário' btn 'Adicionar Funcionário':
  adicionarFuncionario(nomeFuncionario, cargo, cpf) {
    const objFuncionario = {
      nomeFuncionario,
      cargo,
      cpf
    };
    console.log(objFuncionario);

    // ==> (POST - URL no Back-End:): http://localhost:8000/api/funcionarios
    this.http
      .post(`${this.uri}/funcionarios`, objFuncionario)
      .subscribe(res => console.log("Feito"));
  }

  //Método responsável por selecionar todos os 'Funcionários'

  getFuncionarios() {
    // ==> (GET - Url no Back-End): http://localhost:8000/api/funcionarios
    return this.http.get(`${this.uri}/funcionarios`);
  }

  //Método responsável por excluir funcionario
  excluirFuncionario(funcionarioId) {
    this.http.delete(`${this.uri}/funcionarios/${funcionarioId}`).subscribe();
  }

  //Método responsável por editar funcionario
  editarFuncionario(funcionarioId, nomeFuncionario, cargo, cpf) {
    const objFuncionario = {
      nomeFuncionario,
      cargo,
      cpf
    };
    // ==> (POST - URL no Back-End:): http://localhost:8000/api/funcionarios
    this.http
      .put(`${this.uri}/funcionarios/${funcionarioId}`, objFuncionario)
      .subscribe(res => console.log("Feito"));
    console.log(`${funcionarioId}`);
  }

  getFuncionario(funcionarioId) {
    return this.http.get(`${this.uri}/funcionarios/${funcionarioId}`);
  }
}
