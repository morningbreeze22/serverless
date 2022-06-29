const fetch = require('node-fetch');



module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let namelist = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];

    async function getpic(){
        const resp = await fetch("https://bit-cat.azurewebsites.net/cat/says/serverless", {
            method: 'GET'
        });
        
        const data = await resp.arrayBuffer();
        var base64data = Buffer.from(data).toString("base64"); 
        return base64data;
    }

    function getRandomName(namelist){
        let idx = Math.floor(namelist.length * Math.random());
        let resultName = namelist[idx];
        return resultName;
    }
    let name1 = getRandomName(namelist);
    let name2 = getRandomName(namelist);

    let pic1 = await getpic();
    let pic2 = await getpic();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { 
            cat1: pic1,
            cat2: pic2,
            names: [name1, name2]
        }
    };
}