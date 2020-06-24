import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-visualizar-nota',
  templateUrl: './visualizar-nota.page.html',
  styleUrls: ['./visualizar-nota.page.scss'],
})
export class VisualizarNotaPage implements OnInit {

	nota: any[] = [];
	id: any;
	notaImageStyle: any;
	localizacao: any;

  constructor(
	  private route: ActivatedRoute, 
	  private router: Router,
	  public platform: Platform,
	  public dataService: DataService,
	  private sanitization: DomSanitizer,
	  private webview: WebView,
  ) {}

  
  ngOnInit() {
	  this.getNotaID(this.route.snapshot.paramMap.get("id_nota"));
  }
  
  
  getNotaID(id){
	  this.dataService.getNota(id)
      .then((result: any[]) => {
        this.nota = result;
        const displayImage = this.webview.convertFileSrc(this.nota['imagem_nota']);
        if(displayImage != ""){
        	this.notaImageStyle = displayImage;
        }else{
	        this.notaImageStyle = "assets/icon_imagem.png";
        }
        
        
      });
  }

}
