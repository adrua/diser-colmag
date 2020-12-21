// ColmagInscripciones - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ColmagInscripcionesModule } from './colmag.inscripciones.module';
import { ColmagInscripcionesModel } from './colmag.inscripciones.model';
import { ColmagInscripcionesService } from './colmag.inscripciones.service';
import { ColmagInscripcionesMockService } from './colmag.inscripciones.mockservice.spec';
import { ColmagInscripcionesTable } from './colmag.inscripciones.table';

describe('ColmagInscripciones_Table', () => {
    let component: ColmagInscripcionesTable;
    let fixture: ComponentFixture<ColmagInscripcionesTable>;
    let service: ColmagInscripcionesService;
    let _service: ColmagInscripcionesService;
    let mockService: ColmagInscripcionesMockService;

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

    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                ColmagInscripcionesModule
            ]
        });

        mockService = new ColmagInscripcionesMockService();
        TestBed.overrideProvider(ColmagInscripcionesService, { useValue: mockService });
        service = TestBed.inject(ColmagInscripcionesService);

        fixture = TestBed.createComponent(ColmagInscripcionesTable);
        _service = fixture.debugElement.injector.get(ColmagInscripcionesService);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColmagInscripcionesMockService")
        expect(_service.constructor.name).toBe("ColmagInscripcionesMockService")
    });

    it('should display a rows', () => {
        fixture.detectChanges();
        expect(component.resultsLength).toBe(0);

        mockService.rows.push(new ColmagInscripcionesModel(rowBase));
        mockService.rows.push(new ColmagInscripcionesModel(rowBase));

        component.paginator.page.emit();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.resultsLength).toBe(2);
            let matRows = fixture.debugElement.queryAll(By.css('mat-row.cdk-row'));
            expect(matRows.length).toBe(2);
        });
    });

    it('should display a Dialog for Add', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.resultsLength).toBe(0);
            let addIconDebug  = fixture.debugElement.queryAll(By.css('mat-toolbar-row mat-icon')).find((x) => x.nativeElement.innerText === "add");
            let addIconElement = addIconDebug.nativeElement;
            addIconDebug.triggerEventHandler('click', null);
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let addDialogDebug  = fixture.debugElement.query(By.css('mat-card-title'));
                let addDialogElement = addDialogDebug.nativeElement;
                expect(addDialogElement.text).toBe('Inscripciones.COLMAG>');
            });
        });
    });

});
