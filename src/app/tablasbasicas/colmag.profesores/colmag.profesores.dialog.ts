import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColmagProfesoresService } from './colmag.profesores.service';
import { ColmagProfesoresModel } from './colmag.profesores.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.profesores.dialog.html',
  styleUrls: ['./colmag.profesores.dialog.css'],
  providers: [ColmagProfesoresService]
})
export class ColmagProfesoresDialog {
    selectedColmagProfesores: ColmagProfesoresModel;
    originalColmagProfesores: ColmagProfesoresModel;

    colmagProfesoresForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colmagProfesoresService: ColmagProfesoresService,
                public dialogRef: MatDialogRef<ColmagProfesoresDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedColmagProfesores = data.selected;
        this.originalColmagProfesores = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colmagProfesoresForm = this.builder.group({
            'ColmagProfesorId': [ this.selectedColmagProfesores.ColmagProfesorId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagProfesorNombre': [ this.selectedColmagProfesores.ColmagProfesorNombre, [ Validators.required, Validators.maxLength(62), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagProfesorPatronus': [ this.selectedColmagProfesores.ColmagProfesorPatronus, [ Validators.required, Validators.maxLength(30), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagProfesorEdad': [ this.selectedColmagProfesores.ColmagProfesorEdad, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagProfesorImagen': [ this.selectedColmagProfesores.ColmagProfesorImagen, [ Validators.required, Validators.pattern('^(http[s]?:\\/\\/)[a-zA-Z][a-zA-Z0-9\\-]*(\\.[a-zA-Z][a-zA-Z0-9\\-]*)+([\\?\\:\\/].*)?$') ] ],
            '_estado': [ this.selectedColmagProfesores._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.colmagProfesoresForm.disable();
    }

    openNotificationDanger(titulo: string, mensaje: string) { 
        const dialogRef = this.dialog.open(AlertaComponent, { 
            data: {            
                tipo: 'error',
                titulo: titulo, 
                mensaje: mensaje
            }
        });

        dialogRef.afterClosed().subscribe(result => { 
            if (!result.data) {
                this.dialogRef.close(); 
            }
        });             
    }

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.colmagProfesoresForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colmagProfesoresForm.errors[key]}\n`;
        });

        let controls = this.colmagProfesoresForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
