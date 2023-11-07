import { JsonPipe } from "@angular/common";

export class Usuario 
{
    name : string;
    password : string;

    constructor(name : string, password: string)
    {
        this.name = name;
        this.password = password;
    }

    public guardarEnLocalStorage()
    {
        let listaUsuarios : Array<Usuario>;

        listaUsuarios = Usuario.obtenerLocalStorage();

        listaUsuarios.push(this);
        
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    }

    public static obtenerLocalStorage()
    {
        let jsonCargado = null;
        let usuarios : string | null = localStorage.getItem("listaUsuarios");

        if(usuarios != null)
        {
            jsonCargado = JSON.parse(usuarios)
        }
        else
        {
            jsonCargado = Array<Usuario>();
        }

        return jsonCargado;
    }

    static borrarStorage()
    {
        localStorage.removeItem("listaUsuario");
    }

}
