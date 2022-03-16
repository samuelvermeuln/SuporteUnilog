import formidable from "formidable";
import fs from "fs";

const getFilesDownlaod = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({
            multiples: true,
            uploadDir: '/app/upload'
        });
        form.on('file', function(field, file) {
            fs.renameSync(file.filepath, form.uploadDir + "\\" + file.originalFilename);
        });
        form.parse(req, (err, fields, files) => {
            resolve({err, fields, files});
        });
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    try {
        var { err, fields, files } = await getFilesDownlaod(req);
        if(err) res.status(404).json({ error: err })
        res.status(200).json({ fields, files });
    } catch (error) {
        res.status(500).json(error)
    }
}
