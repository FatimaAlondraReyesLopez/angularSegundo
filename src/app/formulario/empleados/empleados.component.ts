import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para ngModel

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,  // Marcar como standalone
  imports: [CommonModule, FormsModule],  // Asegurarse de importar FormsModule para usar ngModel
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
emp: any;

  agregarEmpleado() {
    const nuevoEmpleado = { ...this.empleado };
    this.empleados.push(nuevoEmpleado);
    this.resetFormulario();
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

  modificarEmpleado(matricula: string) {
    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
    if (index !== -1) {
      this.empleado = { ...this.empleados[index] };  // Cargar los datos del empleado en el formulario
      this.eliminarEmpleado(matricula);  // Eliminar el empleado para actualizarlo después
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
  }

  imprimir() {
    const listaEmpleados = this.empleados.map(emp => 
      `Matrícula: ${emp.matricula}, Nombre: ${emp.nombre}, Correo: ${emp.correo}, Edad: ${emp.edad}, Horas: ${emp.horas}`
    ).join('\n');
  
    const ventanaImpresion = window.open('', '_blank');
    
    if (ventanaImpresion) {  // Verifica que la ventana no sea null
      ventanaImpresion.document.write('<pre>' + listaEmpleados + '</pre>');
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    } else {
      console.error('No se pudo abrir la ventana de impresión.'); // Manejo de error en caso de que no se abra
    }
  }  

  calcularSueldo(horas: number): number {
    const tarifaPorHora = 100; // Define una tarifa por hora (ajusta según tus necesidades)
    return horas * tarifaPorHora;
  }
}
