import fs from "fs";
import { parse } from "csv-parse";
import path from "path";

const readFileCsv = (path) => {
    return new Promise((resolve, reject) => {
        var csvData = []
        fs.createReadStream(path)
            .pipe(parse({delimiter: ','}))
                .on('data', function(csvrow) {
                    csvData.push(csvrow);
                })
                .on('end',function() {
                    resolve(csvData);
                });
    })
}

export default async (req, res) => {

    try {

        const { numero_onda } = req.body
        if( !numero_onda ) res.status(404).json({ error: "Informe o numero da onda." })

        const uploadPath = '/app/upload'
        const arquivos = fs.readdirSync(uploadPath);

        const isExistsOnda = arquivos.includes( numero_onda + '.csv' )
        if(!isExistsOnda) res.status(404).json({ error: "Onda não encontrada. Informe a onda para o suporte, subir o arquivo de verificação da onda." })

        const pathArquivoOnda = path.join( uploadPath, numero_onda + '.csv' )
        const dados = await readFileCsv(pathArquivoOnda)

        // Remove a primeira posicao do array
        dados.shift()

        res.status(200).json( { pedidos: dados } );
    } catch (error) {
        res.status(500).json( { error } );
    }

}
