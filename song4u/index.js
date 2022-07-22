const querystring = require("qs");
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);

    let url = queryObject.MediaUrl0;
    let resp = await fetch(url,{
        method: "GET",
    });

    let data = await resp.arrayBuffer();
    const result = await analyzeImage(data);
    let age = result[0].faceAttributes.age;

    let id = "Unknown";
    if(age>5 && age<25){
        id = "Genz";
    }
    else if(age>24 && age<41){
        id = "GenY";
    }
    else if(age>40 && age<57){
        id = "GenX";
    }
    else if(age>56 && age<76){
        id = "BabyBommers";
    }

    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: id,
    };
    context.log(id);
    context.done();
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + 'face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'    
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
      
      	//ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();
    
    return data; 
}
