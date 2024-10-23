import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import EmpleadosComponent from './formulario/empleados/empleados.component';
import { TemapComponent } from './tem/temap/temap.component';
import { ListMessageComponent } from './tem/list-message/list-message.component';
import ResistenciaComponent from "./formulario/resistencia/resistencia.component";
import { AddMessageComponent } from "./tem/add-message/add-message.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemapComponent, ListMessageComponent, EmpleadosComponent, ResistenciaComponent, AddMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}