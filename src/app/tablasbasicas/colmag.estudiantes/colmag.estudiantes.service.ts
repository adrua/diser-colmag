import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColmagEstudiantesModel } from './colmag.estudiantes.model';

@Injectable({ providedIn: 'root' })
export class ColmagEstudiantesService {
    private colmagEstudiantesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colmagEstudiantesUrl = `${environment.dataServiceUrl}/odata/ColmagPersonajes`;
    }

    getById(colmagEstudianteId: number): Observable<any> {
        const sUrl = `${this.colmagEstudiantesUrl}(ColmagPersonajeId=${colmagEstudianteId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagEstudiantes")),
            catchError((error) => this.handleError("getColmagEstudiantes", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 
        params["$filter"] = `ColmagPersonajeEstudiante eq true`;

        return this.http.get<any>(this.colmagEstudiantesUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColmagEstudiantes')),
            catchError((error) => this.handleError('getColmagEstudiantesList', error))
        );
    }

    getList(filter: string,
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};

        params["$filter"] = `(ColmagPersonajeEstudiante eq true)`;
        if (filter) {
            filter = filter.replace(/ColmagEstudiante/g, "ColmagPersonaje")
            params["$filter"] = `and (${filter})`;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            filter = filter.replace(/ColmagEstudiante/g, "ColmagPersonaje")
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.colmagEstudiantesUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagEstudiantes")),
            catchError((error) => this.handleError('getColmagEstudiantesList', error))
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

    /** Log a ColmagEstudiantesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColmagEstudiantesService: ${message}`);
        console.log(`ColmagEstudiantesService: ${message}`);
    }

}
