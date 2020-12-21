// ColmagEstudiantes - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColmagEstudiantesModule } from './colmag.estudiantes.module';
import { ColmagEstudiantesModel } from './colmag.estudiantes.model';
import { ColmagEstudiantesService } from './colmag.estudiantes.service';
import { ColmagEstudiantesMockService } from './colmag.estudiantes.mockservice.spec';
import { ColmagEstudiantesDialog } from './colmag.estudiantes.dialog';

describe('ColmagEstudiantesDialog', () => {
    let component: ColmagEstudiantesDialog;
    let fixture: ComponentFixture<ColmagEstudiantesDialog>;
    let service: ColmagEstudiantesService;
    let _service: ColmagEstudiantesService;
    let mockService: ColmagEstudiantesMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        ColmagEstudianteId: 1234,
        ColmagEstudianteNombre: `Harry............... Potter`,
        ColmagEstudiantePatronus: `Algo`,
        ColmagEstudianteEdad: 18,
        ColmagEstudianteImagen: `http://wwww.imagenes.com`,
        _estado: ''
    };

    let colmagEstudianteIdElement: DebugElement; 
    let colmagEstudianteNombreElement: DebugElement; 
    let colmagEstudiantePatronusElement: DebugElement; 
    let colmagEstudianteEdadElement: DebugElement; 
    let colmagEstudianteImagenElement: DebugElement; 

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
                ColmagEstudiantesModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new ColmagEstudiantesModel(),
                        original: new ColmagEstudiantesModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new ColmagEstudiantesMockService();
        TestBed.overrideProvider(ColmagEstudiantesService, { useValue: mockService });
        service = TestBed.inject(ColmagEstudiantesService);

        fixture = TestBed.createComponent(ColmagEstudiantesDialog);
        _service = fixture.debugElement.injector.get(ColmagEstudiantesService);
        component = fixture.componentInstance;
        
        colmagEstudianteIdElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagEstudianteId"]')); 
        colmagEstudianteNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagEstudianteNombre"]')); 
        colmagEstudiantePatronusElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagEstudiantePatronus"]')); 
        colmagEstudianteEdadElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagEstudianteEdad"]')); 
        colmagEstudianteImagenElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagEstudianteImagen"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColmagEstudiantesMockService")
        expect(_service.constructor.name).toBe("ColmagEstudiantesMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colmagEstudiantesForm.controls.ColmagEstudianteId.setValue(rowBase.ColmagEstudianteId);
        component.colmagEstudiantesForm.controls.ColmagEstudianteNombre.setValue(rowBase.ColmagEstudianteNombre);
        component.colmagEstudiantesForm.controls.ColmagEstudiantePatronus.setValue(rowBase.ColmagEstudiantePatronus);
        component.colmagEstudiantesForm.controls.ColmagEstudianteEdad.setValue(rowBase.ColmagEstudianteEdad);
        component.colmagEstudiantesForm.controls.ColmagEstudianteImagen.setValue(rowBase.ColmagEstudianteImagen);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagEstudianteId).toBe(rowBase.ColmagEstudianteId);
        expect(row.ColmagEstudianteNombre).toBe(rowBase.ColmagEstudianteNombre);
        expect(row.ColmagEstudiantePatronus).toBe(rowBase.ColmagEstudiantePatronus);
        expect(row.ColmagEstudianteEdad).toBe(rowBase.ColmagEstudianteEdad);
        expect(row.ColmagEstudianteImagen).toBe(rowBase.ColmagEstudianteImagen);

    });


    it('should display a Dialog for Update', () => {

        component.selectedColmagEstudiantes = new ColmagEstudiantesModel(rowBase);
        component.selectedColmagEstudiantes._estado = 'O';
        component.originalColmagEstudiantes = ColmagEstudiantesModel.clone(component.selectedColmagEstudiantes);
        component.originalColmagEstudiantes._estado = 'O';

        mockService.rows.push(component.selectedColmagEstudiantes);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagEstudianteId).toBe(rowBase.ColmagEstudianteId);
        expect(row.ColmagEstudianteNombre).toBe(rowBase.ColmagEstudianteNombre);
        expect(row.ColmagEstudiantePatronus).toBe(rowBase.ColmagEstudiantePatronus);
        expect(row.ColmagEstudianteEdad).toBe(rowBase.ColmagEstudianteEdad);
        expect(row.ColmagEstudianteImagen).toBe(rowBase.ColmagEstudianteImagen);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedColmagEstudiantes = new ColmagEstudiantesModel(rowBase);
        component.selectedColmagEstudiantes._estado = 'O';
        component.originalColmagEstudiantes = ColmagEstudiantesModel.clone(component.selectedColmagEstudiantes);
        component.originalColmagEstudiantes._estado = 'O';

        mockService.rows.push(component.selectedColmagEstudiantes);
    
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
