import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-adicionar-notas',
  templateUrl: './adicionar-notas.page.html',
  styleUrls: ['./adicionar-notas.page.scss'],
})
export class AdicionarNotasPage implements OnInit {

	conteudoNota = { titulo: '', descricao: '', localizacao: '' };
	imagem = "assets/icon_imagem.png";
	image_data: any;
	blobImage = null;
	status_img: any;
	img_path: any;
	items_http: any;
	btn_display = "";
	input_disabled = "false";
	
	
  constructor(
	public loadingCtrl: LoadingController,
	private http: HTTP,
	private geolocation: Geolocation,
	private file: File,
	private camera: Camera,
  	private router: Router,
  	public toastCtrl: ToastController,
  	public dataService: DataService,
  	private actionSheetCtrl: ActionSheetController
  	) { }

  ngOnInit() {
	  this.conteudoNota.titulo = ''
	  this.conteudoNota.descricao = ''
	  this.conteudoNota.localizacao = ''
  }
  
  	showImagem(){
	  	
	  	this.actionSheetCtrl.create({
			buttons: [
			    {
					text: "Imagem da Galeria",
			        icon: "images",
			        handler: () => {
			            this.showImagemPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
			        }
			    },
			    {
			        text: "Imagem da Câmera",
			        icon: "camera",
			        handler: () => {
			            this.showImagemPicture(this.camera.PictureSourceType.CAMERA);
			        }
			    },
			    {
			        text: "Cancelar",
			        icon: "close",
			        role: "destructive"
			    }
			]
			}).then((obj) => {
				 obj.present(); 
		});
  	}
  	showImagemPicture(sourceType) {
	  	this.MostrarLoader();
	    this.camera.getPicture({
	      quality: 30,
	      sourceType: sourceType,
	      destinationType: this.camera.DestinationType.DATA_URL,
	      //destinationType: this.camera.DestinationType.FILE_URI,
		  //encodingType: this.camera.EncodingType.JPEG,
	      correctOrientation: true,
	    }).then((data => {
			this.EsconderLoader();
			this.imagem = 'data:image/jpeg;base64,' + data;
			this.image_data = data;
			this.status_img = 'true';
			
		    fetch(this.imagem)
	        .then(res => res.blob())
	        .then(blob => {
	          this.blobImage = blob;
	        });

	        
	    }))
	      .catch(e => {
		  	this.EsconderLoader();
	        alert("Ocorreu um erro na validação da imagem, por favor tente novamente!");
	      });
	    
	}
	
	
	
	showLocalizacao(){
		this.MostrarLoader();
		this.geolocation.getCurrentPosition().then((resp) => {
			
	      let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDmyytHANTI83vcrwslSQSPLx4KKNKb6P0&latlng=' + resp.coords.latitude + ',' + resp.coords.longitude;

		  	this.http.sendRequest(url,
		      {
		        method: 'get',
		        headers: { 'Content-Type': 'application/json' },
		        timeout: 5000
		      }
		    )
		      .then(response => {
			      this.EsconderLoader();
			      
			      this.items_http = JSON.parse(response.data);
			      
				  if(this.items_http.status == "OK"){
					this.conteudoNota.localizacao = this.items_http.results[0].formatted_address;
					this.status("Localização encontrada!");  
				  }else{
					  alert("Não possível pegar a sua localização!");
				  }

		      })
		      .catch(response => {
		        // prints 403
		        this.EsconderLoader();
		        alert("Não possível pegar a sua localização!");
		      });
		  	
		  	
		  	
	      
	     }).catch((error) => {
	       this.EsconderLoader();
	       alert("Não possível pegar a sua localização!");
	     });     
	}


  
	SalvarNota(){
		let txt;
		let img;
		let form = true;
		
		if(this.conteudoNota.titulo == ''){
			txt = "Digite um título!";
			form = false;
			this.alertValidacaoForm(txt);
		}else if(this.conteudoNota.descricao == ''){
			txt = "Digite uma descrição!";
			form = false;
			this.alertValidacaoForm(txt);
		}


		if(form == true){
			
			if(this.status_img == 'true'){
				this.MostrarLoader();
				let UUID = (new Date().getTime()).toString(16) + '_img_nota.jpg';
				
				this.file.writeFile(this.file.dataDirectory, UUID, this.blobImage)
			    .then(res => {
				    this.EsconderLoader();
				    this.img_path = res.toURL();
				    
				    this.dataService.setNota(this.conteudoNota.titulo,this.conteudoNota.descricao,this.conteudoNota.localizacao,res.toURL())
				      .then((result) => {
				        if(result == 'ok'){
					        this.btn_display = "hidden";
					        this.input_disabled = "true";
					        this.status("Anotação salva com sucesso!");
					        //this.router.navigate(['/home', {status: 'gravacao_ok'}]);
				        }else{
					        this.alertValidacaoForm(result);
				        }
				      });
				    
				    
				    
			    }, (e) => {
				    this.EsconderLoader();
		            alert("Não foi possível salvar essa imagem!");
		        });
			}else{
				this.dataService.setNota(this.conteudoNota.titulo,this.conteudoNota.descricao,this.conteudoNota.localizacao,'')
				      .then((result) => {
				        if(result == 'ok'){
					        this.btn_display = "hidden";
					        this.input_disabled = "true";
					        this.status("Anotação salva com sucesso!");
					        //this.router.navigate(['/home', {status: 'gravacao_ok'}]);
				        }else{
					        this.alertValidacaoForm(result);
				        }
				      });
			}
			
			
			
		}
		
		
	}
  
 //******************************************************** 
	alertValidacaoForm(txt) {
		this.toastCtrl.create({
		    message: txt,
		    duration: 3000,
		    color: 'danger'
		}).then((obj) => {
			 obj.present(); 
		});
	}
	status(txt) {
		this.toastCtrl.create({
		    message: txt,
		    duration: 3000,
		    color: 'dark'
		}).then((obj) => {
			 obj.present(); 
		});
	}
	MostrarLoader() {

	    this.loadingCtrl.create({
	      message: 'Por favor, aguarde!...'
	    }).then((res) => {
	      res.present();
	    });
	
	}
	EsconderLoader() {

	    this.loadingCtrl.dismiss().then((res) => {
	      console.log('Loading dismissed!', res);
	    }).catch((error) => {
	      console.log('error', error);
	    });
	
	}
  
  

}
