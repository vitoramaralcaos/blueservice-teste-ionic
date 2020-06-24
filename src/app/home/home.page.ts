import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	items: any[] = [];
	status_return: any;
	
  constructor(
  	private route: ActivatedRoute, 
	private router: Router,
  	public dataService: DataService,
  	public toastCtrl: ToastController
  	) {}
  
  
  ionViewDidEnter() {
	  this.getAllNotas();
	  
	  this.status_return = this.route.snapshot.paramMap.get("status");
	  this.status(this.status_return);
  }
  
  
  getAllNotas(){
	  this.dataService.getAll()
      .then((result: any[]) => {
        this.items = result;
      });
  }
  
  
  AdicionarNota(){
  	
   this.router.navigate(['/adicionar-notas']);

  }
  ExibirNota(id){

   this.router.navigate(['/visualizar-nota', {id_nota: id}]);

  }
  
  
//******************************************************
  status(status){
	  if(status == "gravacao_ok"){
		  	this.toastCtrl.create({
			    message: "Anotação salva com sucesso!",
			    duration: 3000,
			    color: 'dark'
			}).then((obj) => {
				 obj.present(); 
			});
	  }
  }
  

  

}