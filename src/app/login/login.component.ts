import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          const token = localStorage.getItem('authToken');
          if (token) {
            console.log('Token después de login:', token);
          }
          this.authService.getUserProfile().subscribe({
            next: () => {
              console.log('Perfil de usuario obtenido');
              console.log('Userid:', localStorage.getItem('userId'));
              console.log('username:', localStorage.getItem('username'));
              alert('Bienvenido ' + localStorage.getItem('username'));
              this.router.navigate(['/feed']);
            },
            error: err => {
              console.error('Error al obtener perfil', err);
              alert('Error al obtener perfil');
            },
          });
        },
        error: error => {
          console.error('Error en login', error);
          alert('Credenciales incorrectas');
        },
      });
    }
  }
}
