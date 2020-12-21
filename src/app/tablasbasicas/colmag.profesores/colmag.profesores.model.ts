export class ColmagProfesoresModel {
    public ColmagProfesorId: number;
    public ColmagProfesorNombre: string;
    public ColmagProfesorPatronus: string;
    public ColmagProfesorEdad: number;
    public ColmagProfesorImagen: string;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColmagProfesorId = json.ColmagProfesorId;
            this.ColmagProfesorNombre = json.ColmagProfesorNombre;
            this.ColmagProfesorPatronus = json.ColmagProfesorPatronus;
            this.ColmagProfesorEdad = json.ColmagProfesorEdad;
            this.ColmagProfesorImagen = json.ColmagProfesorImagen;
        }
    }

    static clone(row: ColmagProfesoresModel): ColmagProfesoresModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: ColmagProfesoresModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColmagProfesorId: dato.ColmagProfesorId,
              ColmagProfesorNombre: dato.ColmagProfesorNombre,
              ColmagProfesorPatronus: dato.ColmagProfesorPatronus,
              ColmagProfesorEdad: dato.ColmagProfesorEdad,
              ColmagProfesorImagen: dato.ColmagProfesorImagen

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColmagProfesorId}`;
        result += `${separator}${this.ColmagProfesorNombre}`;
        result += `${separator}${this.ColmagProfesorPatronus}`;
        result += `${separator}${this.ColmagProfesorEdad}`;
        result += `${separator}${this.ColmagProfesorImagen}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColmagProfesoresModel {
        const result = value.split(separator);

        this.ColmagProfesorId = parseInt(result[0]);
        this.ColmagProfesorNombre = result[1];
        this.ColmagProfesorPatronus = result[2];
        this.ColmagProfesorEdad = parseInt(result[3]);
        this.ColmagProfesorImagen = result[4];

        return this;
    }

}
