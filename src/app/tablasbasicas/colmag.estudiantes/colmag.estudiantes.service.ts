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
        this.colmagEstudiantesUrl = `${environment.dataServiceUrl}/odata/ColmagEstudiantes`;
    }

    getById(colmagEstudianteId: number): Observable<any> {
        const sUrl = `${this.colmagEstudiantesUrl}(ColmagEstudianteId=${colmagEstudianteId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagEstudiantes")),
            catchError((error) => this.handleError("getColmagEstudiantes", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

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

        if (filter) {
            params["$filter"] = filter;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.colmagEstudiantesUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagEstudiantes")),
            catchError((error) => this.handleError('getColmagEstudiantesList', error))
        );
    }

    add(row: ColmagEstudiantesModel): Observable<ColmagEstudiantesModel> {
        return this.http.post<ColmagEstudiantesModel>(this.colmagEstudiantesUrl, ColmagEstudiantesModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColmagEstudiantesModel) => this.log(`added ColmagEstudiantes w/ id=${_row.ColmagEstudianteId}`)),
            catchError((error) => this.handleError("addColmagEstudiantes", error))
        );
    }

    update(row: ColmagEstudiantesModel, original: ColmagEstudiantesModel): Observable<ColmagEstudiantesModel> {
        const sUrl = `${this.colmagEstudiantesUrl}(ColmagEstudianteId=${original.ColmagEstudianteId})`;
    
        return this.http.patch<ColmagEstudiantesModel>(sUrl, ColmagEstudiantesModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColmagEstudiantes id=${row.ColmagEstudianteId}`)),
            catchError((error) => this.handleError("updateColmagEstudiantes", error))
        );
    }

    save(row: ColmagEstudiantesModel, original: ColmagEstudiantesModel): Observable<ColmagEstudiantesModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColmagEstudiantesModel): Observable<any> {
        const sUrl = `${this.colmagEstudiantesUrl}(ColmagEstudianteId=${row.ColmagEstudianteId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColmagEstudiantes id=${row.ColmagEstudianteId}`)),
            catchError((error) => this.handleError("deleteColmagEstudiantes", error))
        );
    }

    saveRows(rows: Array<ColmagEstudiantesModel>): Observable<any> {
        const _rows = rows.map((row) => ColmagEstudiantesModel.clone(row));
        return this.http.post<any>(this.colmagEstudiantesUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColmagEstudiantesModel) => this.log(`pasted rows in ColmagEstudiantes `)),
            catchError((error) => this.handleError("addColmagEstudiantes", error))
        );
    }

    batch(row: ColmagEstudiantesModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColmagEstudianteId = row.ColmagEstudianteId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColmagEstudiantesModel) => this.log(`executed batch in ColmagEstudiantes `)),
                catchError((error) => this.handleError("BatchColmagEstudiantes", error))
            );
        } else {
            return of({});
        }
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
