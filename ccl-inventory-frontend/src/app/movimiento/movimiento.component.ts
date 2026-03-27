import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimiento.component.html',
  styleUrl: './movimiento.component.css'
})
export class MovimientoComponent implements OnInit {
  protected productos: any[] = [];
  protected selectedProducto: any = null;
  protected tipo = '';
  protected cantidad: number = 0;
  protected mensaje = '';
  protected mensajeError = false;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.productoService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: () => this.mostrarMensaje('Error al cargar productos', true)
    });
  }

  registrarMovimiento(): void {
    // 1. Validaciones básicas de campos vacíos
    if (!this.selectedProducto || !this.tipo || this.cantidad <= 0) {
      this.mostrarMensaje('Complete todos los campos con valores válidos', true);
      return;
    }

    // 2. Validación crítica: No permitir salida superior al stock actual
    if (this.tipo === 'salida' && this.cantidad > this.selectedProducto.cantidad) {
      this.mostrarMensaje(
        `Stock insuficiente. Disponible: ${this.selectedProducto.cantidad}`, 
        true
      );
      return;
    }

    this.productoService.registrarMovimiento(
      this.selectedProducto.id,
      this.tipo,
      this.cantidad
    ).subscribe({
      next: () => {
        this.mostrarMensaje('Movimiento registrado exitosamente', false);
        this.resetForm();
        this.cargarInventario();
      },
      error: (error) => {
        this.mostrarMensaje(error.error?.message || 'Error en el servidor', true);
      }
    });
  }

  private resetForm(): void {
    this.cantidad = 0;
    this.selectedProducto = null;
    this.tipo = '';
  }

  verInventario(): void {
    this.router.navigate(['/inventario']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private mostrarMensaje(msg: string, isError: boolean): void {
    this.mensaje = msg;
    this.mensajeError = isError;
    setTimeout(() => this.mensaje = '', 4000);
  }
}