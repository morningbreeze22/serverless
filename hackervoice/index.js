module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const psw = (req.query.password || (req.body && req.body.password));
    const responseMessage = psw
        ? psw
        : "This HTTP triggered function executed successfully. Pass a password in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}