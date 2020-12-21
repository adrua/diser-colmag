// ColmagEstudiantes - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColmagEstudiantesModel } from './colmag.estudiantes.model';
import { ColmagEstudiantesService } from './colmag.estudiantes.service';


describe('ColmagEstudiantesService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColmagEstudiantesService;

    let rowBase = {
        ColmagEstudianteId: 1234,
        ColmagEstudianteNombre: `Harry............... Potter`,
        ColmagEstudiantePatronus: `Algo`,
        ColmagEstudianteEdad: 18,
        ColmagEstudianteImagen: `http://wwww.imagenes.com`,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColmagEstudiantesService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColmagEstudiantesModel(rowBase);

        service.getById(row.ColmagEstudianteId).subscribe((value) => {
			    expect(value.ColmagEstudianteId).toBe(row.ColmagEstudianteId);
			    expect(value.ColmagEstudianteNombre).toBe(row.ColmagEstudianteNombre);
			    expect(value.ColmagEstudiantePatronus).toBe(row.ColmagEstudiantePatronus);
			    expect(value.ColmagEstudianteEdad).toBe(row.ColmagEstudianteEdad);
			    expect(value.ColmagEstudianteImagen).toBe(row.ColmagEstudianteImagen);
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

        let row = new ColmagEstudiantesModel(rowBase);

        service.getById(row.ColmagEstudianteId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColmagEstudiantesModel ${JSON.stringify(error)}`);
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

        let row = new ColmagEstudiantesModel(rowBase);
        row._estado = 'N';
        delete row.ColmagEstudianteId;

        //Add - ColmagEstudiantes
        service.save(row, row).subscribe(value => {
			    expect(value.ColmagEstudianteNombre).toBe(row.ColmagEstudianteNombre);
			    expect(value.ColmagEstudiantePatronus).toBe(row.ColmagEstudiantePatronus);
			    expect(value.ColmagEstudianteEdad).toBe(row.ColmagEstudianteEdad);
			    expect(value.ColmagEstudianteImagen).toBe(row.ColmagEstudianteImagen);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new ColmagEstudiantesModel(rowBase);
        row._estado = 'O';
        delete row.ColmagEstudianteId;

        //Update - ColmagEstudiantes
        service.save(row, row).subscribe(value => {
			    expect(value.ColmagEstudianteNombre).toBe(row.ColmagEstudianteNombre);
			    expect(value.ColmagEstudiantePatronus).toBe(row.ColmagEstudiantePatronus);
			    expect(value.ColmagEstudianteEdad).toBe(row.ColmagEstudianteEdad);
			    expect(value.ColmagEstudianteImagen).toBe(row.ColmagEstudianteImagen);
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

        let row = new ColmagEstudiantesModel({});
        row.ColmagEstudianteId = -1;

        row._estado = 'O';

        //Update - ColmagEstudiantes
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not ColmagEstudiantesModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new ColmagEstudiantesModel(rowBase);
        row._estado = 'O';
        delete row.ColmagEstudianteId;

        //Delete - ColmagEstudiantes
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

        let row = new ColmagEstudiantesModel({});
        row._estado = 'O';
        row.ColmagEstudianteId = -1;

        //Delete - ColmagEstudiantes
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
