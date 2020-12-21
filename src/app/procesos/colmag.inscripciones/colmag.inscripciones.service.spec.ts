// ColmagInscripciones - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColmagInscripcionesModel } from './colmag.inscripciones.model';
import { ColmagInscripcionesService } from './colmag.inscripciones.service';


describe('ColmagInscripcionesService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColmagInscripcionesService;

    let rowBase = {
        ColmagInscripcionId: 1234,
        ColmagInscripcionFecha: new Date(2011, 12, 12, 12, 0, 0),
        ColmagInscripcionNombre: `Harry`,
        ColmagInscripcionApellido: `Potter`,
        ColmagInscripcionCedula: 73123612,
        ColmagInscripcionEdad: 18,
        ColmagCasaId: 202,
        ColmagCasas: {
            ColmagCasaId: 202,
            ColmagCasaNombre: `Griffindor`
        },
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColmagInscripcionesService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColmagInscripcionesModel(rowBase);

        service.getById(row.ColmagInscripcionId).subscribe((value) => {
			    expect(value.ColmagInscripcionId).toBe(row.ColmagInscripcionId);
			    expect(new Date(value.ColmagInscripcionFecha)).toEqual(row.ColmagInscripcionFecha);
			    expect(value.ColmagInscripcionNombre).toBe(row.ColmagInscripcionNombre);
			    expect(value.ColmagInscripcionApellido).toBe(row.ColmagInscripcionApellido);
			    expect(value.ColmagInscripcionCedula).toBe(row.ColmagInscripcionCedula);
			    expect(value.ColmagInscripcionEdad).toBe(row.ColmagInscripcionEdad);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
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

        let row = new ColmagInscripcionesModel(rowBase);

        service.getById(row.ColmagInscripcionId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColmagInscripcionesModel ${JSON.stringify(error)}`);
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

        let row = new ColmagInscripcionesModel(rowBase);
        row._estado = 'N';
        delete row.ColmagInscripcionId;

        //Add - ColmagInscripciones
        service.save(row, row).subscribe(value => {
			    expect(new Date(value.ColmagInscripcionFecha)).toEqual(row.ColmagInscripcionFecha);
			    expect(value.ColmagInscripcionNombre).toBe(row.ColmagInscripcionNombre);
			    expect(value.ColmagInscripcionApellido).toBe(row.ColmagInscripcionApellido);
			    expect(value.ColmagInscripcionCedula).toBe(row.ColmagInscripcionCedula);
			    expect(value.ColmagInscripcionEdad).toBe(row.ColmagInscripcionEdad);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new ColmagInscripcionesModel(rowBase);
        row._estado = 'O';
        delete row.ColmagInscripcionId;

        //Update - ColmagInscripciones
        service.save(row, row).subscribe(value => {
			    expect(new Date(value.ColmagInscripcionFecha)).toEqual(row.ColmagInscripcionFecha);
			    expect(value.ColmagInscripcionNombre).toBe(row.ColmagInscripcionNombre);
			    expect(value.ColmagInscripcionApellido).toBe(row.ColmagInscripcionApellido);
			    expect(value.ColmagInscripcionCedula).toBe(row.ColmagInscripcionCedula);
			    expect(value.ColmagInscripcionEdad).toBe(row.ColmagInscripcionEdad);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
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

        let row = new ColmagInscripcionesModel({});
        row.ColmagInscripcionId = -1;

        row._estado = 'O';

        //Update - ColmagInscripciones
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not ColmagInscripcionesModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new ColmagInscripcionesModel(rowBase);
        row._estado = 'O';
        delete row.ColmagInscripcionId;

        //Delete - ColmagInscripciones
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

        let row = new ColmagInscripcionesModel({});
        row._estado = 'O';
        row.ColmagInscripcionId = -1;

        //Delete - ColmagInscripciones
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });

    it('#filterColmagCasaNombre should return value from observable', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({value : [rowBase.ColmagCasas]}));

        service.filterColmagCasaNombre(`Griffindor`).subscribe(value => {
            expect(value?.value?.length).toBe(1);
            expect(value.value[0].ColmagCasaNombre).toBe(`Griffindor`);
            done();
        });
    });

    it('#getByIdColmagCasaNombre should return One Row', (done: DoneFn) => {
        let row = rowBase.ColmagCasas;

        httpClientSpy.get.and.returnValue(asyncData(row));

        service.getByIdColmagCasaNombre(row.ColmagCasaId).subscribe((value) => {
		    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			expect(value.ColmagCasaNombre).toBe(row.ColmagCasaNombre);
            done();
        });
    });

    it('#getByIdColmagCasaNombre should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = rowBase.ColmagCasas;

        service.getByIdColmagCasaNombre(row.ColmagCasaId).subscribe(
            (value) => {
                console.log(`#getByIdColmagCasaNombre.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColmagCasasModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });

});
