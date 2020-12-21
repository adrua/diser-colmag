import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertaComponent } from 'arkeos-components';

import { ColMagPersonajesService } from './colmag.personajes.service';
import { ColMagPersonajesModel } from './colmag.personajes.model';
//import { ColMagVaritaMagicaComponent } from './colmag.varitamagica';

declare var lastError: HttpErrorResponse;

@Component({
  templateUrl: './colmag.personajes.dialog.html',
  // styleUrls: ['./colmag.personajes.dialog.css'],
  providers: [ColMagPersonajesService]
})
export class ColMagPersonajesDialog {
    selectedColMagPersonajes: ColMagPersonajesModel;
    originalColMagPersonajes: ColMagPersonajesModel;

    colMagPersonajesForm: FormGroup;

    colMagCasaNombreCtrl: FormControl = new FormControl(["", [
        (control: AbstractControl): {[key: string]: any} | null => {
            const selected = !!control["selected"];
            let result = null;
            if (control.value !== "" && !selected) {
                result = {"colMagCasaNombreCtrl": true };
            }
            return result;
        }] ]);

    filteredColMagCasaNombre: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(public dialog: MatDialog, 
 		        private builder: FormBuilder,
                private colMagPersonajesService: ColMagPersonajesService,
                public dialogRef: MatDialogRef<ColMagPersonajesDialog>,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedColMagPersonajes = data.selected;
        this.originalColMagPersonajes = data.original;

        this.dialogRef.disableClose = true;
    }

    ngOnInit() {
        this.colMagPersonajesForm = this.builder.group({
            'ColMagPersonajeId': [ this.selectedColMagPersonajes.ColMagPersonajeId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColMagPersonajeNombre': [ this.selectedColMagPersonajes.ColMagPersonajeNombre, [ Validators.required, Validators.maxLength(75), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagPersonajeEspecie': [ this.selectedColMagPersonajes.ColMagPersonajeEspecie, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'Genero': [ this.selectedColMagPersonajes.Genero, [ Validators.required, Validators.maxLength(10), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColmagCasaId': [ this.selectedColMagPersonajes.ColmagCasaId, [ Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColMagPersonajeFechaNacimiento': [ this.selectedColMagPersonajes.ColMagPersonajeFechaNacimiento, [  ] ],
            'ColMagPersonajeAnoNacimiento': [ this.selectedColMagPersonajes.ColMagPersonajeAnoNacimiento, [ Validators.maxLength(4), Validators.pattern('^[0-9]+(\\.[0-9]*)?$') ] ],
            'ColMagPersonajeAscendencia': [ this.selectedColMagPersonajes.ColMagPersonajeAscendencia, [ Validators.required, Validators.maxLength(29), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagPersonajeColorOjos': [ this.selectedColMagPersonajes.ColMagPersonajeColorOjos, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagPersonajeColorCabello': [ this.selectedColMagPersonajes.ColMagPersonajeColorCabello, [ Validators.required, Validators.maxLength(20), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagPersonajePatronus': [ this.selectedColMagPersonajes.ColMagPersonajePatronus, [ Validators.maxLength(30) ] ],
            'ColMagPersonajeEstudiante': [ this.selectedColMagPersonajes.ColMagPersonajeEstudiante, [ Validators.required ] ],
            'ColMagPersonajeProfesor': [ this.selectedColMagPersonajes.ColMagPersonajeProfesor, [ Validators.required ] ],
            'ColMagPersonajeActor': [ this.selectedColMagPersonajes.ColMagPersonajeActor, [ Validators.required, Validators.maxLength(75), Validators.pattern('^([^\\s]|\\s[^\\s])+$') ] ],
            'ColMagPersonajeVive': [ this.selectedColMagPersonajes.ColMagPersonajeVive, [ Validators.required ] ],
            'ColMagPersonajeImagen': [ this.selectedColMagPersonajes.ColMagPersonajeImagen, [ Validators.required, Validators.pattern('^(http[s]?:\\/\\/)[a-zA-Z][a-zA-Z0-9\\-]*(\\.[a-zA-Z][a-zA-Z0-9\\-]*)+([\\?\\:\\/].*)?$') ] ],
            '_estado': [ this.selectedColMagPersonajes._estado, Validators.required ]
        }, {
                validators: (formGroup: FormGroup): ValidationErrors | null => {

                    let validationErrors: any = null;

                    return validationErrors;
                }
        });

        this.colMagCasaNombreCtrl.setValue(this.selectedColMagPersonajes.ColmagCasas?.ColMagCasaNombre || '');
        this.colMagCasaNombreCtrl["ColmagCasas"] = this.selectedColMagPersonajes.ColmagCasas;
        this.colMagCasaNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.colMagPersonajesService.filterColMagCasaNombre(data))
            ).subscribe((data) => this.filteredColMagCasaNombre = data.value);

        this.colMagPersonajesForm.valueChanges.subscribe((data) => {

            this.colMagPersonajesForm.patchValue({

            }, {emitEvent: false, onlySelf: true});
        });
    }

    onSubmit(formData: ColMagPersonajesModel) {
        this._proc = true;
        if (this.colMagPersonajesForm.valid) {
            formData = Object.assign(ColMagPersonajesModel.clone(this.originalColMagPersonajes), formData);
            this.colMagPersonajesService.save(formData, this.originalColMagPersonajes).subscribe((data: any) => {
                this._proc = false;
                this._status = !data?.error && !data?.message;
                this.resultError = null;

                if (this._status) {
                    formData = Object.assign(this.originalColMagPersonajes, formData);
                    if(formData._estado === 'N') {
                        formData.ColMagPersonajeId = data.ColMagPersonajeId;
                    }

                    formData.ColmagCasas = this.colMagCasaNombreCtrl["ColmagCasas"];
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

    onDelete(formData: ColMagPersonajesModel) {
        if (this.colMagPersonajesForm.valid) {
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
                    this.colMagPersonajesService.delete(this.selectedColMagPersonajes).subscribe((data: any) => {
                        this._proc = false;
                        this._status = !data?.error && !data?.message;
                        this.resultError = null;

                        if (this._status) {
                            this.originalColMagPersonajes._estado = 'D';
                            this.dialogRef.close({
                                data: this.originalColMagPersonajes,
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

    onKeydownColMagCasaNombre(e: Event) {
        this.colMagCasaNombreCtrl["selected"] = false;

        this.colMagPersonajesForm.patchValue({
            ColmagCasaId: null
        });
    }

    onSelectColMagCasaNombre(opt: any){
        this.colMagCasaNombreCtrl["selected"] = true;
        this.colMagCasaNombreCtrl["ColmagCasas"] = opt;

        this.colMagPersonajesForm.patchValue({
            ColmagCasaId: opt.ColmagCasaId
        });
    }

    getErrorMessages(): string {
        let errors = "";
        Object.keys(this.colMagPersonajesForm.errors || {}).forEach(key => {
            errors += `, ${key}: ${this.colMagPersonajesForm.errors[key]}\n`;
        });

        let controls = this.colMagPersonajesForm.controls;

        Object.keys(controls).forEach(key => {
            Object.keys(controls[key].errors || {}).forEach(errKey => {
                errors += `, ${key}: ${errKey}
`;
            });
        });

        return (errors || ', No hay errores. Listo para salvar').substr(2);
    }
}
