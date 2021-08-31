import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formUsuario: FormGroup;


  constructor(    
    private formBuilder : FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();

    this.formUsuario = this.formBuilder.group({
      usuario:  new FormControl('', [Validators.required] ) , 
      contraseña:  new FormControl('', [Validators.required]) 
    });
    
  }

  iniciarSesion() {
    console.info("iniciar sesion")
    sessionStorage.setItem("login","logeado");
    this.router.navigate(['home']);
  }


}
