import { Injectable } from '@angular/core';
import database from 'src/assets/wiki/db.json';
import { TreeEntry } from '../models/tree-entry';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  database: TreeEntry[];

  constructor() {
    this.database = database as TreeEntry[];
  }

  checkDB() {
    console.log(this.database.length);
  }
}
