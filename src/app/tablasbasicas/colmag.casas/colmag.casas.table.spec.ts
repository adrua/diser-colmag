// ColmagCasas - Table - Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ColmagCasasModule } from './colmag.casas.module';
import { ColmagCasasModel } from './colmag.casas.model';
import { ColmagCasasService } from './colmag.casas.service';
import { ColmagCasasMockService } from './colmag.casas.mockservice.spec';
import { ColmagCasasTable } from './colmag.casas.table';

describe('ColmagCasas_Table', () => {
    let component: ColmagCasasTable;
    let fixture: ComponentFixture<ColmagCasasTable>;
    let service: ColmagCasasService;
    let _service: ColmagCasasService;
    let mockService: ColmagCasasMockService;

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

    beforeAll(() => {
        sessionStorage.setItem("token", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODMyZTQ1MS1iNzljLTRlMGUtODFmNi1jMDg5MjkzYmM1ZDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImViNjZlNDUzLTZkZWQtNDVkMi1iNDIxLTE0ODk3M2IzN2FkMCIsImdpdmVuX25hbWUiOiJDcmlzdGlhbiBCcm9jaGVybyIsImlkIjoiZWI2NmU0NTMtNmRlZC00NWQyLWI0MjEtMTQ4OTczYjM3YWQwIiwibWFpbCI6ImNyaXN0aWFuYnJvY2hlcm9yQGdtYWlsLmNvbSIsImV4cCI6MTU5NjY1NTY1MywiaXNzIjoiaHR0cDovL3lvdXJkb21haW4uY29tIiwiYXVkIjoiaHR0cDovL3lvdXJkb21haW4uY29tIn0.5KKYGhDyRW6q0ucWG3WBcdag3RNRZEKeX7gT-MAWbAY`);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                ColmagCasasModule
            ]
        });

        mockService = new ColmagCasasMockService();
        TestBed.overrideProvider(ColmagCasasService, { useValue: mockService });
        service = TestBed.inject(ColmagCasasService);

        fixture = TestBed.createComponent(ColmagCasasTable);
        _service = fixture.debugElement.injector.get(ColmagCasasService);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeDefined();
        expect(service.constructor.name).toBe("ColmagCasasMockService")
        expect(_service.constructor.name).toBe("ColmagCasasMockService")
    });

    it('should display a rows', () => {
        fixture.detectChanges();
        expect(component.resultsLength).toBe(0);

        mockService.rows.push(new ColmagCasasModel(rowBase));
        mockService.rows.push(new ColmagCasasModel(rowBase));

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
                expect(addDialogElement.text).toBe('Casas.COLMAG>');
            });
        });
    });

});
