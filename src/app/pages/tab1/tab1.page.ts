import { Component } from '@angular/core';
import { ToDosService } from '../../services/to-dos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor( 
                public toDosService: ToDosService,
                private router: Router,
                private alertController: AlertController,
              ){    
  }    

  async addList(){

    const alert = await this.alertController.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Enter a List Name'
        }
      ], 
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: ( data ) => {
            if( data.title.length === 0 ) return;
            const listId = this.toDosService.createList( data.title );

            this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
          }
        }
      ],
    });
  
    alert.present();
  }
}