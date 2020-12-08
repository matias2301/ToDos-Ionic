import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ToDosService {

  list: List[] = [];

  constructor() {
    this.getStorage();    
  }

  createList( title: string ){
    const newList = new List( title );
    this.list.push( newList );
    this.setStorage();
    return newList.id
  }

  deleteList( list: List ){
    this.list = this.list.filter( l => l.id !== list.id);
    this.setStorage();
  }


  getList ( id: string | number ){
    id = Number(id);

    return this.list.find( item => item.id === id );
  }

  setStorage(){
    localStorage.setItem( 'data', JSON.stringify(this.list) );
  }

  getStorage(){
    if ( localStorage.getItem('data') ) {
      this.list = JSON.parse( localStorage.getItem('data') );
    }
  }
}
