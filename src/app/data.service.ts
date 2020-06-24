import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	
	public database: SQLiteObject;
	
	constructor(
		public platform: Platform, 
		public sqlite :SQLite
	) {
      	
      	this.platform.ready().then(() => {
	      this.sqlite.create({
	        name: 'notasdb.db',
	        location: 'default'
	      })
	      .then((db: SQLiteObject) => {
	          this.database = db;
              this.createTables();
	      });
	    });
      	
      	
	}
	
	createTables(){
        
        this.database.executeSql('CREATE TABLE IF NOT EXISTS lista_notas(id_nota INTEGER PRIMARY KEY AUTOINCREMENT, titulo_nota VARCHAR(100), descricao_nota VARCHAR(200), localizacao_nota VARCHAR(200), imagem_nota VARCHAR(100), data_lanc datetime default current_timestamp)', [])
	    .then(res => {
	    }, (e) => {

            //alert("Errot: " + JSON.stringify(e));
            alert("Não foi possível criar o banco de dados!, verifique se tem espaço disponível em seu dispositivo!");
        });
    }
    
    setNota(titulo,descricao,localizacao,imagem) {
	    let data = [titulo, descricao, localizacao, imagem];
	    return this.database.executeSql('INSERT INTO lista_notas (titulo_nota, descricao_nota, localizacao_nota, imagem_nota) VALUES (?, ?, ?, ?)', data)
	    .then(res => {
		    return 'ok';
	    }, (e) => {
			return 'Não foi possível gravar a nota, por favor tente mais tarde!';
            //alert("Errot: " + JSON.stringify(e));
        });
	 }
	
	 getNota(id){
	    return this.database.executeSql("SELECT *, strftime('%H:%Mhs - %d/%m/%Y', data_lanc) AS data_txt FROM lista_notas WHERE id_nota = ? ORDER BY data_lanc DESC", [id]).then((data) => {
            let items: any[] = [];
            if(data.rows.length > 0) {
	             items = data.rows.item(0);
                return items;
            }else{
	            return [];
            }
        }, (e) => {

            console.log("Erro: " + JSON.stringify(e));
        });
    }

    
    getAll(){
	    return this.database.executeSql("SELECT *, strftime('%H:%Mhs - %d/%m/%Y', data_lanc) AS data_txt FROM lista_notas ORDER BY data_lanc DESC", []).then((data) => {
            let items: any[] = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    items.push(data.rows.item(i));
                }
                return items;
            }else{
	            return [];
            }
        }, (e) => {

            console.log("Erro: " + JSON.stringify(e));
        });
    }
	
	

  
  
}
