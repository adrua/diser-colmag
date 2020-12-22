import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColmagProfesoresModel } from './colmag.profesores.model';

@Injectable({ providedIn: 'root' })
export class ColmagProfesoresService {
    private colmagProfesoresUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colmagProfesoresUrl = `${environment.dataServiceUrl}/odata/ColmagPersonajes`;
    }

    getById(colmagProfesorId: number): Observable<any> {
        const sUrl = `${this.colmagProfesoresUrl}(ColmagPersonajeId=${colmagProfesorId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagProfesores")),
            catchError((error) => this.handleError("getColmagProfesores", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 
        params["$filter"] = `ColmagPersonajeProfesor eq true`;

        return this.http.get<any>(this.colmagProfesoresUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColmagProfesores')),
            catchError((error) => this.handleError('getColmagProfesoresList', error))
        );
    }

    getList(filter: string,
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};

        params["$filter"] = `(ColmagPersonajeProfesor eq true)`;
        if (filter) {
            filter = filter.replace(/ColmagProfesor/gi, "ColmagPersonaje")
            params["$filter"] += ` and (${filter})`;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            let columns = sort.active.replace(/ColmagProfesor/gi, "ColmagPersonaje")
            columns = sort.active.replace(/ColmagProfesorEdad/gi, "ColmagPersonajeAnoNacimiento")
            params["$orderby"] = `${columns || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.colmagProfesoresUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagProfesores")),
            catchError((error) => this.handleError('getColmagProfesoresList', error))
        );
    }

    private handleError(operation = "operation", result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.message); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${result.message}`);

          // Let the app keep running by returning an empty result.
          return of(result);
    }

    /** Log a ColmagProfesoresService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColmagProfesoresService: ${message}`);
        console.log(`ColmagProfesoresService: ${message}`);
    }

}
