import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColMagPersonajesModel } from './colmag.personajes.model';

@Injectable({ providedIn: 'root' })
export class ColMagPersonajesService {
    private colMagPersonajesUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colMagPersonajesUrl = `${environment.dataServiceUrl}/odata/ColMagPersonajes`;
    }

    getById(colMagPersonajeId: number): Observable<any> {
        const sUrl = `${this.colMagPersonajesUrl}(ColMagPersonajeId=${colMagPersonajeId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColMagPersonajes")),
            catchError((error) => this.handleError("getColMagPersonajes", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        params["$expand"] = "ColmagCasas";

        return this.http.get<any>(this.colMagPersonajesUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColMagPersonajes')),
            catchError((error) => this.handleError('getColMagPersonajesList', error))
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

        return this.http.get<any>(this.colMagPersonajesUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColMagPersonajes")),
            catchError((error) => this.handleError('getColMagPersonajesList', error))
        );
    }

    add(row: ColMagPersonajesModel): Observable<ColMagPersonajesModel> {
        return this.http.post<ColMagPersonajesModel>(this.colMagPersonajesUrl, ColMagPersonajesModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColMagPersonajesModel) => this.log(`added ColMagPersonajes w/ id=${_row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("addColMagPersonajes", error))
        );
    }

    update(row: ColMagPersonajesModel, original: ColMagPersonajesModel): Observable<ColMagPersonajesModel> {
        const sUrl = `${this.colMagPersonajesUrl}(ColMagPersonajeId=${original.ColMagPersonajeId})`;
    
        return this.http.patch<ColMagPersonajesModel>(sUrl, ColMagPersonajesModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColMagPersonajes id=${row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("updateColMagPersonajes", error))
        );
    }

    save(row: ColMagPersonajesModel, original: ColMagPersonajesModel): Observable<ColMagPersonajesModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColMagPersonajesModel): Observable<any> {
        const sUrl = `${this.colMagPersonajesUrl}(ColMagPersonajeId=${row.ColMagPersonajeId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColMagPersonajes id=${row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("deleteColMagPersonajes", error))
        );
    }

    saveRows(rows: Array<ColMagPersonajesModel>): Observable<any> {
        const _rows = rows.map((row) => ColMagPersonajesModel.clone(row));
        return this.http.post<any>(this.colMagPersonajesUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColMagPersonajesModel) => this.log(`pasted rows in ColMagPersonajes `)),
            catchError((error) => this.handleError("addColMagPersonajes", error))
        );
    }

    batch(row: ColMagPersonajesModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColMagPersonajeId = row.ColMagPersonajeId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColMagPersonajesModel) => this.log(`executed batch in ColMagPersonajes `)),
                catchError((error) => this.handleError("BatchColMagPersonajes", error))
            );
        } else {
            return of({});
        }
    }
    filterColMagCasaNombre(val: string, pageSize: number = 10): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/ColmagCasas`;

        let params: any = { };
        params["$filter"] = `contains(ColMagCasaNombre,'${val}')`;
        params["$top"] = pageSize;

        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter ColMagCasaNombre id=${val}`)),
            catchError((error) => this.handleError("filterColMagCasaNombre", error))
        );

    }

    getByIdColMagCasaNombre(colmagCasaId: number): Observable<any> {
        let sUrl = `${environment.dataServiceUrl}/odata/ColmagCasas(ColmagCasaId=${colmagCasaId})`;

        return this.http.get<any>(sUrl, { }).pipe(
            retry(3),
            tap(_ => this.log(`getById ColMagCasaNombre ColmagCasaId=${colmagCasaId}`)),
            catchError((error) => this.handleError("getByIdColMagCasaNombre", error))
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

    /** Log a ColMagPersonajesService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColMagPersonajesService: ${message}`);
        console.log(`ColMagPersonajesService: ${message}`);
    }

}
