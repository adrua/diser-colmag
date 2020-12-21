export class ColmagEstudiantesModel {
    public ColmagEstudianteId: number;
    public ColmagEstudianteNombre: string;
    public ColmagEstudiantePatronus: string;
    public ColmagEstudianteEdad: number;
    public ColmagEstudianteImagen: string;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColmagEstudianteId = json.ColMagPersonajeId;
            this.ColmagEstudianteNombre = json.ColMagPersonajeNombre;
            this.ColmagEstudiantePatronus = json.ColMagPersonajePatronus;
            this.ColmagEstudianteEdad = new Date().getFullYear() - json.ColMagPersonajeAnoNacimiento;
            this.ColmagEstudianteImagen = json.ColMagPersonajeImagen;
        }
    }

    static clone(row: ColmagEstudiantesModel): ColmagEstudiantesModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: ColmagEstudiantesModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColmagEstudianteId: dato.ColmagEstudianteId,
              ColmagEstudianteNombre: dato.ColmagEstudianteNombre,
              ColmagEstudiantePatronus: dato.ColmagEstudiantePatronus,
              ColmagEstudianteEdad: dato.ColmagEstudianteEdad,
              ColmagEstudianteImagen: dato.ColmagEstudianteImagen

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColmagEstudianteId}`;
        result += `${separator}${this.ColmagEstudianteNombre}`;
        result += `${separator}${this.ColmagEstudiantePatronus}`;
        result += `${separator}${this.ColmagEstudianteEdad}`;
        result += `${separator}${this.ColmagEstudianteImagen}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColmagEstudiantesModel {
        const result = value.split(separator);

        this.ColmagEstudianteId = parseInt(result[0]);
        this.ColmagEstudianteNombre = result[1];
        this.ColmagEstudiantePatronus = result[2];
        this.ColmagEstudianteEdad = parseInt(result[3]);
        this.ColmagEstudianteImagen = result[4];

        return this;
    }

}
