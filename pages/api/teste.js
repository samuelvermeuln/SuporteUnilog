import formidable from "formidable";
import fs from "fs";
import csvtojson from "csvtojson";

import { promisify } from "util";

export const config = {
    api: {
        bodyParser: false,
    },
};

const getFilesDownlaod = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) reject({error: err});
            if(!files.dados) reject({ error: "Chave de dados não encontrada" });
            resolve(files);
        });
    });
};

export default async (req, res) => {
    var isErro = false;
    var files = await getFilesDownlaod(req);



    res.status(200).json({
        dados: files.dados,
        isArray: Array.isArray(files.dados),
    });
};
