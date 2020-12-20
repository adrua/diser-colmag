// ColmagCasas - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColmagCasasModule } from './colmag.casas.module';
import { ColmagCasasModel } from './colmag.casas.model';
import { ColmagCasasService } from './colmag.casas.service';
import { ColmagCasasMockService } from './colmag.casas.mockservice.spec';
import { ColmagCasasDialog } from './colmag.casas.dialog';

describe('ColmagCasasDialog', () => {
    let component: ColmagCasasDialog;
    let fixture: ComponentFixture<ColmagCasasDialog>;
    let service: ColmagCasasService;
    let _service: ColmagCasasService;
    let mockService: ColmagCasasMockService;

    let mockMatDialogRef = {
        close: (data: any) => null
    };

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

    let colmagCasaNombreElement: DebugElement; 
    let colmagCasaDescripcionElement: DebugElement; 

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
                ColmagCasasModule
            ],
            providers: [
                { 
                    provide: MAT_DIALOG_DATA, useValue: {
                        selected: new ColmagCasasModel(),
                        original: new ColmagCasasModel()
                    } 
                },
                { provide: MatDialogRef, useValue: mockMatDialogRef}
            ]
        });

        mockService = new ColmagCasasMockService();
        TestBed.overrideProvider(ColmagCasasService, { useValue: mockService });
        service = TestBed.inject(ColmagCasasService);

        fixture = TestBed.createComponent(ColmagCasasDialog);
        _service = fixture.debugElement.injector.get(ColmagCasasService);
        component = fixture.componentInstance;
        
        colmagCasaNombreElement = fixture.debugElement.query(By.css('input[formcontrolname="ColmagCasaNombre"]')); 
        colmagCasaDescripcionElement = fixture.debugElement.query(By.css('textarea[formcontrolname="ColmagCasaDescripcion"]')); 


        let buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button')); 
        btnGuardarElement = buttons[0]; 
        btnEliminarElement = buttons[1];
        btnCancelarElement = buttons[2];

    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColmagCasasMockService")
        expect(_service.constructor.name).toBe("ColmagCasasMockService")
    });

    it('should display a Dialog for Add', () => {
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(btnGuardarElement.nativeElement.disabled).toBeTruthy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colmagCasasForm.controls.ColmagCasaNombre.setValue(rowBase.ColmagCasaNombre);

        fixture.detectChanges();

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        component.colmagCasasForm.controls.ColmagCasaDescripcion.setValue(rowBase.ColmagCasaDescripcion);

        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");

        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeTruthy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();
        
        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagCasaId).toBe(mockService.autoincrement);
        expect(row.ColmagCasaNombre).toBe(rowBase.ColmagCasaNombre);
        expect(row.ColmagCasaDescripcion).toBe(rowBase.ColmagCasaDescripcion);

    });


    it('should display a Dialog for Update', () => {

        component.selectedColmagCasas = new ColmagCasasModel(rowBase);
        component.selectedColmagCasas._estado = 'O';
        component.originalColmagCasas = ColmagCasasModel.clone(component.selectedColmagCasas);
        component.originalColmagCasas._estado = 'O';

        mockService.rows.push(component.selectedColmagCasas);
    
        component.ngOnInit();
        fixture.detectChanges();
        
        expect(component.getErrorMessages()).toBe("No hay errores. Listo para salvar");
        expect(btnGuardarElement.nativeElement.disabled).toBeFalsy();
        expect(btnEliminarElement.nativeElement.disabled).toBeFalsy();
        expect(btnCancelarElement.nativeElement.disabled).toBeFalsy();

        btnGuardarElement.triggerEventHandler('click', null);

        expect(mockService.rows.length).toBe(1, 'No se guardo la fila');
        
        let row = mockService.rows[0];
        expect(row.ColmagCasaId).toBe(rowBase.ColmagCasaId);
        expect(row.ColmagCasaNombre).toBe(rowBase.ColmagCasaNombre);
        expect(row.ColmagCasaDescripcion).toBe(rowBase.ColmagCasaDescripcion);

    });

    it('should display a Dialog for Delete', () => {

        component.selectedColmagCasas = new ColmagCasasModel(rowBase);
        component.selectedColmagCasas._estado = 'O';
        component.originalColmagCasas = ColmagCasasModel.clone(component.selectedColmagCasas);
        component.originalColmagCasas._estado = 'O';

        mockService.rows.push(component.selectedColmagCasas);
    
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
