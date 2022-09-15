import colors from 'colors';
import { Tarea } from "./tarea.js";

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) =>{
            const idx = i + 1;
            console.log(`  ${(idx + '.').green} ${tarea.desc} :: ${
                (tarea.completadoEn != null) ? 'Completada'.green : 'Pendiente'.red}`);
        });
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        if(completadas){
            const tareasCompletadas = this.listadoArr.filter(tarea => tarea.completadoEn != null);
            tareasCompletadas.forEach((tarea, i) =>{
                const idx = i + 1;
                console.log(`  ${(idx + '.').green} ${tarea.desc} :: ${ tarea.completadoEn.green }`);
            });
        }else {
            const tareasPendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);
            tareasPendientes.forEach((tarea, i) =>{
                const idx = i + 1;
                console.log(`  ${(idx + '.').green} ${tarea.desc} :: ${ 'Pendiente'.red }`);
            });
        }
    }

    toggleCompletadas (ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export { Tareas };