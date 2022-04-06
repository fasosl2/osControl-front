import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { FuncionarioService } from "../funcionario.service";
import Funcionario from '../Funcionario';

@Component({
  selector: 'app-func-edit',
  templateUrl: './func-edit.component.html',
  styleUrls: ['./func-edit.component.css']
})
export class FuncEditComponent implements OnInit {
  funcionario: Funcionario;
  funcId: any = this.route.snapshot.paramMap.get("id");
  editarFuncionarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {
    this.createForm();
  }

  //Método que trata as validações do Form que irá alterar o Funcionário
  createForm() {
    this.editarFuncionarioForm = this.formBuilder.group({
      nomeFuncionario: ["", Validators.required],
      cargo: ["", Validators.required],
      cpf: ["", Validators.required]
    });
  }

  /**
   * Método responsável por alterar o 'Funcionário com ação do btn '+ Funcionar':
   */
  editarFuncionario(nomeFuncionario, cargo, cpf){
    this.funcionarioService.editarFuncionario(this.funcId,nomeFuncionario, cargo, cpf);
  
    //Botão OK + recarregar
    Swal.fire("Editado!", "Funcionário alterado com sucesso!", "success").then(
      result => {
        this.router.navigate([`/funcionario`]);
      }
    );
    
  }

  ngOnInit() {
    
    this.funcionarioService
      .getFuncionario(this.funcId)
      .subscribe((data: Funcionario) => {
        this.funcionario = data;
        this.editarFuncionarioForm.get('nomeFuncionario').setValue(this.funcionario.nomeFuncionario);
        this.editarFuncionarioForm.get('cargo').setValue(this.funcionario.cargo);
        this.editarFuncionarioForm.get('cpf').setValue(this.funcionario.cpf);
      });
  }


}
