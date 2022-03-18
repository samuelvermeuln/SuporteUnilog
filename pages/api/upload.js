import { getFilesDownlaod, readFileCsv } from "../../controller/dirf";
import Conferencia from "../../db/models/Conferencia"

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    try {
        var { error, fields, files } = await getFilesDownlaod(req);

        if(error) return res.status(404).json( { error } )

        // Pega o path do arquivo.
        var mimetype = files.dados.mimetype
        if( mimetype !== 'text/csv' ) return res.status(404).json({ error: "Tipo de arquivo não aceito." })

        var pathFile = files.dados.filepath;
        var fileName = files.dados.originalFilename

        var codigo   = fileName.replace('.csv', '')
        var pedidos = await readFileCsv(pathFile);
        pedidos.shift();

        const buscaOnda = await Conferencia.findOne( { codigo: codigo } )
        if( buscaOnda ) return res.status(404).json({ error: "Onda ja esta importada." })

        const onda = {
            codigo,
            pedidos
        }

        const importNewOnda = await Conferencia.create(onda)

        return res.status(201).json({
            onda: importNewOnda
        })
    } catch (error) {
        res.status(500).json({error})
    }

}
