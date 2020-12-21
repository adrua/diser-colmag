// ColMagPersonajes - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColMagPersonajesModule } from './colmag.personajes.module';
import { ColMagPersonajesModel } from './colmag.personajes.model';
import { ColMagPersonajesService } from './colmag.personajes.service';
import { ColMagPersonajesMockService } from './colmag.personajes.mockservice.spec';
import { ColMagPersonajesDialog } from './colmag.personajes.dialog';

describe('ColMagPersonajesDialog', () => {
    let component: ColMagPersonajesDialog;
    let fixture: ComponentFixture<ColMagPersonajesDialog>;
    let service: ColMagPersonajesService;
    let _service: ColMagPersonajesService;
    let mockService: ColMagPersonajesMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        ColMagPersonajeId: 1234,
        ColMagPersonajeNombre: `Harry Potter`,
        ColMagPersonajeEspecie: `human`,
        Genero: `male`,
        ColmagCasaId: 178,
        ColMagPersonajeFechaNacimiento: new Date(1980, 7, 31, 12, 0, 0),
        ColMagPersonajeAnoNacimiento: 1980,
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

    let colMagPersonajeNombreElement: DebugElement; 
    let colMagPersonajeEspecieElement: DebugElement; 
    let generoElement: DebugElement; 
    let colMagPersonajeFechaNacimientoElement: DebugElement; 
    let colMagPersonajeAnoNacimientoElement: DebugElement; 
    let colMagPersonajeAscendenciaElement: DebugElement; 
    let colMagPersonajeColorOjosElement: DebugElement; 
    let colMagPersonajeColorCabelloElement: DebugElement; 
    let colMagPersonajePatronusElement: DebugElement; 
    let colMagPersonajeEstudianteElement: DebugElement; 
    let colMagPersonajeProfesorElement: DebugElement; 
    let colMagPersonajeActorElement: DebugElement; 
    let colMagPersonajeViveElement: DebugElement; 
    let colMagPersonajeImagenElement: DebugElement; 
    let colmagCasasCtrlElement: DebugElement; 

    let btnGuardarElement: DebugElement;
    let btnEliminarElement: DebugElement;
    let btnCancelarElement: DebugElement;
    
    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                ColMagPersonajesModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new ColMagPersonajesModel(),
                        original: new ColMagPersonajesModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new ColMagPersonajesMockService();
        TestBed.overrideProvider(ColMagPersonajesService, { useValue: mockService });
        service = TestBed.inject(ColMagPersonajesService);

        fixture = TestBed.createComponent(ColMagPersonajesDialog);
        _service = fixture.debugElement.injector.get(ColMagPersonajesService);
        component = fixture.componentInstance;
        
        colMagPersonajeNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeNombre"]')); 
        colMagPersonajeEspecieElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeEspecie"]')); 
        generoElement = fixture.debugElement.query(By.css('input[formcontrolname="Genero"]')); 
        colMagPersonajeFechaNacimientoElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeFechaNacimiento"]')); 
        colMagPersonajeAnoNacimientoElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeAnoNacimiento"]')); 
        colMagPersonajeAscendenciaElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeAscendencia"]')); 
        colMagPersonajeColorOjosElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeColorOjos"]')); 
        colMagPersonajeColorCabelloElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeColorCabello"]')); 
        colMagPersonajePatronusElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajePatronus"]')); 
        colMagPersonajeEstudianteElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="ColMagPersonajeEstudiante"]')); 
        colMagPersonajeProfesorElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="ColMagPersonajeProfesor"]')); 
        colMagPersonajeActorElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeActor"]')); 
        colMagPersonajeViveElement = fixture.debugElement.query(By.css('mat-checkbox[formcontrolname="ColMagPersonajeVive"]')); 
        colMagPersonajeImagenElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagPersonajeImagen"]')); 
        colmagCasasCtrlElement = fixture.debugElement.query(By.css('input[formcontrolname="colMagCasaNombreCtrl"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColMagPersonajesMockService")
        expect(_service.constructor.name).toBe("ColMagPersonajesMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colMagPersonajesForm.controls.ColMagPersonajeNombre.setValue(rowBase.ColMagPersonajeNombre);
        component.colMagPersonajesForm.controls.ColMagPersonajeEspecie.setValue(rowBase.ColMagPersonajeEspecie);
        component.colMagPersonajesForm.controls.Genero.setValue(rowBase.Genero);
        component.colMagPersonajesForm.controls.ColMagPersonajeColorOjos.setValue(rowBase.ColMagPersonajeColorOjos);
        component.colMagPersonajesForm.controls.ColMagPersonajeColorCabello.setValue(rowBase.ColMagPersonajeColorCabello);
        component.colMagPersonajesForm.controls.ColMagPersonajeEstudiante.setValue(rowBase.ColMagPersonajeEstudiante);
        component.colMagPersonajesForm.controls.ColMagPersonajeProfesor.setValue(rowBase.ColMagPersonajeProfesor);
        component.colMagPersonajesForm.controls.ColMagPersonajeActor.setValue(rowBase.ColMagPersonajeActor);
        component.colMagPersonajesForm.controls.ColMagPersonajeVive.setValue(rowBase.ColMagPersonajeVive);
        component.colMagPersonajesForm.controls.ColMagPersonajeImagen.setValue(rowBase.ColMagPersonajeImagen);
        component.onSelectColMagCasaNombre(rowBase.ColmagCasas);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colMagPersonajesForm.controls.ColMagPersonajeFechaNacimiento.setValue(rowBase.ColMagPersonajeFechaNacimiento);
        component.colMagPersonajesForm.controls.ColMagPersonajeAnoNacimiento.setValue(rowBase.ColMagPersonajeAnoNacimiento);
        component.colMagPersonajesForm.controls.ColMagPersonajeAscendencia.setValue(rowBase.ColMagPersonajeAscendencia);
        component.colMagPersonajesForm.controls.ColMagPersonajePatronus.setValue(rowBase.ColMagPersonajePatronus);

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();
        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColMagPersonajeId).toBe(mockService.autoincrement);
        expect(row.ColMagPersonajeNombre).toBe(rowBase.ColMagPersonajeNombre);
        expect(row.ColMagPersonajeEspecie).toBe(rowBase.ColMagPersonajeEspecie);
        expect(row.Genero).toBe(rowBase.Genero);
        expect(row.ColmagCasaId).toBe(rowBase.ColmagCasaId);
        expect(row.ColMagPersonajeFechaNacimiento).toBe(rowBase.ColMagPersonajeFechaNacimiento);
        expect(row.ColMagPersonajeAnoNacimiento).toBe(rowBase.ColMagPersonajeAnoNacimiento);
        expect(row.ColMagPersonajeAscendencia).toBe(rowBase.ColMagPersonajeAscendencia);
        expect(row.ColMagPersonajeColorOjos).toBe(rowBase.ColMagPersonajeColorOjos);
        expect(row.ColMagPersonajeColorCabello).toBe(rowBase.ColMagPersonajeColorCabello);
        expect(row.ColMagPersonajePatronus).toBe(rowBase.ColMagPersonajePatronus);
        expect(row.ColMagPersonajeEstudiante).toBe(rowBase.ColMagPersonajeEstudiante);
        expect(row.ColMagPersonajeProfesor).toBe(rowBase.ColMagPersonajeProfesor);
        expect(row.ColMagPersonajeActor).toBe(rowBase.ColMagPersonajeActor);
        expect(row.ColMagPersonajeVive).toBe(rowBase.ColMagPersonajeVive);
        expect(row.ColMagPersonajeImagen).toBe(rowBase.ColMagPersonajeImagen);

    });


    it('should display a Dialog for Update', () => {

        component.selectedColMagPersonajes = new ColMagPersonajesModel(rowBase);
        component.selectedColMagPersonajes._estado = 'O';
        component.originalColMagPersonajes = ColMagPersonajesModel.clone(component.selectedColMagPersonajes);
        component.originalColMagPersonajes._estado = 'O';

        mockService.rows.push(component.selectedColMagPersonajes);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColMagPersonajeId).toBe(rowBase.ColMagPersonajeId);
        expect(row.ColMagPersonajeNombre).toBe(rowBase.ColMagPersonajeNombre);
        expect(row.ColMagPersonajeEspecie).toBe(rowBase.ColMagPersonajeEspecie);
        expect(row.Genero).toBe(rowBase.Genero);
        expect(row.ColmagCasaId).toBe(rowBase.ColmagCasaId);
        expect(row.ColMagPersonajeFechaNacimiento).toBe(rowBase.ColMagPersonajeFechaNacimiento);
        expect(row.ColMagPersonajeAnoNacimiento).toBe(rowBase.ColMagPersonajeAnoNacimiento);
        expect(row.ColMagPersonajeAscendencia).toBe(rowBase.ColMagPersonajeAscendencia);
        expect(row.ColMagPersonajeColorOjos).toBe(rowBase.ColMagPersonajeColorOjos);
        expect(row.ColMagPersonajeColorCabello).toBe(rowBase.ColMagPersonajeColorCabello);
        expect(row.ColMagPersonajePatronus).toBe(rowBase.ColMagPersonajePatronus);
        expect(row.ColMagPersonajeEstudiante).toBe(rowBase.ColMagPersonajeEstudiante);
        expect(row.ColMagPersonajeProfesor).toBe(rowBase.ColMagPersonajeProfesor);
        expect(row.ColMagPersonajeActor).toBe(rowBase.ColMagPersonajeActor);
        expect(row.ColMagPersonajeVive).toBe(rowBase.ColMagPersonajeVive);
        expect(row.ColMagPersonajeImagen).toBe(rowBase.ColMagPersonajeImagen);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedColMagPersonajes = new ColMagPersonajesModel(rowBase);
        component.selectedColMagPersonajes._estado = 'O';
        component.originalColMagPersonajes = ColMagPersonajesModel.clone(component.selectedColMagPersonajes);
        component.originalColMagPersonajes._estado = 'O';

        mockService.rows.push(component.selectedColMagPersonajes);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnEliminarElement.triggerEventHandler('click', null);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dialogDiv = document.querySelector('alertas-component');
            const okButton = dialogDiv.querySelector('button.change') as HTMLElement;
       
            mockMatDialogRef.close = (data) => {
                expect(mockService.rows.length).toBe(0, 'No se elimino la fila');
                expect(data.delete).toBeTruthy('No se elimino la fila');
                return null;
            };

            okButton.click();
        });
        
    });

});
