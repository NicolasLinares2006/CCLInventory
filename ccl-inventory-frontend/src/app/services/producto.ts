import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  registrarMovimiento(productoId: number, tipo: string, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/movimiento`, 
      { productoId, tipo, cantidad },
      { headers: this.getHeaders() }
    );
  }

  getInventario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario`, 
      { headers: this.getHeaders() }
    );
  }
}