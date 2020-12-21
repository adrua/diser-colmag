import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ColmagInscripcionesModel } from './colmag.inscripciones.model';

declare var lastError;

@Injectable({ providedIn: 'root' })
export class ColmagInscripcionesMockService {
    rows: Array<ColmagInscripcionesModel> = [];
    autoincrement = this.rows.length;

    rowsColmagCasas: Array<any> = [{
        ColmagCasaId: 202,
        ColmagCasaNombre: "Griffindor"
    }];

    constructor() { }

    getById(colmagInscripcionId: number): Observable<any> {
        const _filtered = this.rows.filter((x) => x.ColmagInscripcionId === colmagInscripcionId);

        let _row = <any>{};

        if (_filtered.length) {
            _row = _filtered[0];
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }
        
        return of(_row);
    }

    getAll(): Observable<any> {
        return of({
            "@odata.count": this.rows.length,
            value: this.rows        
        });
    }

    getList(filter: string,
            paginator: any,
            sort: any): Observable<any> {

        let _filtered = [...this.rows];

        if (filter) {
            const _filter = new Function("x", `return ${filter};`);
            _filtered = this.rows.filter((x) => _filter(x));
        }

        if (sort?.active) {
            const _sort = new Function("a", "b", `return (a.${sort.active.column} === b.${sort.active.column}])?0:((a.${sort.active.column}] > b.${sort.active.column}])?1:-1);`);
            _filtered = _filtered.sort((a, b) => _sort(a, b));
            if(sort.direction === "desc") {
                _filtered = _filtered.reverse();
            }
        }

        _filtered = _filtered.slice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);
        return of({
            "@odata.count": _filtered.length,
            value: _filtered        
        });
    }

    add(row: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        let _row = ColmagInscripcionesModel.clone(row);
        _row.ColmagInscripcionId = ++this.autoincrement;       

        this.rows.push(_row);
        return of(_row);
    }

    update(row: ColmagInscripcionesModel, original: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        const inx = this.rows.findIndex((x) => x.ColmagInscripcionId === original.ColmagInscripcionId);

        let _row = null;

        if (inx >= 0) {
            this.rows[inx] = ColmagInscripcionesModel.clone(row);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    save(row: ColmagInscripcionesModel, original: ColmagInscripcionesModel): Observable<ColmagInscripcionesModel> {
        if (row._estado === 'N') {
            return this.add(row);
        } else {
            return this.update(row, original);
        }
    }

    delete(row: ColmagInscripcionesModel): Observable<any> {
        const inx = this.rows.findIndex((x) => x.ColmagInscripcionId === row.ColmagInscripcionId);

        let _row = null;

        if (inx >= 0) {
            this.rows.splice(inx, 1);
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
            lastError = _row;
        }

        return of(_row);
    }

    saveRows(rows: Array<ColmagInscripcionesModel>): Observable<any> {
        const _rows = rows.map((row) => this.add(row));
        return of(_rows);
    }

    filterColmagCasaNombre(val: string, pageSize: number = 10): Observable<any> {
        let _filtered = this.rowsColmagCasas.filter((x) => x.ColmagCasaNombre.includes(val)).slice(0, pageSize);
        
        return of(_filtered);
    }

    getByIdColmagCasaNombre(colmagCasaId: number): Observable<any> {
        let _filtered = this.rowsColmagCasas.filter((x) => x.ColmagCasaId === colmagCasaId);

        let _row = null;

        if (_filtered.length) {
            _row = _filtered[0];
        } else {
            _row = {
                status: 404,
                statusText: "OK"
            };
        }

        return of(_row);
    }

    private handleError(operation = 'operation', result?: any) {

          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead

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
