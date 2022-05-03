import { Injectable } from '@angular/core';
import * as fuzzysort from 'fuzzysort';
import { defer, Observable, of } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import jsonDB from 'src/assets/wiki/db.json';
import { TreeDetails } from '../models/tree-details';

interface SearchEntry {
  index: number,
  [field: number]: Fuzzysort.Prepared
}

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private database = jsonDB as TreeDetails[];
  private searchIndex$: Observable<SearchEntry[]>;
  private searchOptions = {
    keys: ['1', '2'],
    limit: 20,
    allowTypo: true,
  };

  constructor() {
    this.searchIndex$ = defer(() =>
      of(this.database.map((entry, index) => this.treeToSearchEntry(index, entry)))
    ).pipe(
      tap(() => console.log('searchIndex prepared')),
      shareReplay(1)
    );
  }

  private treeToSearchEntry(index: number, entry: TreeDetails): SearchEntry {
    return {
      index: index,
      1: fuzzysort.prepare(entry.nombre_cientifico),
      2: fuzzysort.prepare(entry.nombre_comun),
    }
  }

  searchFor(query: string) {
    const cleanQuery = query.trim();
    return cleanQuery == ''
      ? of([])
      : this.searchIndex$.pipe(
        mergeMap(index => fuzzysort.goAsync(query, index, this.searchOptions)),
        map(results => results.map(result => this.database[result.obj.index]))
      );
  }
}
