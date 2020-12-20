import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColmagCasasModel } from './colmag.casas.model';

@Injectable({ providedIn: 'root' })
export class ColmagCasasService {
    private colmagCasasUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colmagCasasUrl = `${environment.dataServiceUrl}/odata/ColmagCasas`;
    }

    getById(colmagCasaId: number): Observable<any> {
        const sUrl = `${this.colmagCasasUrl}(ColmagCasaId=${colmagCasaId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColmagCasas")),
            catchError((error) => this.handleError("getColmagCasas", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.colmagCasasUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColmagCasas')),
            catchError((error) => this.handleError('getColmagCasasList', error))
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

        return this.http.get<any>(this.colmagCasasUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColmagCasas")),
            catchError((error) => this.handleError('getColmagCasasList', error))
        );
    }

    add(row: ColmagCasasModel): Observable<ColmagCasasModel> {
        return this.http.post<ColmagCasasModel>(this.colmagCasasUrl, ColmagCasasModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColmagCasasModel) => this.log(`added ColmagCasas w/ id=${_row.ColmagCasaId}`)),
            catchError((error) => this.handleError("addColmagCasas", error))
        );
    }

    update(row: ColmagCasasModel, original: ColmagCasasModel): Observable<ColmagCasasModel> {
        const sUrl = `${this.colmagCasasUrl}(ColmagCasaId=${original.ColmagCasaId})`;
    
        return this.http.patch<ColmagCasasModel>(sUrl, ColmagCasasModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColmagCasas id=${row.ColmagCasaId}`)),
            catchError((error) => this.handleError("updateColmagCasas", error))
        );
    }

    save(row: ColmagCasasModel, original: ColmagCasasModel): Observable<ColmagCasasModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColmagCasasModel): Observable<any> {
        const sUrl = `${this.colmagCasasUrl}(ColmagCasaId=${row.ColmagCasaId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColmagCasas id=${row.ColmagCasaId}`)),
            catchError((error) => this.handleError("deleteColmagCasas", error))
        );
    }

    saveRows(rows: Array<ColmagCasasModel>): Observable<any> {
        const _rows = rows.map((row) => ColmagCasasModel.clone(row));
        return this.http.post<any>(this.colmagCasasUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColmagCasasModel) => this.log(`pasted rows in ColmagCasas `)),
            catchError((error) => this.handleError("addColmagCasas", error))
        );
    }

    batch(row: ColmagCasasModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColmagCasaId = row.ColmagCasaId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColmagCasasModel) => this.log(`executed batch in ColmagCasas `)),
                catchError((error) => this.handleError("BatchColmagCasas", error))
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

    /** Log a ColmagCasasService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColmagCasasService: ${message}`);
        console.log(`ColmagCasasService: ${message}`);
    }

}
