const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const resp = await fetch("https://bit-cat.azurewebsites.net/cat/says/serverless", {
        method: 'GET'
    });
    
    const data = await resp.arrayBuffer();
    var base64data = Buffer.from(data).toString("base64"); 

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { base64data }
    };
}