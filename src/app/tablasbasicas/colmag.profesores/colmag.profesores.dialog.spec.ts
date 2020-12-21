// ColmagProfesores - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColmagProfesoresModule } from './colmag.profesores.module';
import { ColmagProfesoresModel } from './colmag.profesores.model';
import { ColmagProfesoresService } from './colmag.profesores.service';
import { ColmagProfesoresMockService } from './colmag.profesores.mockservice.spec';
import { ColmagProfesoresDialog } from './colmag.profesores.dialog';

describe('ColmagProfesoresDialog', () => {
    let component: ColmagProfesoresDialog;
    let fixture: ComponentFixture<ColmagProfesoresDialog>;
    let service: ColmagProfesoresService;
    let _service: ColmagProfesoresService;
    let mockService: ColmagProfesoresMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        ColmagProfesorId: 1234,
        ColmagProfesorNombre: `Harry............... Potter`,
        ColmagProfesorPatronus: `Algo`,
        ColmagProfesorEdad: 18,
        ColmagProfesorImagen: `http://wwww.imagenes.com`,
        _estado: ''
    };

    let colmagProfesorIdElement: DebugElement; 
    let colmagProfesorNombreElement: DebugElement; 
    let colmagProfesorPatronusElement: DebugElement; 
    let colmagProfesorEdadElement: DebugElement; 
    let colmagProfesorImagenElement: DebugElement; 

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
                ColmagProfesoresModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new ColmagProfesoresModel(),
                        original: new ColmagProfesoresModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new ColmagProfesoresMockService();
        TestBed.overrideProvider(ColmagProfesoresService, { useValue: mockService });
        service = TestBed.inject(ColmagProfesoresService);

        fixture = TestBed.createComponent(ColmagProfesoresDialog);
        _service = fixture.debugElement.injector.get(ColmagProfesoresService);
        component = fixture.componentInstance;
        
        colmagProfesorIdElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagProfesorId"]')); 
        colmagProfesorNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagProfesorNombre"]')); 
        colmagProfesorPatronusElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagProfesorPatronus"]')); 
        colmagProfesorEdadElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagProfesorEdad"]')); 
        colmagProfesorImagenElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagProfesorImagen"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColmagProfesoresMockService")
        expect(_service.constructor.name).toBe("ColmagProfesoresMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colmagProfesoresForm.controls.ColmagProfesorId.setValue(rowBase.ColmagProfesorId);
        component.colmagProfesoresForm.controls.ColmagProfesorNombre.setValue(rowBase.ColmagProfesorNombre);
        component.colmagProfesoresForm.controls.ColmagProfesorPatronus.setValue(rowBase.ColmagProfesorPatronus);
        component.colmagProfesoresForm.controls.ColmagProfesorEdad.setValue(rowBase.ColmagProfesorEdad);
        component.colmagProfesoresForm.controls.ColmagProfesorImagen.setValue(rowBase.ColmagProfesorImagen);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagProfesorId).toBe(rowBase.ColmagProfesorId);
        expect(row.ColmagProfesorNombre).toBe(rowBase.ColmagProfesorNombre);
        expect(row.ColmagProfesorPatronus).toBe(rowBase.ColmagProfesorPatronus);
        expect(row.ColmagProfesorEdad).toBe(rowBase.ColmagProfesorEdad);
        expect(row.ColmagProfesorImagen).toBe(rowBase.ColmagProfesorImagen);

    });


    it('should display a Dialog for Update', () => {

        component.selectedColmagProfesores = new ColmagProfesoresModel(rowBase);
        component.selectedColmagProfesores._estado = 'O';
        component.originalColmagProfesores = ColmagProfesoresModel.clone(component.selectedColmagProfesores);
        component.originalColmagProfesores._estado = 'O';

        mockService.rows.push(component.selectedColmagProfesores);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagProfesorId).toBe(rowBase.ColmagProfesorId);
        expect(row.ColmagProfesorNombre).toBe(rowBase.ColmagProfesorNombre);
        expect(row.ColmagProfesorPatronus).toBe(rowBase.ColmagProfesorPatronus);
        expect(row.ColmagProfesorEdad).toBe(rowBase.ColmagProfesorEdad);
        expect(row.ColmagProfesorImagen).toBe(rowBase.ColmagProfesorImagen);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedColmagProfesores = new ColmagProfesoresModel(rowBase);
        component.selectedColmagProfesores._estado = 'O';
        component.originalColmagProfesores = ColmagProfesoresModel.clone(component.selectedColmagProfesores);
        component.originalColmagProfesores._estado = 'O';

        mockService.rows.push(component.selectedColmagProfesores);
    
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
