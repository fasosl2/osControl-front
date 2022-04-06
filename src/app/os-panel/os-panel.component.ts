import { Component, OnInit } from "@angular/core";
import { OsService } from "../os.service";
import OS from "../OS";
import { Router } from "@angular/router";
import { Observable, interval, Subscription } from "rxjs";

@Component({
  selector: "app-os-panel",
  templateUrl: "./os-panel.component.html",
  styleUrls: ["./os-panel.component.css"],
})
export class OsPanelComponent implements OnInit {
  private updateSubscription: Subscription;
  oss: OS[];
  ossGrupo: OS[] = [];
  contador = 0;
  tipoUsuario = localStorage.getItem("user-type");

  constructor(private router: Router, private osService: OsService) {}

  ngOnInit() {
    const localBaseOp = localStorage.getItem("user-baseOp");
    this.loadData(this.tipoUsuario,localBaseOp);

    this.updateSubscription = interval(5000).subscribe((val) => {
      this.loadData(this.tipoUsuario,localBaseOp);
    });
  }
  loadData(localType: string, localBaseOp: string) {
    this.osService.getOSs().subscribe((data: OS[]) => {
      this.oss = data;

      if (localType != "Master") {
        this.oss = this.oss.filter(function (el) {
          return el.baseOp == localBaseOp;
        });
      }

      for (let index = 0; index < this.oss.length; index++) {
        this.oss[index].dtEntrada =
          this.oss[index].dtEntrada.substring(8, 10) +
          "/" +
          this.oss[index].dtEntrada.substring(5, 7) +
          "/" +
          this.oss[index].dtEntrada.substring(0, 4);

        this.oss[index].dtPrevOrcamento =
          this.oss[index].dtPrevOrcamento.substring(8, 10) +
          "/" +
          this.oss[index].dtPrevOrcamento.substring(5, 7) +
          "/" +
          this.oss[index].dtPrevOrcamento.substring(0, 4);

        this.oss[index].dtConcOrcamento =
          this.oss[index].dtConcOrcamento.substring(8, 10) +
          "/" +
          this.oss[index].dtConcOrcamento.substring(5, 7) +
          "/" +
          this.oss[index].dtConcOrcamento.substring(0, 4);

        this.oss[index].dtAprovacao =
          this.oss[index].dtAprovacao.substring(8, 10) +
          "/" +
          this.oss[index].dtAprovacao.substring(5, 7) +
          "/" +
          this.oss[index].dtAprovacao.substring(0, 4);

        this.oss[index].dtPrevConclusao =
          this.oss[index].dtPrevConclusao.substring(8, 10) +
          "/" +
          this.oss[index].dtPrevConclusao.substring(5, 7) +
          "/" +
          this.oss[index].dtPrevConclusao.substring(0, 4);

        this.oss[index].dtDevolucao =
          this.oss[index].dtDevolucao.substring(8, 10) +
          "/" +
          this.oss[index].dtDevolucao.substring(5, 7) +
          "/" +
          this.oss[index].dtDevolucao.substring(0, 4);
      }
      this.oss.sort(function (a, b) {
        if (a.prioridade !== b.prioridade) {
          if (a.prioridade == "Alta") {
            return -1;
          }
          if (b.prioridade == "Alta") {
            return 1;
          }
          if (a.prioridade == "Média") {
            return -1;
          }
        } else {
          if (a.codOS.length < b.codOS.length) {
            return -1;
          }
          if (a.codOS.length > b.codOS.length) {
            return 1;
          }
          if (a.codOS < b.codOS) {
            return -1;
          }
          if (a.codOS > b.codOS) {
            return 1;
          }
        }

        return 0;
      });

      this.ossGrupo = [];
      for (
        let index = this.contador;
        index < this.contador + 10 && index < this.oss.length;
        index++
      ) {
        this.ossGrupo.push(this.oss[index]);

        console.log("Indice: ", index - this.contador);
      }

      if (this.contador < this.oss.length - 10) {
        this.contador += 10;
      } else {
        this.contador = 0;
      }
    });
  }
}
