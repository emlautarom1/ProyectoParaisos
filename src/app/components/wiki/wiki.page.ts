import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { interval, Observable } from 'rxjs';
import { debounce, startWith, switchMap } from 'rxjs/operators';
import { TreeDetails } from 'src/app/models/tree-details';
import { WikiService } from 'src/app/services/wiki.service';
import { TreeDetailsComponent } from './tree-details/tree-details.component';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {
  searchControl: FormControl = new FormControl('');
  searchResults$: Observable<TreeDetails[]>;

  constructor(
    private wiki: WikiService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounce(() => interval(100)),
      switchMap(query => this.wiki.searchFor(query)),
      startWith([])
    );
  }

  async openTreeDetails(tree: TreeDetails) {
    const modal = await this.modalCtrl.create({
      component: TreeDetailsComponent,
      componentProps: { tree }
    });
    await modal.present();
  }
}
