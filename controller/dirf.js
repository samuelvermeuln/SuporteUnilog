import formidable from "formidable";
import fs from "fs";
import { parse } from "csv-parse";

const getFilesDownlaod = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            resolve({err, fields, files});
        });
    });
};

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

const getMeses = () => {
    return [ '1','2','3','4','5','6','7','8','9','10','11','12' ]
}

const getCodigos = (dados) => {
    return [...new Set( dados.map( item => item[0] ) )]
}

const getCnpjEmpresas = (dados) => {
    return [...new Set( dados.map( item => item[2] ) )]
}

const getNomeEmpresa = (cnpj, dados) => {
    let busca = dados.filter( item => item[2] === cnpj )
    return busca[0][3]
}

const isEmpresaCodigo = (codigo, empresa, dados) => {
    let busca = dados.filter( item => item[2] === empresa && item[0] === codigo )
    return busca.length != 0 ? true : false
}

const buscaDadosSoma = ( codigo, cnpj,  mes, dados ) => {
    let busca = dados.filter( y => y[0] === codigo && y[1] === mes && y[2] === cnpj  )
    if( busca.length === 0 ) return ['', '']
    let conta = [0, 0]
    busca.map(item => {
        conta[0] += parseFloat( item[4].replace(',', '.') )
        conta[1] += parseFloat( item[5].replace(',', '.') )
    })
    conta[0] = conta[0].toFixed(2)
    conta[1] = conta[1].toFixed(2)
    return conta
}


export {
    readFileCsv,
    getFilesDownlaod,
    getMeses,
    getCodigos,
    getCnpjEmpresas,
    getNomeEmpresa,
    isEmpresaCodigo,
    buscaDadosSoma
}
