import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { environment } from 'src/environments/environment';

import { ColMagPersonajesModel } from '../colmag.personajes.model';
import { ColMagVaritaMagicaModel } from './colmag.varitamagica.model';

@Injectable({ providedIn: 'root' })
export class ColMagVaritaMagicaService {
    private colMagVaritaMagicaUrl = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.colMagVaritaMagicaUrl = `${environment.dataServiceUrl}/odata/ColMagVaritaMagica`;
    }

    getById(row: ColMagVaritaMagicaModel): Observable<any> {
        const sUrl = `${this.colMagVaritaMagicaUrl}(ColMagPersonajeId=${row.ColMagPersonajeId}, ColMagVaritaMagicaId=${row.ColMagVaritaMagicaId})`;

        return this.http.get<any>(sUrl).pipe(
            retry(3),
            tap(() => this.log("fetched ColMagVaritaMagica")),
            catchError((error) => this.handleError("getColMagVaritaMagica", error))
        );
    }

    getAll(): Observable<any> {
        const params: any = {};		 

        return this.http.get<any>(this.colMagVaritaMagicaUrl, { params }).pipe(
            retry(3),
            tap(row => this.log('fetched ColMagVaritaMagica')),
            catchError((error) => this.handleError('getColMagVaritaMagicaList', error))
        );
    }

    getList(masterRow: ColMagPersonajesModel,
            filter: string,
            paginator: MatPaginator,
            sort: MatSort): Observable<any> {

        const params: any = {};

        params["$filter"] = `(ColMagPersonajeId eq ${masterRow.ColMagPersonajeId})`;

        if (filter) {
            params["$filter"] = ` and (${filter})`;
        }
          
        if (paginator.pageIndex) {
            params["$skip"] = paginator.pageSize * paginator.pageIndex;
        }
        
        params["$top"] = paginator.pageSize;
        
        if (sort.active) {
            params["$orderby"] = `${sort.active || ""} ${sort.direction || ""}`;
        }
        
        params["$count"] = "true";

        return this.http.get<any>(this.colMagVaritaMagicaUrl, { params }).pipe(    
            retry(3),
            tap(row => this.log("fetched ColMagVaritaMagica")),
            catchError((error) => this.handleError('getColMagVaritaMagicaList', error))
        );
    }

    add(row: ColMagVaritaMagicaModel): Observable<ColMagVaritaMagicaModel> {
        return this.http.post<ColMagVaritaMagicaModel>(this.colMagVaritaMagicaUrl, ColMagVaritaMagicaModel.clone(row)).pipe(
            retry(3),
            tap((_row: ColMagVaritaMagicaModel) => this.log(`added ColMagVaritaMagica w/ id=${_row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("addColMagVaritaMagica", error))
        );
    }

    update(row: ColMagVaritaMagicaModel, original: ColMagVaritaMagicaModel): Observable<ColMagVaritaMagicaModel> {
        const sUrl = `${this.colMagVaritaMagicaUrl}(ColMagPersonajeId=${original.ColMagPersonajeId}, ColMagVaritaMagicaId=${original.ColMagVaritaMagicaId})`;
    
        return this.http.patch<ColMagVaritaMagicaModel>(sUrl, ColMagVaritaMagicaModel.clone(row)).pipe(
            retry(3),
            tap(_ => this.log(`update ColMagVaritaMagica id=${row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("updateColMagVaritaMagica", error))
        );
    }

    save(row: ColMagVaritaMagicaModel, original: ColMagVaritaMagicaModel): Observable<ColMagVaritaMagicaModel> {
        if (row._estado === "N") {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColMagVaritaMagicaModel): Observable<any> {
        const sUrl = `${this.colMagVaritaMagicaUrl}(ColMagPersonajeId=${row.ColMagPersonajeId}, ColMagVaritaMagicaId=${row.ColMagVaritaMagicaId})`;

        return this.http.delete(sUrl).pipe(
            retry(3),
            tap(_ => this.log(`filter ColMagVaritaMagica id=${row.ColMagPersonajeId}`)),
            catchError((error) => this.handleError("deleteColMagVaritaMagica", error))
        );
    }

    saveRows(rows: Array<ColMagVaritaMagicaModel>): Observable<any> {
        const _rows = rows.map((row) => ColMagVaritaMagicaModel.clone(row));
        return this.http.post<any>(this.colMagVaritaMagicaUrl, _rows).pipe(
            retry(3),
            tap((rrows: ColMagVaritaMagicaModel) => this.log(`pasted rows in ColMagVaritaMagica `)),
            catchError((error) => this.handleError("addColMagVaritaMagica", error))
        );
    }

    batch(row: ColMagVaritaMagicaModel, detailRows: Array<any>): Observable<any> {
        if (detailRows.length) {
            detailRows.forEach((detailRow) => {
                detailRow.body.ColMagPersonajeId = row.ColMagPersonajeId;
                detailRow.body.ColMagVaritaMagicaId = row.ColMagVaritaMagicaId;

            });

            return this.http.post<any>(`${environment.dataServiceUrl}/odata/$batch`,  { requests: detailRows }).pipe(
                retry(3),
                tap((rrows: ColMagVaritaMagicaModel) => this.log(`executed batch in ColMagVaritaMagica `)),
                catchError((error) => this.handleError("BatchColMagVaritaMagica", error))
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

    /** Log a ColMagVaritaMagicaService message with the MessageService */
    private log(message: string) {
        // this.messageService.add(`ColMagVaritaMagicaService: ${message}`);
        console.log(`ColMagVaritaMagicaService: ${message}`);
    }

}
