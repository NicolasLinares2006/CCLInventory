import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  protected productos: any[] = [];

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
        console.log('Inventario cargado:', this.productos);
      },
      error: () => {
        alert('Error al cargar el inventario');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/movimiento']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}