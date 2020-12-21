import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColmagInscripcionesModel } from './colmag.inscripciones.model';

@Injectable({ providedIn: 'root' })
export class ColmagInscripcionesService {
    private colmagInscripcionesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colmagInscripcionesUrl = `${environment.dataServiceUrl}/odata/ColmagInscripciones`;
    }

    getById(colmagInscripcionId: number): Observable<any> {
        const sUrl = `${this.colmagInscripcionesUrl}(ColmagInscripcionId=${colmagInscripcionId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagInscripciones")),
            catchError((error) => this.handleError("getColmagInscripciones", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        params["$expand"] = "ColmagCasas";

        return this.http.get<any>(this.colmagInscripcionesUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColmagInscripciones')),
            catchError((error) => this.handleError('getColmagInscripcionesList', error))
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

        params["$expand"] = "ColmagCasas";

        return this.http.get<any>(this.colmagInscripcionesUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagInscripciones")),
            catchError((error) => this.handleError('getColmagInscripcionesList', error))
        );
    }

    add(row: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        return this.http.post<ColmagInscripcionesModel>(this.colmagInscripcionesUrl, ColmagInscripcionesModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColmagInscripcionesModel) => this.log(`added ColmagInscripciones w/ id=${_row.ColmagInscripcionId}`)),
            catchError((error) => this.handleError("addColmagInscripciones", error))
        );
    }

    update(row: ColmagInscripcionesModel, original: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        const sUrl = `${this.colmagInscripcionesUrl}(ColmagInscripcionId=${original.ColmagInscripcionId})`;
    
        return this.http.patch<ColmagInscripcionesModel>(sUrl, ColmagInscripcionesModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColmagInscripciones id=${row.ColmagInscripcionId}`)),
            catchError((error) => this.handleError("updateColmagInscripciones", error))
        );
    }

    save(row: ColmagInscripcionesModel, original: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColmagInscripcionesModel): Observable<any> {
        const sUrl = `${this.colmagInscripcionesUrl}(ColmagInscripcionId=${row.ColmagInscripcionId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColmagInscripciones id=${row.ColmagInscripcionId}`)),
            catchError((error) => this.handleError("deleteColmagInscripciones", error))
        );
    }

    saveRows(rows: Array<ColmagInscripcionesModel>): Observable<any> {
        const _rows = rows.map((row) => ColmagInscripcionesModel.clone(row));
        return this.http.post<any>(this.colmagInscripcionesUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColmagInscripcionesModel) => this.log(`pasted rows in ColmagInscripciones `)),
            catchError((error) => this.handleError("addColmagInscripciones", error))
        );
    }

    batch(row: ColmagInscripcionesModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColmagInscripcionId = row.ColmagInscripcionId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColmagInscripcionesModel) => this.log(`executed batch in ColmagInscripciones `)),
                catchError((error) => this.handleError("BatchColmagInscripciones", error))
            );
        } else {
            return of({});
        }
    }
    filterColmagCasaNombre(val: string, pageSize: number = 10): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/ColmagCasas`;

        let params: any = { };
        params["$filter"] = `contains(ColmagCasaNombre,'${val}')`;
        params["$top"] = pageSize;

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter ColmagCasaNombre id=${val}`)),
            catchError((error) => this.handleError("filterColmagCasaNombre", error))
        );

    }

    getByIdColmagCasaNombre(colmagCasaId: number): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/ColmagCasas(ColmagCasaId=${colmagCasaId})`;

        return this.http.get<any>(sUrl, { }).pipe(
            retry(3),
            tap(_ => this.log(`getById ColmagCasaNombre ColmagCasaId=${colmagCasaId}`)),
            catchError((error) => this.handleError("getByIdColmagCasaNombre", error))
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

    /** Log a ColmagInscripcionesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColmagInscripcionesService: ${message}`);
        console.log(`ColmagInscripcionesService: ${message}`);
    }

}
