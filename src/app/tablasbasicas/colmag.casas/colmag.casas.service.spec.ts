// ColmagCasas - Service - Angular Testing
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';

import { ColmagCasasModel } from './colmag.casas.model';
import { ColmagCasasService } from './colmag.casas.service';


describe('ColmagCasasService', () => {
    let httpClientSpy: {
      get: jasmine.Spy,
      post: jasmine.Spy,
      put: jasmine.Spy,
      patch: jasmine.Spy,
      delete: jasmine.Spy
    };

    let service: ColmagCasasService;

    let rowBase = {
        ColmagCasaId: 1234,
        ColmagCasaNombre: `Griffindor`,
        ColmagCasaDescripcion: `Lorem ipsum dolor sit amet. consectetur adipiscing elit. sed do eiusmod tempor incididunt
ut
labore
et
dolore
magna
aliqua.
Ut
enim
ad
minim
veniam.
quis
nostrud
exercitation
ullamco
laboris
nisi
ut
aliquip
ex
ea
commodo
consequat.
Duis
aute
irure
dolor
in
reprehenderit
in
voluptate
velit
esse
cillum
dolore
eu
fugiat
nulla
pariatur.
Excepteur
sint
occaecat
cupidatat
non
proident.
sunt
in
culpa
qui
officia
deserunt
mollit
anim
id
est
laborum.`,
        _estado: ''
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
        service = new ColmagCasasService(httpClientSpy as any);
    });

    it('#getById should return One Row', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(rowBase));

        let row = new ColmagCasasModel(rowBase);

        service.getById(row.ColmagCasaId).subscribe((value) => {
			    expect(value.ColmagCasaId).toBe(row.ColmagCasaId);
			    expect(value.ColmagCasaNombre).toBe(row.ColmagCasaNombre);
			    expect(value.ColmagCasaDescripcion).toBe(row.ColmagCasaDescripcion);
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

        let row = new ColmagCasasModel(rowBase);

        service.getById(row.ColmagCasaId).subscribe(
            (value) => {
                console.log(`#getById.Error: ${JSON.stringify(value)}`);
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

        let row = new ColmagCasasModel(rowBase);
        row._estado = 'N';
        delete row.ColmagCasaId;

        //Add - ColmagCasas
        service.save(row, row).subscribe(value => {
			    expect(value.ColmagCasaNombre).toBe(row.ColmagCasaNombre);
			    expect(value.ColmagCasaDescripcion).toBe(row.ColmagCasaDescripcion);
            done();
        });
    });

    it('#save-Update should return a updated row', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(asyncData(rowBase));

        let row = new ColmagCasasModel(rowBase);
        row._estado = 'O';
        delete row.ColmagCasaId;

        //Update - ColmagCasas
        service.save(row, row).subscribe(value => {
			    expect(value.ColmagCasaNombre).toBe(row.ColmagCasaNombre);
			    expect(value.ColmagCasaDescripcion).toBe(row.ColmagCasaDescripcion);
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

        let row = new ColmagCasasModel({});
        row.ColmagCasaId = -1;

        row._estado = 'O';

        //Update - ColmagCasas
        service.save(row, row).subscribe(
            (value) => {
                expect((<any>value).statusText).toEqual("Not Found");
                expect((<any>value).status).toEqual(404);
                done();
            },
            (error) => {
                fail(`expected an error for update, not ColmagCasasModel ${JSON.stringify(error)}`);
                done();
            }
        );
    });


    it('#delete should return null', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(asyncData(true));

        let row = new ColmagCasasModel(rowBase);
        row._estado = 'O';
        delete row.ColmagCasaId;

        //Delete - ColmagCasas
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

        let row = new ColmagCasasModel({});
        row._estado = 'O';
        row.ColmagCasaId = -1;

        //Delete - ColmagCasas
        service.delete(row).subscribe(value => {
            expect(value.statusText).toEqual("Not Found");
            expect(value.status).toEqual(404);
            done();
        });
    });
});
