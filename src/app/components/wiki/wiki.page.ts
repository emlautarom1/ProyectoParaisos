import { Component, OnInit } from '@angular/core';
import { WikiService } from 'src/app/services/wiki.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit {
  items = [
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
  ]

  constructor(private wiki: WikiService) { }

  ngOnInit() {
    this.wiki.checkDB();
  }

}
