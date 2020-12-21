export class ColMagVaritaMagicaModel {
    public ColMagPersonajeId: number;
    public ColMagVaritaMagicaId: number;
    public ColMagVaritaMagicaComp: string;
    public Madera: string;
    public ColMagVaritaMagicaAlma: string;
    public ColMagVaritaMagicaLongitud: number = 0.0;
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColMagPersonajeId = json.ColMagPersonajeId;
            this.ColMagVaritaMagicaId = json.ColMagVaritaMagicaId;
            this.ColMagVaritaMagicaComp =  json.ColMagVaritaMagicaComp;
            this.Madera = json.Madera;
            this.ColMagVaritaMagicaAlma = json.ColMagVaritaMagicaAlma;
            this.ColMagVaritaMagicaLongitud = json.ColMagVaritaMagicaLongitud;
        }
    }

    static clone(row: ColMagVaritaMagicaModel): ColMagVaritaMagicaModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;

        return rowCloned;
    }

    static cloneExcel(data: ColMagVaritaMagicaModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColMagPersonajeId: dato.ColMagPersonajeId,
              ColMagVaritaMagicaId: dato.ColMagVaritaMagicaId,
              ColMagVaritaMagicaComp:  dato.ColMagVaritaMagicaComp,
              Madera: dato.Madera,
              ColMagVaritaMagicaAlma: dato.ColMagVaritaMagicaAlma,
              ColMagVaritaMagicaLongitud: dato.ColMagVaritaMagicaLongitud

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColMagPersonajeId}`;
        result += `${separator}${this.ColMagVaritaMagicaId}`;
        result += `${separator}${this.Madera}`;
        result += `${separator}${this.ColMagVaritaMagicaAlma}`;
        result += `${separator}${this.ColMagVaritaMagicaLongitud}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColMagVaritaMagicaModel {
        const result = value.split(separator);

        this.ColMagPersonajeId = parseInt(result[0]);
        this.ColMagVaritaMagicaId = parseInt(result[1]);
        this.Madera = result[2];
        this.ColMagVaritaMagicaAlma = result[3];
        this.ColMagVaritaMagicaLongitud = parseFloat(result[4]);

        return this;
    }

}
