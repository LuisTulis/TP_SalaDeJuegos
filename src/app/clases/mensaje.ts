import { Timestamp } from "firebase/firestore";

export class Mensaje 
{
    autor : string;
    timestamp : Timestamp;
    mensaje : string;

    constructor(autor : string, mensaje : string)
    {
        this.autor = autor;
        this.timestamp = Timestamp.now();
        this.mensaje = mensaje;
    }
}
