import mongoose from "../database";

const Conferencia =  mongoose.model('Conferencia', {
    codigo: String,
    pedidos: Array
})

export default Conferencia;
