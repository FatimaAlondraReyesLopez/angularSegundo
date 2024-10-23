import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Colores {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
}

@Component({
  selector: 'app-resistencia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencia.component.html',
  styles: [],
})
export default class ResistenciaComponent implements OnInit {
  formGroup!: FormGroup;
  resistencias: Colores[] = [];

  colorMap: Record<string, string> = {
    Negro: '#000000',
    Cafe: '#8B4513',
    Rojo: '#FF0000',
    Naranja: '#FFA500',
    Amarillo: '#FFFF00',
    Verde: '#008000',
    Azul: '#0000FF',
    Violeta: '#EE82EE',
    Gris: '#808080',
    Blanco: '#FFFFFF',
    Oro: '#FFD700',
    Plata: '#C0C0C0',
  };

  public valores: { [key: string]: number } = {
    Negro: 0,
    Cafe: 1,
    Rojo: 2,
    Naranja: 3,
    Amarillo: 4,
    Verde: 5,
    Azul: 6,
    Violeta: 7,
    Gris: 8,
    Blanco: 9,
  };

  public multiplicadores: { [key: string]: number } = {
    Negro: 1,
    Cafe: 10,
    Rojo: 100,
    Naranja: 1000,
    Amarillo: 10000,
    Verde: 100000,
    Azul: 1000000,
    Violeta: 10000000,
    Gris: 100000000,
    Blanco: 1000000000,
  };

  public tolerancias: { [key: string]: number } = {
    Oro: 0.05,
    Plata: 0.1,
  };

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.imprimir();
  }

  initForm(): FormGroup {
    return this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: [''],
    });
  }

  onSubmit(): void {
    const { color1, color2, color3, tolerancia } = this.formGroup.value;

    const nuevaResistencia: Colores = {
      color1,
      color2,
      color3,
      tolerancia,
    };

    this.resistencias.push(nuevaResistencia);
    this.guardarEnLocalStorage();
    this.formGroup.reset();
  }

  imprimir(): void {
    const resistenciasGuardadas = localStorage.getItem('resistencias');
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
      console.log("Resistencias cargadas:", this.resistencias);
    }
}

  guardarEnLocalStorage(): void {
    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));
  }

  calcularValor(resistencia: Colores): number {
    return (this.valores[resistencia.color1] * 10 + this.valores[resistencia.color2]) * this.multiplicadores[resistencia.color3];
  }

  calcularValorMaximo(resistencia: Colores): number {
    return this.calcularValor(resistencia) * (1 + this.tolerancias[resistencia.tolerancia]);
  }

  calcularValorMinimo(resistencia: Colores): number {
    return this.calcularValor(resistencia) * (1 - this.tolerancias[resistencia.tolerancia]);
  }
}
