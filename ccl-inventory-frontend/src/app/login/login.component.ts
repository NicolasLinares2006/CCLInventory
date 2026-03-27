import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  // Cambiamos FormsModule por ReactiveFormsModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected loginForm: FormGroup;
  protected error = '';
  protected isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Definición reactiva del formulario con sus reglas
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter para facilitar el acceso a los controles en el HTML
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor, revise los campos marcados en rojo.';
      return;
    }

    this.error = '';
    this.isLoading = true;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/movimiento']);
      },
      error: (err) => {
        this.isLoading = false;
        // Si el backend envía un mensaje específico, lo usamos
        this.error = err.error?.message || 'Usuario o contraseña incorrectos';
      }
    });
  }
}