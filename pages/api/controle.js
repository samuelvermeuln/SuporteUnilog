import fs from "fs";
import path from "path";

export default async (req, res) => {

    const { action } = req.body
    if(!action) res.status(404).json({ error: "Informe a ação." })

    const validateActions = [ 'LISTAR', 'DELETAR' ]
    const isValidAction = validateActions.includes(action)
    if( !isValidAction ) res.status(404).json({error: "Ação informada invalida."})

    const uploadPath = '/app/upload'

    if( action == 'LISTAR' ){
        try {
            const arquivos = fs.readdirSync(uploadPath);
            res.status(200).json({ arquivos })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if( action == 'DELETAR' ){
        try {
            const arquivosDeletar = fs.readdirSync(uploadPath).map( item => path.join( uploadPath, item ) );
            for (const arquivo of arquivosDeletar) {
                fs.unlinkSync(arquivo)
            }
            res.status(200).json({ message: "Deletados com sucesso." })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

}
