import { Component, OnInit } from "@angular/core";
import { OsService } from "../os.service";
import Swal from "sweetalert2";
import OS from "../OS";
import { Router } from "@angular/router";

@Component({
  selector: "app-os-get",
  templateUrl: "./os-get.component.html",
  styleUrls: ["./os-get.component.css"],
})
export class OsGetComponent implements OnInit {
  oss: OS[];

  constructor(private router: Router, private osService: OsService) {}

  ngOnInit() {
    this.osService.getOSs().subscribe((data: OS[]) => {
      this.oss = data;
      for (let index = 0; index < this.oss.length; index++) {
        this.oss[index].dtEntrada =
          this.oss[index].dtEntrada.substring(8, 10) +
          "/" +
          this.oss[index].dtEntrada.substring(5, 7) +
          "/" +
          this.oss[index].dtEntrada.substring(0, 4);

          this.oss[index].dtDevolucao =
          this.oss[index].dtDevolucao.substring(8, 10) +
          "/" +
          this.oss[index].dtDevolucao.substring(5, 7) +
          "/" +
          this.oss[index].dtDevolucao.substring(0, 4);

          
      }
    });
  }

  //------------Método Responsável Por excluir os-----------
  excluirOS(osId: String) {
    Swal.fire({
      title: "Tem Certeza?",
      text: "Essa operação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Excluir!",
    }).then((result) => {
      if (result.value) {
        //Enviando o ID para exclusão
        this.osService.excluirOS(osId);

        Swal.fire("Excluída!", "OS Excluída!", "success").then((result) => {
          //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //this.router.navigate(["/os"]);
          location.reload();
        });
      }
    });
  }
}
