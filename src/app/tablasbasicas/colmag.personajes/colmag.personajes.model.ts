import { ColMagVaritaMagicaModel } from './colmag.varitamagica/colmag.varitamagica.model';

export class ColMagPersonajesModel {
    public ColMagPersonajeId: number = 0;
    public ColMagPersonajeNombre: string;
    public ColMagPersonajeEspecie: string;
    public Genero: string;
    public ColmagCasaId: number;
    public ColMagPersonajeFechaNacimiento: Date;
    public AnoNacimiento: number;
    public ColMagPersonajeAscendencia: string;
    public ColMagPersonajeColorOjos: string;
    public ColMagPersonajeColorCabello: string;
    public ColMagPersonajePatronus: string;
    public ColMagPersonajeEstudiante: Boolean;
    public ColMagPersonajeProfesor: Boolean;
    public ColMagPersonajeActor: string;
    public ColMagPersonajeVive: Boolean;
    public ColMagPersonajeImagen: string;
    public ColmagCasas: any = {};
    public ColMagVaritaMagica: Array<ColMagVaritaMagicaModel> = [];
    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ColMagPersonajeId = json.ColMagPersonajeId;
            this.ColMagPersonajeNombre = json.ColMagPersonajeNombre;
            this.ColMagPersonajeEspecie = json.ColMagPersonajeEspecie;
            this.Genero = json.Genero;
            this.ColmagCasaId = json.ColmagCasaId;
            this.ColMagPersonajeFechaNacimiento = json.ColMagPersonajeFechaNacimiento;
            this.AnoNacimiento = json.AnoNacimiento;
            this.ColMagPersonajeAscendencia = json.ColMagPersonajeAscendencia;
            this.ColMagPersonajeColorOjos = json.ColMagPersonajeColorOjos;
            this.ColMagPersonajeColorCabello = json.ColMagPersonajeColorCabello;
            this.ColMagPersonajePatronus = json.ColMagPersonajePatronus;
            this.ColMagPersonajeEstudiante = json.ColMagPersonajeEstudiante;
            this.ColMagPersonajeProfesor = json.ColMagPersonajeProfesor;
            this.ColMagPersonajeActor = json.ColMagPersonajeActor;
            this.ColMagPersonajeVive = json.ColMagPersonajeVive;
            this.ColMagPersonajeImagen = json.ColMagPersonajeImagen;
            this.ColmagCasas = json.ColmagCasas;
            this.ColMagVaritaMagica = json.ColMagVaritaMagica;
        }
    }

    static clone(row: ColMagPersonajesModel): ColMagPersonajesModel {
        const rowCloned = Object.assign({}, row);

        delete rowCloned._secuencia;
        delete rowCloned._estado;
        delete rowCloned._id;
        delete rowCloned._v;
        delete rowCloned.ColmagCasas;
        delete rowCloned.ColMagVaritaMagica;

        return rowCloned;
    }

    static cloneExcel(data: ColMagPersonajesModel[]): any[] {		 
       let dataExcel: any[] = [];		 
       data.forEach(dato => {		 
           let registro = {		 

              ColMagPersonajeId: dato.ColMagPersonajeId,
              ColMagPersonajeNombre: dato.ColMagPersonajeNombre,
              ColMagPersonajeEspecie: dato.ColMagPersonajeEspecie,
              Genero: dato.Genero,
              ColmagCasaId: dato.ColmagCasaId,
              ColMagPersonajeFechaNacimiento: dato.ColMagPersonajeFechaNacimiento,
              AnoNacimiento: dato.AnoNacimiento,
              ColMagPersonajeAscendencia: dato.ColMagPersonajeAscendencia,
              ColMagPersonajeColorOjos: dato.ColMagPersonajeColorOjos,
              ColMagPersonajeColorCabello: dato.ColMagPersonajeColorCabello,
              ColMagPersonajePatronus: dato.ColMagPersonajePatronus,
              ColMagPersonajeEstudiante: dato.ColMagPersonajeEstudiante,
              ColMagPersonajeProfesor: dato.ColMagPersonajeProfesor,
              ColMagPersonajeActor: dato.ColMagPersonajeActor,
              ColMagPersonajeVive: dato.ColMagPersonajeVive,
              ColMagPersonajeImagen: dato.ColMagPersonajeImagen,
              ColmagCasas:  dato.ColmagCasas

            };		 
            dataExcel.push(registro);		 
       });		 
       return dataExcel;		 
    }
   
    toClipboard(separator: string = '\t'): string {
        let result = '';

        result += `${separator}${this.ColMagPersonajeId}`;
        result += `${separator}${this.ColMagPersonajeNombre}`;
        result += `${separator}${this.ColMagPersonajeEspecie}`;
        result += `${separator}${this.Genero}`;
        result += `${separator}${this.ColmagCasaId}`;
        result += `${separator}${this.ColMagPersonajeFechaNacimiento}`;
        result += `${separator}${this.AnoNacimiento}`;
        result += `${separator}${this.ColMagPersonajeAscendencia}`;
        result += `${separator}${this.ColMagPersonajeColorOjos}`;
        result += `${separator}${this.ColMagPersonajeColorCabello}`;
        result += `${separator}${this.ColMagPersonajePatronus}`;
        result += `${separator}${this.ColMagPersonajeEstudiante}`;
        result += `${separator}${this.ColMagPersonajeProfesor}`;
        result += `${separator}${this.ColMagPersonajeActor}`;
        result += `${separator}${this.ColMagPersonajeVive}`;
        result += `${separator}${this.ColMagPersonajeImagen}`;

        return result.substring(separator.length);
    }

    fromClipboard(value: string, separator: string = '\t'): ColMagPersonajesModel {
        const result = value.split(separator);

        this.ColMagPersonajeId = parseInt(result[0]);
        this.ColMagPersonajeNombre = result[1];
        this.ColMagPersonajeEspecie = result[2];
        this.Genero = result[3];
        this.ColmagCasaId = parseInt(result[4]);
        this.ColMagPersonajeFechaNacimiento = new Date(result[5]);
        this.AnoNacimiento = parseInt(result[6]);
        this.ColMagPersonajeAscendencia = result[7];
        this.ColMagPersonajeColorOjos = result[8];
        this.ColMagPersonajeColorCabello = result[9];
        this.ColMagPersonajePatronus = result[10];
        this.ColMagPersonajeEstudiante = new Boolean(result[11]);
        this.ColMagPersonajeProfesor = new Boolean(result[12]);
        this.ColMagPersonajeActor = result[13];
        this.ColMagPersonajeVive = new Boolean(result[14]);
        this.ColMagPersonajeImagen = result[15];

        return this;
    }

}
