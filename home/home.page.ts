import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cepInfo: any;

  constructor(private http: HttpClient, public toast: ToastController) {}

  cep: String;

  getCEP() {
    this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`)
    .pipe(catchError((e) => this.exibirErro(e)))
    .subscribe((res) => {this.cepInfo = res});
  }

  limpar() {
    this.cep = '';
    this.cepInfo = '';
  }

  async exibirErro(e) {
    const toast = await this.toast.create({
      message: 'Erro consultando a API: ' + e.status + ': ' + e.message,
      duration: 5000,
      color: 'danger',
      position: 'middle'
    });
    console.log(e);
    toast.present();
    return null;
  }
}
