import { Component } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styles: ``
})
export class AddMessageComponent {
formGroup: any;
  fb: any;
onSubmit() {
throw new Error('Method not implemented.');
}
  constructor (public messageService: MessageserviceService){}
  alumno:string="";

  ngOnInit():void{
    this.formGroup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
    })
  }

  AddAlumno(){
    let{nombre}=this.formGroup.value;
    this.messageService.add(nombre);
    this.formGroup.get('nombre')?.setValue('')
  }

}
