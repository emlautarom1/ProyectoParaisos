import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-region-map',
  templateUrl: './region-map.page.html',
  styleUrls: ['./region-map.page.scss'],
})
export class RegionMapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDownload() {
    console.log('Descargando datos...');
  }

  onFilterOptions() {
    console.log('Abriendo opciones de filtro...');
  }
}
