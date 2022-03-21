import Conferencia from "../../db/models/Conferencia";
import NextCors from "nextjs-cors";

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const { codigo } = req.query;
        if (!codigo)
            return res
                .status(404)
                .json({ error: "Codigo da onda não informado, na url query." });

        const buscaOnda = await Conferencia.findOne({ codigo: codigo });
        if (!buscaOnda)
            return res
                .status(404)
                .json({
                    error: "Onda ainda não foi carregada. Peça ao suporte para enviar a onda.",
                });

        return res.status(200).json({
            onda: buscaOnda,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
