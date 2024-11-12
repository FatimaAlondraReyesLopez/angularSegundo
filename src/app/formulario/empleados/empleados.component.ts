import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;
}

interface CalculoSalario {
  pagoHorasNormales: number;
  pagoHorasExtra: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent {
  empleado: Empleado = {
    matricula: '',
    nombre: '',
    correo: '',
    edad: 0,
    horas: 0
  };

  empleados: Empleado[] = [];
  mostrarTabla: boolean = false;
  modoEdicion: boolean = false;
  mensajeError: string = '';
  
  readonly TARIFA_NORMAL = 70;
  readonly TARIFA_EXTRA = 140;
  readonly HORAS_NORMALES_MAX = 40;

  agregarEmpleado() {
    if (this.empleado.matricula && this.empleado.nombre) {
      // Verificar si la matrícula ya existe
      if (this.empleados.some(emp => emp.matricula === this.empleado.matricula)) {
        this.mensajeError = "Error: La matrícula ya existe.";
        return;
      }
      const nuevoEmpleado = { ...this.empleado };
      this.empleados.push(nuevoEmpleado);
      this.resetFormulario();
      this.mensajeError = '';
    } else {
      this.mensajeError = "Por favor, complete los campos de matrícula y nombre.";
    }
  }

  resetFormulario() {
    this.empleado = {
      matricula: '',
      nombre: '',
      correo: '',
      edad: 0,
      horas: 0
    };
    this.modoEdicion = false;
    this.mensajeError = '';
  }

  modificarEmpleado() {
    if (!this.empleado.matricula) {
      this.mensajeError = "Por favor, complete los campos de matrícula.";
      return;
    }

    const index = this.empleados.findIndex(emp => emp.matricula === this.empleado.matricula);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleado };
      this.resetFormulario();
      this.mensajeError = '';
    } else {
      this.mensajeError = "Error al modificar el empleado.";
    }
  }

  cargarDatosEmpleado(matricula: string) {
    const empleadoEncontrado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleadoEncontrado) {
      this.empleado = { ...empleadoEncontrado };
      this.modoEdicion = true;
      this.mensajeError = '';
    } else {
      this.mensajeError = "No se encontró ningún empleado con esa matrícula.";
    }
  }

  eliminarEmpleado() {
    if (this.empleados.length > 0) {
      this.empleados.pop();
      this.resetFormulario();
    } else {
      this.mensajeError = "No hay empleados para eliminar.";
    }
  }

  calcularDesgloseSalario(horas: number): CalculoSalario {
    const horasNormales = Math.min(horas, this.HORAS_NORMALES_MAX);
    const horasExtras = Math.max(horas - this.HORAS_NORMALES_MAX, 0);
    
    const pagoHorasNormales = horasNormales * this.TARIFA_NORMAL;
    const pagoHorasExtra = horasExtras * this.TARIFA_EXTRA;
    const subtotal = pagoHorasNormales + pagoHorasExtra;
    
    return {
      pagoHorasNormales,
      pagoHorasExtra,
      subtotal
    };
  }

  calcularTotalNomina(): number {
    return this.empleados.reduce((total, emp) => {
      const { subtotal } = this.calcularDesgloseSalario(emp.horas);
      return total + subtotal;
    }, 0);
  }

  imprimirDatos() {
    this.mostrarTabla = true;
  }
}