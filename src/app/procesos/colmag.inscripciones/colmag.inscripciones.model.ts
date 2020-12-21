export class ColmagInscripcionesModel {
    public ColmagInscripcionId: number = 0;
    public ColmagInscripcionFecha: Date;
    public ColmagInscripcionNombre: string;
    public ColmagInscripcionApellido: string;
    public ColmagInscripcionCedula: number;
    public ColmagInscripcionEdad: number;
    public ColmagCasaId: number;
    public ColmagCasas: any = {};
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColmagInscripcionId = json.ColmagInscripcionId;
            this.ColmagInscripcionFecha = json.ColmagInscripcionFecha;
            this.ColmagInscripcionNombre = json.ColmagInscripcionNombre;
            this.ColmagInscripcionApellido = json.ColmagInscripcionApellido;
            this.ColmagInscripcionCedula = json.ColmagInscripcionCedula;
            this.ColmagInscripcionEdad = json.ColmagInscripcionEdad;
            this.ColmagCasaId = json.ColmagCasaId;
            this.ColmagCasas = json.ColmagCasas;
        }
    }

    static clone(row: ColmagInscripcionesModel): ColmagInscripcionesModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;
        delete rowCloned.ColmagCasas;

        return rowCloned;
    }

    static cloneExcel(data: ColmagInscripcionesModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColmagInscripcionId: dato.ColmagInscripcionId,
              ColmagInscripcionFecha: dato.ColmagInscripcionFecha,
              ColmagInscripcionNombre: dato.ColmagInscripcionNombre,
              ColmagInscripcionApellido: dato.ColmagInscripcionApellido,
              ColmagInscripcionCedula: dato.ColmagInscripcionCedula,
              ColmagInscripcionEdad: dato.ColmagInscripcionEdad,
              ColmagCasaId: dato.ColmagCasaId,
              ColmagCasas:  dato.ColmagCasas

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColmagInscripcionId}`;
        result += `${separator}${this.ColmagInscripcionFecha}`;
        result += `${separator}${this.ColmagInscripcionNombre}`;
        result += `${separator}${this.ColmagInscripcionApellido}`;
        result += `${separator}${this.ColmagInscripcionCedula}`;
        result += `${separator}${this.ColmagInscripcionEdad}`;
        result += `${separator}${this.ColmagCasaId}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColmagInscripcionesModel {
        const result = value.split(separator);

        this.ColmagInscripcionId = parseInt(result[0]);
        this.ColmagInscripcionFecha = new Date(result[1]);
        this.ColmagInscripcionNombre = result[2];
        this.ColmagInscripcionApellido = result[3];
        this.ColmagInscripcionCedula = parseFloat(result[4]);
        this.ColmagInscripcionEdad = parseInt(result[5]);
        this.ColmagCasaId = parseInt(result[6]);

        return this;
    }

}
