
import Conferencia from "../../db/models/Conferencia"

export default async (req, res) => {
    try {
        const { codigo } = req.query;
        if (!codigo) return res.status(404).json({ error: "Codigo da onda não informado, na url query." })

        const buscaOnda = await Conferencia.findOne({ codigo: codigo })
        if (!buscaOnda) return res.status(404).json({ error: "Onda ainda não foi carregada. Peça ao suporte para enviar a onda." })

        return res.status(200).json({
            onda: buscaOnda
        })

    } catch (error) {
        return res.status(500).json({ error })
    }
}
