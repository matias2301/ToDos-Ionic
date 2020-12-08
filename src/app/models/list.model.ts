import { ListItem } from './list-items.model';


export class List {

    id: number;
    title: string;
    created: Date;
    finished: Date;
    completed: boolean;
    items: ListItem[];    

    constructor( title: string ) {
        
        this.id = new Date().getTime();
        this.title = title;
        this.created = new Date();
        this.completed = false;
        this.items = [];                
    };
}