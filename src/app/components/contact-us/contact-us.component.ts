import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderUserComponent } from "../header-user/header-user.component";
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.css',
    imports: [FooterComponent, HeaderUserComponent, FormsModule, ReactiveFormsModule, ToastrModule]
})
export class ContactUsComponent {
  form: FormGroup = this.formBuilder.group({
    from_name: '',
    to_name: 'Admin',
    from_email: '',
    message: '',
  });

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {}

  async send() {
    emailjs.init('CNkAQ8D7qf17-V3fH')
    let response = await emailjs.send("service_qv87dsl","template_tqyr63p",{
    from_name: this.form.value.from_name,
    from_email: this.form.value.from_email,
    message: this.form.value.message
});
  this.toastr.success('Mensaje enviado correctamente.','Mensajes');
  this.form.reset();

  }
}
