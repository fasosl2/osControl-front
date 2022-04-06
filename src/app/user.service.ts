import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings }from './config/appSettings';

@Injectable({
  providedIn: "root",
})
export class UserService {

  // ==> Uri da api (Back-End)
  uri = AppSettings.api;

  constructor(private http: HttpClient) {}

  // Método responsável por adicionar um novo 'User' btn 'Adicionar User':
  adicionarUser(email, nome, tipo, baseOp, senha) {
    const objUser = {
      email,
      nome,
      tipo,
      baseOp,
      senha,
    };

    // ==> (POST - URL no Back-End:): http://localhost:8000/api/users
    this.http
      .post(`${this.uri}/users`, objUser)
      .subscribe((res) => console.log("Feito"));
  }

  //Método responsável por selecionar todos os 'Users'
  getUsers() {
    // ==> (GET - Url no Back-End): http://localhost:8000/api/users
    return this.http.get(`${this.uri}/users`);
  }

  //Método responsável por excluir user
  excluirUser(userId) {
    console.log(`${this.uri}/users/${userId}`);
    this.http.delete(`${this.uri}/users/${userId}`).subscribe();
  }

  //Método responsável por editar user
  editarUser(userId, email, nome, tipo, baseOp, senha) {
    const objUser = {
      email,
      nome,
      tipo,
      baseOp,
      senha,
    };
    // ==> (POST - URL no Back-End:): http://localhost:8000/api/users
    this.http
      .put(`${this.uri}/users/${userId}`, objUser)
      .subscribe((res) => console.log("Feito"));
    console.log(`${userId}`);
  }

  getUser(userId) {
    return this.http.get(`${this.uri}/users/${userId}`);
  }

  loginUser(email, senha) {
    return this.http.get(`${this.uri}/users/login/${email}/${senha}`);
  }

  authUserToken(token) {
    var headerToken = new HttpHeaders().set("x-access-token", token);
    const httpOptions = { headers: headerToken };
    return this.http.get(`${this.uri}/auth`,httpOptions);
  }

  logoutUser(){
    localStorage.clear();
    return this.http.get(`${this.uri}/logout`);
  }
}
