import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColmagCasasService } from './colmag.casas.service';
import { ColmagCasasModel } from './colmag.casas.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.casas.dialog.html',
  // styleUrls: ['./colmag.casas.dialog.css'],
  providers: [ColmagCasasService]
})
export class ColmagCasasDialog {
    selectedColmagCasas: ColmagCasasModel;
    originalColmagCasas: ColmagCasasModel;

    colmagCasasForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colmagCasasService: ColmagCasasService,
                public dialogRef: MatDialogRef<ColmagCasasDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedColmagCasas = data.selected;
        this.originalColmagCasas = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colmagCasasForm = this.builder.group({
            'ColmagCasaId': [ this.selectedColmagCasas.ColmagCasaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagCasaNombre': [ this.selectedColmagCasas.ColmagCasaNombre, [ Validators.required, Validators.maxLength(50), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagCasaDescripcion': [ this.selectedColmagCasas.ColmagCasaDescripcion, [ Validators.maxLength(752) ] ],
            '_estado': [ this.selectedColmagCasas._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.colmagCasasForm.valueChanges.subscribe((data) => {

            this.colmagCasasForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ColmagCasasModel) {
        this._proc = true;
        if (this.colmagCasasForm.valid) {
            formData = Object.assign(ColmagCasasModel.clone(this.originalColmagCasas), formData);
            this.colmagCasasService.save(formData, this.originalColmagCasas).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error && !data?.message;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalColmagCasas, formData);
                    if(formData._estado === 'N') {
                        formData.ColmagCasaId = data.ColmagCasaId;
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

    onDelete(formData: ColmagCasasModel) {
        if (this.colmagCasasForm.valid) {
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
                    this.colmagCasasService.delete(this.selectedColmagCasas).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.error && !data?.message;
                        this.resultError = null;

                        if (this._status) {
                            this.originalColmagCasas._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalColmagCasas,
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
        Object.keys(this.colmagCasasForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colmagCasasForm.errors[key]}\n`;
        });

        let controls = this.colmagCasasForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
