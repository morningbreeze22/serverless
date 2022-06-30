const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const plaintext = (req.query.plaintext || (req.body && req.body.plaintext));
    const responseMessage = plaintext
        ? morse.textToMorse(plaintext)
        : "Please enter some text to  convert!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}