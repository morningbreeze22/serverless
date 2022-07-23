const multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body;
    let the_header_value = req.headers['codename'];
    let responseMessage ="";

    try{
        const parsedBody = multipart.Parse(body, boundary);

        let filetype = parsedBody[0].type;
        let ext;
        if (filetype == "image/png") {
            ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpeg";
        } else if (filetype == "image/jpg") {
            ext = "jpg"
        } else {
            username = "invalidimage";
            ext = "";
        }
        responseMessage = await uploadFile(parsedBody, the_header_value, ext);
    }catch(err){
        context.log("Undefined body image");
        responseMessage = "Sorry! No image attached.";
    }
  
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}


async function uploadFile(parsedBody, file_name, ext){
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container
    const blobName = file_name + "." + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    return "file saved";
}