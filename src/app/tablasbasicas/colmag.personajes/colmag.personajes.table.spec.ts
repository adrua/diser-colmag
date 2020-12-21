// ColMagPersonajes - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ColMagPersonajesModule } from './colmag.personajes.module';
import { ColMagPersonajesModel } from './colmag.personajes.model';
import { ColMagPersonajesService } from './colmag.personajes.service';
import { ColMagPersonajesMockService } from './colmag.personajes.mockservice.spec';
import { ColMagPersonajesTable } from './colmag.personajes.table';

describe('ColMagPersonajes_Table', () => {
    let component: ColMagPersonajesTable;
    let fixture: ComponentFixture<ColMagPersonajesTable>;
    let service: ColMagPersonajesService;
    let _service: ColMagPersonajesService;
    let mockService: ColMagPersonajesMockService;

    let rowBase = {
        ColMagPersonajeId: 1234,
        ColMagPersonajeNombre: `Harry Potter`,
        ColMagPersonajeEspecie: `human`,
        Genero: `male`,
        ColmagCasaId: 178,
        ColMagPersonajeFechaNacimiento: new Date(1980, 7, 31, 12, 0, 0),
        AnoNacimiento: 1980,
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

    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                ColMagPersonajesModule
            ]
        });

        mockService = new ColMagPersonajesMockService();
        TestBed.overrideProvider(ColMagPersonajesService, { useValue: mockService });
        service = TestBed.inject(ColMagPersonajesService);

        fixture = TestBed.createComponent(ColMagPersonajesTable);
        _service = fixture.debugElement.injector.get(ColMagPersonajesService);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColMagPersonajesMockService")
        expect(_service.constructor.name).toBe("ColMagPersonajesMockService")
    });

    it('should display a rows', () => {
        fixture.detectChanges();
        expect(component.resultsLength).toBe(0);

        mockService.rows.push(new ColMagPersonajesModel(rowBase));
        mockService.rows.push(new ColMagPersonajesModel(rowBase));

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
                expect(addDialogElement.text).toBe('Personajes.ColMag>');
            });
        });
    });

});
