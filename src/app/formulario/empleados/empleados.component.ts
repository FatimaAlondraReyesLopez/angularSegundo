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
  mostrarTabla: boolean = false; // Controla la visibilidad de la tabla

  agregarEmpleado() {
    if (this.empleado.matricula && this.empleado.nombre) { // Verifica que el empleado tenga matrícula y nombre
      const nuevoEmpleado = { ...this.empleado };
      this.empleados.push(nuevoEmpleado);
      this.resetFormulario();
    } else {
      alert("Por favor, complete los campos de matrícula y nombre.");
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
  }

  cargarUltimoEmpleado() {
    if (this.empleados.length > 0) {
      const lastIndex = this.empleados.length - 1; // Obtiene el índice del último empleado
      this.empleado = { ...this.empleados[lastIndex] }; // Carga los datos del último empleado en el formulario
    } else {
      alert("No hay empleados para modificar.");
    }
  }

  modificarEmpleado() {
    if (this.empleados.length > 0) {
      const lastIndex = this.empleados.length - 1; // Obtiene el índice del último empleado
      this.empleados[lastIndex] = { ...this.empleado }; // Actualiza el último empleado con los datos del formulario
      this.resetFormulario(); // Resetea el formulario
    }
  }

  eliminarEmpleado() {
    if (this.empleados.length > 0) {
      this.empleados.pop(); // Elimina el último empleado de la lista
      this.resetFormulario(); // Resetea el formulario
    } else {
      alert("No hay empleados para eliminar.");
    }
  }

  calcularSueldo(horas: number): number {
    const tarifaPorHora = 100; // Asume que la tarifa por hora es 100
    return horas * tarifaPorHora;
  }

  imprimirDatos() {
    this.mostrarTabla = true; // Muestra la tabla con los datos guardados
  }
}
