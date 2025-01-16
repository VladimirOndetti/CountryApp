import { Component } from '@angular/core';

@Component({
  selector: 'shared-topics',
  standalone: false,

  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  public topics: string[] = [
    'Rutas Principales',
    'Rutas Hijas',
    'Peticiones http',
    'Renderizar tablas',
    'ngClass',
    'Operadores',
    'Display SVG',
    'Codigo Modularizado',
    'Debounce',
    'Mantener datos sin recargar',
    'LocalStorage',
    'Observables',
    'Observables basado en Observables anterior',
  ]
}
