import { Injectable } from '@angular/core';
import { ObservationDTO } from '@app/models/observation';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }

  exportObservationsAsExcel(observations: ObservationDTO[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const ws = XLSX.utils.aoa_to_sheet([]);
        ws['!merges'] = [{ s: { c: 2, r: 0 }, e: { c: 9, r: 0 } }];
        ws['!cols'] = [
          { width: 20 }, // Fecha
          { width: 60 }, // Direccion
          { width: 30 }, // Nombre
          { width: 20 }, // Diametro
          { width: 20 }, // Altura
          { width: 20 }, // Fenologia
          { width: 20 }, // Sintomas
          { width: 20 }, // Sanidad
          { width: 20 }, // Poda
          { width: 20 }, // Taza apropiada
          { width: 20 }, // Tutor
          { width: 30 }, // Comentario
        ];
        XLSX.utils.sheet_add_aoa(ws, [[
          'Fecha',
          'Dirección (Coordenadas)',
          'Arbol',
        ]]);
        XLSX.utils.sheet_add_aoa(ws, [[
          'Tutor',
          'Comentario',
        ]], { origin: 'K1' });
        XLSX.utils.sheet_add_aoa(ws, [[
          'Nombre',
          'Diametro (cm)',
          'Altura',
          'Fenologia',
          'Sintomas',
          'Sanidad',
          'Poda',
          'Taza Apropiada',
        ]], { origin: 'C2' });

        const formattedObservations = observations.map(this.observationDTOtoExcelRow);

        XLSX.utils.sheet_add_aoa(
          ws,
          formattedObservations,
          { origin: 'A4' }
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Observaciones');
        XLSX.writeFile(wb, 'observaciones.xlsx');
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  private observationDTOtoExcelRow(observationDTO: ObservationDTO): string[] {
    const obs = observationDTO.obs;
    const arbol = obs.arbol;

    return [
      obs.fecha,
      `${obs.direccion} (${obs.coords.lat}, ${obs.coords.lng})`,
      `${arbol.nombre.vulgar} (${arbol.nombre.cientifico})`,
      arbol.diametro.toString(),
      arbol.altura,
      (arbol.fenologia || []).join(', '),
      (arbol.sintomas || []).join(', '),
      arbol.sanidad,
      arbol.poda,
      obs.taza ? 'Si' : 'No',
      obs.taza ? 'Si' : 'No',
      obs.comentario || '',
    ];
  }
}
