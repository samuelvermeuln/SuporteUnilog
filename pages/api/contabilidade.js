import {
    getFilesDownlaod,
    readFileCsv,
    buscaDadosSoma,
    getCnpjEmpresas,
    getCodigos,
    getMeses,
    getNomeEmpresa,
    isEmpresaCodigo,
} from "../../controller/dirf";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    var { err, fields, files } = await getFilesDownlaod(req);

    if (err) res.status(404).json({ error: err });

    // Pega o path do arquivo.
    var pathFile = files.dados.filepath;
    console.log(pathFile);

    // Faz a leitura do csv no arquivo temporario.
    var arrayCvs = await readFileCsv(pathFile);

    // Remove a primeira posicao.
    arrayCvs.shift();

    // Info Iniciais.
    const codigos = getCodigos(arrayCvs).sort();
    const empresas = getCnpjEmpresas(arrayCvs).sort();
    const meses = getMeses();

    for (const codigo of codigos) {
        for (const empresa of empresas) {
            let existe = isEmpresaCodigo(codigo, empresa, arrayCvs);
            if (!existe) continue;
            console.log(
                `Codigo: ${codigo} Empresa: ${empresa} Existe: ${existe}`
            );
        }
    }

    res.status(200).json({
        dados: files.dados,
        isArray: Array.isArray(files.dados),
        csv: arrayCvs,
        enviar: true
    });
};
