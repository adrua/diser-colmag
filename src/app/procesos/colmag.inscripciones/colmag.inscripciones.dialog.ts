import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColmagInscripcionesService } from './colmag.inscripciones.service';
import { ColmagInscripcionesModel } from './colmag.inscripciones.model';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.inscripciones.dialog.html',
  // styleUrls: ['./colmag.inscripciones.dialog.css'],
  providers: [ColmagInscripcionesService]
})
export class ColmagInscripcionesDialog {
    selectedColmagInscripciones: ColmagInscripcionesModel;
    originalColmagInscripciones: ColmagInscripcionesModel;

    colmagInscripcionesForm: FormGroup;

    colmagCasaNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"colmagCasaNombreCtrl": true };
            }
            return result;
        }] ]);

    filteredColmagCasaNombre: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colmagInscripcionesService: ColmagInscripcionesService,
                public dialogRef: MatDialogRef<ColmagInscripcionesDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedColmagInscripciones = data.selected;
        this.originalColmagInscripciones = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colmagInscripcionesForm = this.builder.group({
            'ColmagInscripcionId': [ this.selectedColmagInscripciones.ColmagInscripcionId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagInscripcionFecha': [ this.selectedColmagInscripciones.ColmagInscripcionFecha, [ Validators.required ] ],
            'ColmagInscripcionNombre': [ this.selectedColmagInscripciones.ColmagInscripcionNombre, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagInscripcionApellido': [ this.selectedColmagInscripciones.ColmagInscripcionApellido, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagInscripcionCedula': [ this.selectedColmagInscripciones.ColmagInscripcionCedula, [ Validators.required, Validators.maxLength(16), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagInscripcionEdad': [ this.selectedColmagInscripciones.ColmagInscripcionEdad, [ Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColmagCasaId': [ this.selectedColmagInscripciones.ColmagCasaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            '_estado': [ this.selectedColmagInscripciones._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    const data = formGroup.getRawValue();

                    let validationErrors: any = null;

                    if(!(data.COLMAGInscripcionEdad < 6)) {
                        validationErrors = validationErrors || {};
                        validationErrors["COLMAGInscripcionEdad_7"] = "Edad debe ser mayor > 6";
                    }

                    if(!(data.COLMAGInscripcionFecha < new Date())) {
                        validationErrors = validationErrors || {};
                        validationErrors["COLMAGInscripcionFecha_8"] = "Fecha debe ser superior a hoy";
                    }

                    return validationErrors;
                }
        });

        this.colmagCasaNombreCtrl.setValue(this.selectedColmagInscripciones.ColmagCasas?.ColmagCasaNombre || '');
        this.colmagCasaNombreCtrl["ColmagCasas"] = this.selectedColmagInscripciones.ColmagCasas;
        this.colmagCasaNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.colmagInscripcionesService.filterColmagCasaNombre(data))
            ).subscribe((data) => this.filteredColmagCasaNombre = data.value);

        this.colmagInscripcionesForm.valueChanges.subscribe((data) => {

            this.colmagInscripcionesForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ColmagInscripcionesModel) {
        this._proc = true;
        if (this.colmagInscripcionesForm.valid) {
            formData = Object.assign(ColmagInscripcionesModel.clone(this.originalColmagInscripciones), formData);
            this.colmagInscripcionesService.save(formData, this.originalColmagInscripciones).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error && !data?.message;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalColmagInscripciones, formData);
                    if(formData._estado === 'N') {
                        formData.ColmagInscripcionId = data.ColmagInscripcionId;
                    }

                    formData.ColmagCasas = this.colmagCasaNombreCtrl["ColmagCasas"];
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

    onDelete(formData: ColmagInscripcionesModel) {
        if (this.colmagInscripcionesForm.valid) {
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
                    this.colmagInscripcionesService.delete(this.selectedColmagInscripciones).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.error && !data?.message;
                        this.resultError = null;

                        if (this._status) {
                            this.originalColmagInscripciones._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalColmagInscripciones,
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

    onKeydownColmagCasaNombre(e: Event) {
        this.colmagCasaNombreCtrl["selected"] = false;

        this.colmagInscripcionesForm.patchValue({
            ColmagCasaId: null
        });
    }

    onSelectColmagCasaNombre(opt: any){
        this.colmagCasaNombreCtrl["selected"] = true;
        this.colmagCasaNombreCtrl["ColmagCasas"] = opt;

        this.colmagInscripcionesForm.patchValue({
            ColmagCasaId: opt.ColmagCasaId
        });
    }

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.colmagInscripcionesForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colmagInscripcionesForm.errors[key]}\n`;
        });

        let controls = this.colmagInscripcionesForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
