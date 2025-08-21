import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Asesor {
  nombre: string;
  enCurso: number;
  activas: number;
  instaladas: number;
  canceladas: number;
  total: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  equipoLuz = signal<Asesor[]>([]);
  equipoMelissa = signal<Asesor[]>([]);

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const datosGuardadosLuz = localStorage.getItem('equipoLuz');
    const datosGuardadosMelissa = localStorage.getItem('equipoMelissa');

    if (datosGuardadosLuz && datosGuardadosMelissa) {
      this.equipoLuz.set(JSON.parse(datosGuardadosLuz));
      this.equipoMelissa.set(JSON.parse(datosGuardadosMelissa));
    } else {
      this.inicializarDatos();
    }
  }

  inicializarDatos() {
    const inicialLuz: Asesor[] = [];
    const inicialMelissa: Asesor[] = [];

    for (let i = 1; i <= 9; i++) {
      inicialLuz.push({ 
        nombre: `Asesor ${i}`, 
        enCurso: 0, 
        activas: 0, 
        instaladas: 0, 
        canceladas: 0, 
        total: 0 
      });

      inicialMelissa.push({ 
        nombre: `Asesor ${i}`, 
        enCurso: 0, 
        activas: 0, 
        instaladas: 0, 
        canceladas: 0, 
        total: 0 
      });
    }

    this.equipoLuz.set(inicialLuz);
    this.equipoMelissa.set(inicialMelissa);
    this.guardarDatos();
  }

  guardarDatos() {
    localStorage.setItem('equipoLuz', JSON.stringify(this.equipoLuz()));
    localStorage.setItem('equipoMelissa', JSON.stringify(this.equipoMelissa()));
  }

  actualizarTotal(asesor: Asesor) {
    asesor.total = asesor.enCurso + asesor.activas + asesor.instaladas + asesor.canceladas;
    this.guardarDatos();
  }

  getTotalEquipo(equipo: Asesor[]): number {
    return equipo.reduce((sum, asesor) => sum + asesor.total, 0);
  }

  getRowClass(total: number): string {
    if (total === 0) return 'low-performer';
    if (total <= 2) return 'medium-performer';
    return 'high-performer';
  }

  get equipoGanador() {
    const totalLuz = this.getTotalEquipo(this.equipoLuz());
    const totalMelissa = this.getTotalEquipo(this.equipoMelissa());
    
    if (totalLuz > totalMelissa) return 'luz';
    if (totalMelissa > totalLuz) return 'melissa';
    return 'empate';
  }
}