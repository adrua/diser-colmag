// ColmagProfesores - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColmagProfesoresModel } from './colmag.profesores.model';
import { ColmagProfesoresService } from './colmag.profesores.service';


describe('ColmagProfesoresService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColmagProfesoresService;

    let rowBase = {
        ColmagProfesorId: 1234,
        ColmagProfesorNombre: `Harry............... Potter`,
        ColmagProfesorPatronus: `Algo`,
        ColmagProfesorEdad: 18,
        ColmagProfesorImagen: `http://wwww.imagenes.com`,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColmagProfesoresService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColmagProfesoresModel(rowBase);

        service.getById(row.ColmagProfesorId).subscribe((value) => {
			    expect(value.ColmagProfesorId).toBe(row.ColmagProfesorId);
			    expect(value.ColmagProfesorNombre).toBe(row.ColmagProfesorNombre);
			    expect(value.ColmagProfesorPatronus).toBe(row.ColmagProfesorPatronus);
			    expect(value.ColmagProfesorEdad).toBe(row.ColmagProfesorEdad);
			    expect(value.ColmagProfesorImagen).toBe(row.ColmagProfesorImagen);
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

        let row = new ColmagProfesoresModel(rowBase);

        service.getById(row.ColmagProfesorId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColmagProfesoresModel ${JSON.stringify(error)}`);
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

});
