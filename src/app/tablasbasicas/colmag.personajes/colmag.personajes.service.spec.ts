// ColMagPersonajes - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColMagPersonajesModel } from './colmag.personajes.model';
import { ColMagPersonajesService } from './colmag.personajes.service';


describe('ColMagPersonajesService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColMagPersonajesService;

    let rowBase = {
        ColMagPersonajeId: 1234,
        ColMagPersonajeNombre: `Harry Potter`,
        ColMagPersonajeEspecie: `human`,
        Genero: `male`,
        ColmagCasaId: 178,
        ColMagPersonajeFechaNacimiento: new Date(1980, 7, 31, 12, 0, 0),
        AnoNcimiento: 1980,
        ColMagPersonajeAscendencia: `half-blood`,
        ColMagPersonajeColorOjos: `green`,
        ColMagPersonajeColorCabello: `black`,
        ColMagPersonajePatronus: `stag`,
        ColMagPersonajeEstudiante: true,
        ColMagPersonajeProfesor: false,
        ColMagPersonajeActor: `Daniel Radcliffe`,
        ColMagPersonajeVive: true,
        ColMagPersonajeImagen: `http://hp-api.herokuapp.com`,
        ColmagCasas: {
            ColmagCasaId: 178,
            ColMagCasaNombre: `Gryffindor`
        },
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColMagPersonajesService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColMagPersonajesModel(rowBase);

        service.getById(row.ColMagPersonajeId).subscribe((value) => {
			    expect(value.ColMagPersonajeId).toBe(row.ColMagPersonajeId);
			    expect(value.ColMagPersonajeNombre).toBe(row.ColMagPersonajeNombre);
			    expect(value.ColMagPersonajeEspecie).toBe(row.ColMagPersonajeEspecie);
			    expect(value.Genero).toBe(row.Genero);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			    expect(new Date(value.ColMagPersonajeFechaNacimiento)).toEqual(row.ColMagPersonajeFechaNacimiento);
			    expect(value.AnoNcimiento).toBe(row.AnoNcimiento);
			    expect(value.ColMagPersonajeAscendencia).toBe(row.ColMagPersonajeAscendencia);
			    expect(value.ColMagPersonajeColorOjos).toBe(row.ColMagPersonajeColorOjos);
			    expect(value.ColMagPersonajeColorCabello).toBe(row.ColMagPersonajeColorCabello);
			    expect(value.ColMagPersonajePatronus).toBe(row.ColMagPersonajePatronus);
			    expect(value.ColMagPersonajeEstudiante).toBe(row.ColMagPersonajeEstudiante);
			    expect(value.ColMagPersonajeProfesor).toBe(row.ColMagPersonajeProfesor);
			    expect(value.ColMagPersonajeActor).toBe(row.ColMagPersonajeActor);
			    expect(value.ColMagPersonajeVive).toBe(row.ColMagPersonajeVive);
			    expect(value.ColMagPersonajeImagen).toBe(row.ColMagPersonajeImagen);
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

        let row = new ColMagPersonajesModel(rowBase);

        service.getById(row.ColMagPersonajeId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
                expect(value.statusText).toEqual('Not Found')
                expect(value.status).toBe(404)
                done();
            },
            (error) => {
                fail(`expected an error, not ColMagPersonajesModel ${JSON.stringify(error)}`);
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

        let row = new ColMagPersonajesModel(rowBase);
        row._estado = 'N';
        delete row.ColMagPersonajeId;

        //Add - ColMagPersonajes
        service.save(row, row).subscribe(value => {
			    expect(value.ColMagPersonajeNombre).toBe(row.ColMagPersonajeNombre);
			    expect(value.ColMagPersonajeEspecie).toBe(row.ColMagPersonajeEspecie);
			    expect(value.Genero).toBe(row.Genero);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			    expect(new Date(value.ColMagPersonajeFechaNacimiento)).toEqual(row.ColMagPersonajeFechaNacimiento);
			    expect(value.AnoNcimiento).toBe(row.AnoNcimiento);
			    expect(value.ColMagPersonajeAscendencia).toBe(row.ColMagPersonajeAscendencia);
			    expect(value.ColMagPersonajeColorOjos).toBe(row.ColMagPersonajeColorOjos);
			    expect(value.ColMagPersonajeColorCabello).toBe(row.ColMagPersonajeColorCabello);
			    expect(value.ColMagPersonajePatronus).toBe(row.ColMagPersonajePatronus);
			    expect(value.ColMagPersonajeEstudiante).toBe(row.ColMagPersonajeEstudiante);
			    expect(value.ColMagPersonajeProfesor).toBe(row.ColMagPersonajeProfesor);
			    expect(value.ColMagPersonajeActor).toBe(row.ColMagPersonajeActor);
			    expect(value.ColMagPersonajeVive).toBe(row.ColMagPersonajeVive);
			    expect(value.ColMagPersonajeImagen).toBe(row.ColMagPersonajeImagen);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new ColMagPersonajesModel(rowBase);
        row._estado = 'O';
        delete row.ColMagPersonajeId;

        //Update - ColMagPersonajes
        service.save(row, row).subscribe(value => {
			    expect(value.ColMagPersonajeNombre).toBe(row.ColMagPersonajeNombre);
			    expect(value.ColMagPersonajeEspecie).toBe(row.ColMagPersonajeEspecie);
			    expect(value.Genero).toBe(row.Genero);
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			    expect(new Date(value.ColMagPersonajeFechaNacimiento)).toEqual(row.ColMagPersonajeFechaNacimiento);
			    expect(value.AnoNcimiento).toBe(row.AnoNcimiento);
			    expect(value.ColMagPersonajeAscendencia).toBe(row.ColMagPersonajeAscendencia);
			    expect(value.ColMagPersonajeColorOjos).toBe(row.ColMagPersonajeColorOjos);
			    expect(value.ColMagPersonajeColorCabello).toBe(row.ColMagPersonajeColorCabello);
			    expect(value.ColMagPersonajePatronus).toBe(row.ColMagPersonajePatronus);
			    expect(value.ColMagPersonajeEstudiante).toBe(row.ColMagPersonajeEstudiante);
			    expect(value.ColMagPersonajeProfesor).toBe(row.ColMagPersonajeProfesor);
			    expect(value.ColMagPersonajeActor).toBe(row.ColMagPersonajeActor);
			    expect(value.ColMagPersonajeVive).toBe(row.ColMagPersonajeVive);
			    expect(value.ColMagPersonajeImagen).toBe(row.ColMagPersonajeImagen);
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

        let row = new ColMagPersonajesModel({});
        row.ColMagPersonajeId = -1;

        row._estado = 'O';

        //Update - ColMagPersonajes
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not ColMagPersonajesModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new ColMagPersonajesModel(rowBase);
        row._estado = 'O';
        delete row.ColMagPersonajeId;

        //Delete - ColMagPersonajes
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

        let row = new ColMagPersonajesModel({});
        row._estado = 'O';
        row.ColMagPersonajeId = -1;

        //Delete - ColMagPersonajes
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });

    it('#filterColMagCasaNombre should return value from observable', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData({value : [rowBase.ColmagCasas]}));

        service.filterColMagCasaNombre(`Gryffindor`).subscribe(value => {
            expect(value?.value?.length).toBe(1);
            expect(value.value[0].ColMagCasaNombre).toBe(`Gryffindor`);
            done();
        });
    });

    it('#getByIdColMagCasaNombre should return One Row', (done: DoneFn) => {
        let row = rowBase.ColmagCasas;

        httpClientSpy.get.and.returnValue(asyncData(row));

        service.getByIdColMagCasaNombre(row.ColmagCasaId).subscribe((value) => {
		    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			expect(value.ColMagCasaNombre).toBe(row.ColMagCasaNombre);
            done();
        });
    });

    it('#getByIdColMagCasaNombre should return 404 Not found', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'Not Found',
            status: 404,
            statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        let row = rowBase.ColmagCasas;

        service.getByIdColMagCasaNombre(row.ColmagCasaId).subscribe(
            (value) => {
                console.log(`#getByIdColMagCasaNombre.Error: ${JSON.stringify(value)}`);
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
