export class ColmagCasasModel {
    public ColmagCasaId: number = 0;
    public ColmagCasaNombre: string;
    public ColmagCasaDescripcion: string;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColmagCasaId = json.ColmagCasaId;
            this.ColmagCasaNombre = json.ColmagCasaNombre;
            this.ColmagCasaDescripcion = json.ColmagCasaDescripcion;
        }
    }

    static clone(row: ColmagCasasModel): ColmagCasasModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: ColmagCasasModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColmagCasaId: dato.ColmagCasaId,
              ColmagCasaNombre: dato.ColmagCasaNombre,
              ColmagCasaDescripcion: dato.ColmagCasaDescripcion

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColmagCasaId}`;
        result += `${separator}${this.ColmagCasaNombre}`;
        result += `${separator}${this.ColmagCasaDescripcion}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColmagCasasModel {
        const result = value.split(separator);

        this.ColmagCasaId = parseInt(result[0]);
        this.ColmagCasaNombre = result[1];
        this.ColmagCasaDescripcion = result[2];

        return this;
    }

}
