// ColMagVaritaMagica - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColMagPersonajesModel } from '../colmag.personajes.model';
import { ColMagVaritaMagicaModel } from './colmag.varitamagica.model';
import { ColMagPersonajesService } from '../colmag.personajes.service';
import { ColMagVaritaMagicaService } from './colmag.varitamagica.service';


describe('ColMagVaritaMagicaService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColMagVaritaMagicaService;

    let rowBase = {
        ColMagPersonajeId: 1234,
        ColMagVaritaMagicaId: 1234,
        ColMagVaritaMagica_Comp: '', //convert(varchar(max),ColMagPersonajeId) || '/' || convert(varchar(max),ColMagVaritaMagicaId) 
        ColMagVaritaMagicaMadera: `holly`,
        ColMagVaritaMagicaAlma: `phoenix feather`,
        ColMagVaritaMagicaLongitud: 11.00,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColMagVaritaMagicaService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColMagVaritaMagicaModel(rowBase);

        service.getById(row.ColMagPersonajeId, row.ColMagVaritaMagicaId).subscribe((value) => {
			    expect(value.ColMagPersonajeId).toBe(row.ColMagPersonajeId);
			    expect(value.ColMagVaritaMagicaId).toBe(row.ColMagVaritaMagicaId);
			    expect(value.ColMagVaritaMagicaMadera).toBe(row.ColMagVaritaMagicaMadera);
			    expect(value.ColMagVaritaMagicaAlma).toBe(row.ColMagVaritaMagicaAlma);
			    expect(value.ColMagVaritaMagicaLongitud).toBe(row.ColMagVaritaMagicaLongitud);
          done();
        });
    });

    it('#getById should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = new ColMagVaritaMagicaModel(rowBase);

        service.getById(row.ColMagPersonajeId, row.ColMagVaritaMagicaId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColMagVaritaMagicaModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });

    it('#getAll should return array of rows', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({ value: [rowBase, rowBase] }));

        service.getAll().subscribe(value => {
            let result = value?.value;
            expect(result?.length).toEqual(2);
            done();
        });
    });

    it('#getList return array of rows', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({ value: [rowBase, rowBase] }));

        let filter = '';

        let paginator = {
            pageIndex: 0,
            pageSize: 10
        };

        let sort = {
            active: '',
            direction: ''
        };

        service.getList(filter, <any>paginator, <any>sort).subscribe(value => {
            let result = value?.value;
            expect(result?.length).toEqual(2);
            done();
        });
    });

    it('#save-Add should return a Add row', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncData(rowBase));

        let row = new ColMagVaritaMagicaModel(rowBase);
        row._estado = 'N';
        delete row.ColMagPersonajeId;
        delete row.ColMagVaritaMagicaId;

        //Add - ColMagVaritaMagica
        service.save(row, row).subscribe(value => {
			    expect(value.ColMagVaritaMagicaMadera).toBe(row.ColMagVaritaMagicaMadera);
			    expect(value.ColMagVaritaMagicaAlma).toBe(row.ColMagVaritaMagicaAlma);
			    expect(value.ColMagVaritaMagicaLongitud).toBe(row.ColMagVaritaMagicaLongitud);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new ColMagVaritaMagicaModel(rowBase);
        row._estado = 'O';
        delete row.ColMagPersonajeId;
        delete row.ColMagVaritaMagicaId;

        //Update - ColMagVaritaMagica
        service.save(row, row).subscribe(value => {
			    expect(value.ColMagVaritaMagicaMadera).toBe(row.ColMagVaritaMagicaMadera);
			    expect(value.ColMagVaritaMagicaAlma).toBe(row.ColMagVaritaMagicaAlma);
			    expect(value.ColMagVaritaMagicaLongitud).toBe(row.ColMagVaritaMagicaLongitud);
            done();
        });
    });

    it('#save-update should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.patch.and.returnValue(asyncError(errorResponse));

        let row = new ColMagVaritaMagicaModel({});
        row.ColMagPersonajeId = -1;
        row.ColMagVaritaMagicaId = -1;

        row._estado = 'O';

        //Update - ColMagVaritaMagica
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not ColMagVaritaMagicaModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new ColMagVaritaMagicaModel(rowBase);
        row._estado = 'O';
        delete row.ColMagPersonajeId;
        delete row.ColMagVaritaMagicaId;

        //Delete - ColMagVaritaMagica
        service.delete(row).subscribe(value => {
            expect(value).toBe(true);
            done();
        });
    });

    it('#delete should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.delete.and.returnValue(asyncError(errorResponse));

        let row = new ColMagVaritaMagicaModel({});
        row._estado = 'O';
        row.ColMagPersonajeId = -1;
        row.ColMagVaritaMagicaId = -1;

        //Delete - ColMagVaritaMagica
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
