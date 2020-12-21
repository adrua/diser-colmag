import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColmagEstudiantesService } from './colmag.estudiantes.service';
import { ColmagEstudiantesModel } from './colmag.estudiantes.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.estudiantes.dialog.html',
  // styleUrls: ['./colmag.estudiantes.dialog.css'],
  providers: [ColmagEstudiantesService]
})
export class ColmagEstudiantesDialog {
    selectedColmagEstudiantes: ColmagEstudiantesModel;
    originalColmagEstudiantes: ColmagEstudiantesModel;

    colmagEstudiantesForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colmagEstudiantesService: ColmagEstudiantesService,
                public dialogRef: MatDialogRef<ColmagEstudiantesDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedColmagEstudiantes = data.selected;
        this.originalColmagEstudiantes = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colmagEstudiantesForm = this.builder.group({
            'ColmagEstudianteId': [ this.selectedColmagEstudiantes.ColmagEstudianteId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagEstudianteNombre': [ this.selectedColmagEstudiantes.ColmagEstudianteNombre, [ Validators.required, Validators.maxLength(62), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagEstudiantePatronus': [ this.selectedColmagEstudiantes.ColmagEstudiantePatronus, [ Validators.required, Validators.maxLength(30), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagEstudianteEdad': [ this.selectedColmagEstudiantes.ColmagEstudianteEdad, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagEstudianteImagen': [ this.selectedColmagEstudiantes.ColmagEstudianteImagen, [ Validators.required, Validators.pattern('^(http[s]?:\\/\\/)[a-zA-Z][a-zA-Z0-9\\-]*(\\.[a-zA-Z][a-zA-Z0-9\\-]*)+([\\?\\:\\/].*)?$') ] ],
            '_estado': [ this.selectedColmagEstudiantes._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.colmagEstudiantesForm.valueChanges.subscribe((data) => {

            this.colmagEstudiantesForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ColmagEstudiantesModel) {
        this._proc = true;
        if (this.colmagEstudiantesForm.valid) {
            formData = Object.assign(ColmagEstudiantesModel.clone(this.originalColmagEstudiantes), formData);
            this.colmagEstudiantesService.save(formData, this.originalColmagEstudiantes).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error && !data?.message;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalColmagEstudiantes, formData);
                    if(formData._estado === 'N') {
                        formData.ColmagEstudianteId = data.ColmagEstudianteId;
                    }

                    this.dialogRef.close({
                        data: formData
                    });
                } else {
                   this.resultError = data.error?.value || data.message;
                   this.openNotificationDanger('Error al salvar', this.resultError)
                }
            });
        }
    }

    onDelete(formData: ColmagEstudiantesModel) {
        if (this.colmagEstudiantesForm.valid) {
            const dialogRef = this.dialog.open(AlertaComponent, {
               data: {
                    tipo: 'error', 
                    titulo: 'Confirmar', 
                    mensaje: '¿Está seguro de eliminar el registro seleccionado?' 
               }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result.data) {
                    this._proc = true;
                    this.colmagEstudiantesService.delete(this.selectedColmagEstudiantes).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.error && !data?.message;
                        this.resultError = null;

                        if (this._status) {
                            this.originalColmagEstudiantes._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalColmagEstudiantes,
                                delete: true
                            });
                        } else {
                            this.resultError = data.error?.value || data.message;
                            this.openNotificationDanger('Error al eliminar', this.resultError)
                        }
                    });
                }
            });
        }
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
        Object.keys(this.colmagEstudiantesForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colmagEstudiantesForm.errors[key]}\n`;
        });

        let controls = this.colmagEstudiantesForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
