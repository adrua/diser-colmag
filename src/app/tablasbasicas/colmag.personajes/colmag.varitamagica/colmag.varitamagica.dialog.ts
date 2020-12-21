import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColMagVaritaMagicaService } from './colmag.varitamagica.service';
import { ColMagVaritaMagicaModel } from './colmag.varitamagica.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.varitamagica.dialog.html',
  // styleUrls: ['./colmag.varitamagica.dialog.css'],
  providers: [ColMagVaritaMagicaService]
})
export class ColMagVaritaMagicaDialog {
    selectedColMagVaritaMagica: ColMagVaritaMagicaModel;
    originalColMagVaritaMagica: ColMagVaritaMagicaModel;

    colMagVaritaMagicaForm: FormGroup;


    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colMagVaritaMagicaService: ColMagVaritaMagicaService,
                public dialogRef: MatDialogRef<ColMagVaritaMagicaDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        //this.selectedColMagPersonajes = navParams.get('ColMagPersonajes');

        this.selectedColMagVaritaMagica = data.selected;
        this.originalColMagVaritaMagica = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colMagVaritaMagicaForm = this.builder.group({
            'ColMagPersonajeId': [ this.selectedColMagVaritaMagica.ColMagPersonajeId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColMagVaritaMagicaId': [ this.selectedColMagVaritaMagica.ColMagVaritaMagicaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'Madera': [ this.selectedColMagVaritaMagica.Madera, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagVaritaMagicaAlma': [ this.selectedColMagVaritaMagica.ColMagVaritaMagicaAlma, [ Validators.required, Validators.maxLength(22), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagVaritaMagicaLongitud': [ this.selectedColMagVaritaMagica.ColMagVaritaMagicaLongitud, [ Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            '_estado': [ this.selectedColMagVaritaMagica._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.colMagVaritaMagicaForm.valueChanges.subscribe((data) => {

            this.colMagVaritaMagicaForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ColMagVaritaMagicaModel) {
        this._proc = true;
        if (this.colMagVaritaMagicaForm.valid) {
            formData = Object.assign(ColMagVaritaMagicaModel.clone(this.originalColMagVaritaMagica), formData);
            this.colMagVaritaMagicaService.save(formData, this.originalColMagVaritaMagica).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error && !data?.message;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalColMagVaritaMagica, formData);
                    if(formData._estado === 'N') {
                        formData.ColMagPersonajeId = data.ColMagPersonajeId;
                        formData.ColMagVaritaMagicaId = data.ColMagVaritaMagicaId;
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

    onDelete(formData: ColMagVaritaMagicaModel) {
        if (this.colMagVaritaMagicaForm.valid) {
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
                    this.colMagVaritaMagicaService.delete(this.selectedColMagVaritaMagica).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.error && !data?.message;
                        this.resultError = null;

                        if (this._status) {
                            this.originalColMagVaritaMagica._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalColMagVaritaMagica,
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
        Object.keys(this.colMagVaritaMagicaForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colMagVaritaMagicaForm.errors[key]}\n`;
        });

        let controls = this.colMagVaritaMagicaForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
