module.exports = {

    async authSms (req, res) {
        const accountSid = "ACfe3ecfee03e774e1b9cc8ac0477c6974";
        const authToken = "6151e241ac1daf2884d22eb2e323cc2e";
        const client = require('twilio')(accountSid, authToken);
        const phone = req.body.phone 
        const code = req.body.code
        console.log("Enviando mensagem...")
        client.messages
        .create({
            body: `Code: ${code}}`,
            from: '+18158638240',
            to: phone
        })
        .then(message => console.log(message.sid))
        .catch(error => console.log(error));
        
        res.write("teste")
        res.end()
    }
   
}