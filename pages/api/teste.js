import formidable from "formidable";
import fs from "fs";
import { parse } from "csv-parse";

export const config = {
    api: {
        bodyParser: false,
    },
};

const getMeses = () => {
    return [ '1','2','3','4','5','6','7','8','9','10','11','12' ]
}

const getCodigos = (dados) => {
    return dados.map( item => item[0] )
}

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

const getFilesDownlaod = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            resolve({err, fields, files});
        });
    });
};

export default async (req, res) => {
    var { err, fields, files } = await getFilesDownlaod(req);

    if(err) res.status(404).json({ error: err })

    var pathFile = files.dados.filepath

    var arrayCvs = await readFileCsv(pathFile)

    // Remove a primeira posicao
    arrayCvs.shift()

    console.log( getCodigos(arrayCvs) )


    res.status(200).json({
        dados: files.dados,
        isArray: Array.isArray(files.dados),
        csv: arrayCvs
    });

};
