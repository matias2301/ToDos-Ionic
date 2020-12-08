import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';
import { ToDosService } from '../../services/to-dos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})

export class ListsComponent {

  @ViewChild( IonList ) swipe: IonList;
  @Input() complete: boolean;

  // list: any[] = [];

  constructor( 
                public toDosService: ToDosService,
                private router: Router,
                private alertController: AlertController,             
              ){
    // this.list = this.toDosService.list;
  }    

  handleList ( item: List ){
    
    if ( this.complete === true ) this.router.navigateByUrl(`/tabs/tab2/add/${item.id}`)
    
    if ( this.complete === false ) this.router.navigateByUrl(`/tabs/tab2/add/${item.id}`)
    
  }

  deleteList( item: List ){
    this.toDosService.deleteList( item );
    // this.list = this.toDosService.list;
  }

  async modifyTitle( item: List ) {
    const alert = await this.alertController.create({
        header: 'Modify Title',
        inputs: [
          {
            name: 'title',
            type: 'text',
            value: item.title,
            placeholder: 'Title List'         
          }
        ], 
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => this.swipe.closeSlidingItems()
          },
          {
            text: 'Modify',
            handler: ( data ) => {
              if( data.title.length === 0 ) return;
                item.title = data.title;
                this.toDosService.setStorage();
                this.swipe.closeSlidingItems();
            }
          }
        ],
      });
    
      alert.present();
    }     
}

