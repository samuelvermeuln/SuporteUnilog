// import { MongoClient, ServerApiVersion } from "mongodb";

const { MongoClient, ServerApiVersion }  = require('mongodb');

const uri = "mongodb+srv://unilog:unilog123@devprojetos.apxzm.mongodb.net/DevProjetos?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
    const collection = client.db("projeto-suporte").collection("conferencia");

    const all = collection.find();

    console.log(all.seedlist);

    client.close();
});
