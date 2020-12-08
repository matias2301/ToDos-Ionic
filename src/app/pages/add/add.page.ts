import { Component } from '@angular/core';
import { ToDosService } from '../../services/to-dos.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-items.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  list: List;
  itemName: '';

  constructor( private toDosService: ToDosService,
               private route: ActivatedRoute
             ){
      const listId = this.route.snapshot.paramMap.get('listId');
      this.list = this.toDosService.getList( listId );
  }

  addItem() {
    if( this.itemName.length === 0 ) return;

    const newItem = new ListItem( this.itemName );
    this.list.items.push( newItem );

    this.itemName = '';
    this.toDosService.setStorage();
  }

  handlerCheck( item: ListItem ){
    const pending = this.list.items
                                .filter( e => !e.completed)
                                .length;
                  
    if( pending === 0 ){
      this.list.finished = new Date();
      this.list.completed = true;
    } else {
      this.list.finished = null;
      this.list.completed = false;
    }

    this.toDosService.setStorage();
  }

  delete( i: number ){
    this.list.items.splice( i, 1 );
    this.toDosService.setStorage();
  }

}
