const fetch = require('node-fetch');



module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //let namelist = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];

    async function getpic(name){
        const resp = await fetch("https://cataas.com/cat/says/"+name, {
            method: 'GET'
        });
        
        const data = await resp.arrayBuffer();
        var base64data = Buffer.from(data).toString("base64"); 
        return base64data;
    }


    const body = req.body;
    const name1 = req.query.name1;
    const name2 = req.query.name2;
    const name3 = req.query.name3;
    const name4 = req.query.name4;

    let pic1 = await getpic(name1);
    let pic2 = await getpic(name2);
    let pic3 = await getpic(name3);
    let pic4 = await getpic(name4);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { 
            cat1: pic1,
            cat2: pic2,
            cat3: pic3,
            cat4: pic4,
        }
    };
}