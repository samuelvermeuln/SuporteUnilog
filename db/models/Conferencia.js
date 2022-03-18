import mongoose from "../database";

const Objeto_Conferencia = {
    codigo: String,
    pedidos: Array
}

const Conferencia = mongoose.models.Conferencia || mongoose.model('Conferencia', Objeto_Conferencia);

export default Conferencia;
