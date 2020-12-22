// ColMagVaritaMagica - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColMagPersonajesModule } from '../colmag.personajes.module';
import { ColMagPersonajesModel } from '../colmag.personajes.model';
import { ColMagVaritaMagicaModel } from './colmag.varitamagica.model';
import { ColMagVaritaMagicaDialog } from './colmag.varitamagica.dialog';
import { ColMagVaritaMagicaService } from './colmag.varitamagica.service';
import { ColMagVaritaMagicaMockService } from './colmag.varitamagica.mockservice.spec';

describe('ColMagVaritaMagicaDialog', () => {
    let component: ColMagVaritaMagicaDialog;
    let fixture: ComponentFixture<ColMagVaritaMagicaDialog>;
    let service: ColMagVaritaMagicaService;
    let _service: ColMagVaritaMagicaService;
    let mockService: ColMagVaritaMagicaMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

    let rowBase = {
        ColMagPersonajeId: 1234,
        ColMagVaritaMagicaId: 1234,
        ColMagVaritaMagicaComp: '', //convert(varchar(max),ColMagPersonajeId) || '/' || convert(varchar(max),ColMagVaritaMagicaId) 
        ColMagVaritaMagicaMadera: `holly`,
        ColMagVaritaMagicaAlma: `phoenix feather`,
        ColMagVaritaMagicaLongitud: 11.00,
        _estado: ''
    };

    let colMagVaritaMagicaIdElement: DebugElement; 
    let colMagVaritaMagicaMaderaElement: DebugElement; 
    let colMagVaritaMagicaAlmaElement: DebugElement; 
    let colMagVaritaMagicaLongitudElement: DebugElement; 

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
                        selected: new ColMagVaritaMagicaModel(),
                        original: new ColMagVaritaMagicaModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new ColMagVaritaMagicaMockService();
        TestBed.overrideProvider(ColMagVaritaMagicaService, { useValue: mockService });
        service = TestBed.inject(ColMagVaritaMagicaService);

        fixture = TestBed.createComponent(ColMagVaritaMagicaDialog);
        _service = fixture.debugElement.injector.get(ColMagVaritaMagicaService);
        component = fixture.componentInstance;
        
        colMagVaritaMagicaIdElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagVaritaMagicaId"]')); 
        colMagVaritaMagicaMaderaElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagVaritaMagicaMadera"]')); 
        colMagVaritaMagicaAlmaElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagVaritaMagicaAlma"]')); 
        colMagVaritaMagicaLongitudElement = fixture.debugElement.query(By.css('input[formcontrolname="ColMagVaritaMagicaLongitud"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColMagVaritaMagicaMockService")
        expect(_service.constructor.name).toBe("ColMagVaritaMagicaMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colMagVaritaMagicaForm.controls.ColMagVaritaMagicaId.setValue(rowBase.ColMagVaritaMagicaId);
        component.colMagVaritaMagicaForm.controls.ColMagVaritaMagicaMadera.setValue(rowBase.ColMagVaritaMagicaMadera);
        component.colMagVaritaMagicaForm.controls.ColMagVaritaMagicaAlma.setValue(rowBase.ColMagVaritaMagicaAlma);
        component.colMagVaritaMagicaForm.controls.ColMagVaritaMagicaLongitud.setValue(rowBase.ColMagVaritaMagicaLongitud);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColMagPersonajeId).toBe(rowBase.ColMagPersonajeId);
        expect(row.ColMagVaritaMagicaId).toBe(rowBase.ColMagVaritaMagicaId);
        expect(row.ColMagVaritaMagicaAlma).toBe(rowBase.ColMagVaritaMagicaAlma);
        expect(row.ColMagVaritaMagicaLongitud).toBe(rowBase.ColMagVaritaMagicaLongitud);

    });


    it('should display a Dialog for Update', () => {

        component.selectedColMagVaritaMagica = new ColMagVaritaMagicaModel(rowBase);
        component.selectedColMagVaritaMagica._estado = 'O';
        component.originalColMagVaritaMagica = ColMagVaritaMagicaModel.clone(component.selectedColMagVaritaMagica);
        component.originalColMagVaritaMagica._estado = 'O';

        mockService.rows.push(component.selectedColMagVaritaMagica);
    
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
        expect(row.ColMagVaritaMagicaId).toBe(rowBase.ColMagVaritaMagicaId);
        expect(row.ColMagVaritaMagicaAlma).toBe(rowBase.ColMagVaritaMagicaAlma);
        expect(row.ColMagVaritaMagicaLongitud).toBe(rowBase.ColMagVaritaMagicaLongitud);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedColMagVaritaMagica = new ColMagVaritaMagicaModel(rowBase);
        component.selectedColMagVaritaMagica._estado = 'O';
        component.originalColMagVaritaMagica = ColMagVaritaMagicaModel.clone(component.selectedColMagVaritaMagica);
        component.originalColMagVaritaMagica._estado = 'O';

        mockService.rows.push(component.selectedColMagVaritaMagica);
    
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
