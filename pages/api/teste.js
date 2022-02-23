import formidable from "formidable";
import fs from "fs";
import csvtojson from "csvtojson";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = formidable({ multiples:true });

    form.parse(req, (err, fields, files) => {
        if(err) res.status(404).json({error: err});

        res.status(200).json({
            fields,
            files
        })

    });

};
