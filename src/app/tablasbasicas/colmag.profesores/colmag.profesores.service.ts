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
        this.colmagProfesoresUrl = `${environment.dataServiceUrl}/odata/ColmagProfesores`;
    }

    getById(colmagProfesorId: number): Observable<any> {
        const sUrl = `${this.colmagProfesoresUrl}(ColmagProfesorId=${colmagProfesorId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagProfesores")),
            catchError((error) => this.handleError("getColmagProfesores", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

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

        return this.http.get<any>(this.colmagProfesoresUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagProfesores")),
            catchError((error) => this.handleError('getColmagProfesoresList', error))
        );
    }

    add(row: ColmagProfesoresModel): Observable<ColmagProfesoresModel> {
        return this.http.post<ColmagProfesoresModel>(this.colmagProfesoresUrl, ColmagProfesoresModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColmagProfesoresModel) => this.log(`added ColmagProfesores w/ id=${_row.ColmagProfesorId}`)),
            catchError((error) => this.handleError("addColmagProfesores", error))
        );
    }

    update(row: ColmagProfesoresModel, original: ColmagProfesoresModel): Observable<ColmagProfesoresModel> {
        const sUrl = `${this.colmagProfesoresUrl}(ColmagProfesorId=${original.ColmagProfesorId})`;
    
        return this.http.patch<ColmagProfesoresModel>(sUrl, ColmagProfesoresModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColmagProfesores id=${row.ColmagProfesorId}`)),
            catchError((error) => this.handleError("updateColmagProfesores", error))
        );
    }

    save(row: ColmagProfesoresModel, original: ColmagProfesoresModel): Observable<ColmagProfesoresModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColmagProfesoresModel): Observable<any> {
        const sUrl = `${this.colmagProfesoresUrl}(ColmagProfesorId=${row.ColmagProfesorId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColmagProfesores id=${row.ColmagProfesorId}`)),
            catchError((error) => this.handleError("deleteColmagProfesores", error))
        );
    }

    saveRows(rows: Array<ColmagProfesoresModel>): Observable<any> {
        const _rows = rows.map((row) => ColmagProfesoresModel.clone(row));
        return this.http.post<any>(this.colmagProfesoresUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColmagProfesoresModel) => this.log(`pasted rows in ColmagProfesores `)),
            catchError((error) => this.handleError("addColmagProfesores", error))
        );
    }

    batch(row: ColmagProfesoresModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColmagProfesorId = row.ColmagProfesorId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColmagProfesoresModel) => this.log(`executed batch in ColmagProfesores `)),
                catchError((error) => this.handleError("BatchColmagProfesores", error))
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

    /** Log a ColmagProfesoresService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColmagProfesoresService: ${message}`);
        console.log(`ColmagProfesoresService: ${message}`);
    }

}
