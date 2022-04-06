import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router} from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  adicionarUserForm: FormGroup;
  TipoArray: any = [
    "Técnico",
    "Vendedor",
    "Administrativo",
    "Master"
  ];
  BaseArray: any = ["Pernambuco", "Ceará", "Bahia", "Alagoas"];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  //Método que trata as validações do Form que criará um novo Funcionário
  createForm() {
    this.adicionarUserForm = this.formBuilder.group({
      nome: ["", Validators.required],
      email: ["", Validators.required],
      tipo: ["", Validators.required],
      baseOp: ["", Validators.required],
      senha: ["", Validators.required]
    });
  }

  /**
   * Método responsável por adicionar um novo 'User' com ação do btn '+ User':
   */
  adicionarUser(email, nome, tipo, baseOp, senha) {
    this.userService.adicionarUser(email, nome, tipo, baseOp, senha);
  
        //Botão OK + carregar lista
        Swal.fire("Criado!", "Usuário criado com sucesso!", "success").then(
          result => {
            this.router.navigate([`/user`]);
          }
        );
  
  }

  ngOnInit() {}
}
