module.exports = {
    Login: function () {
        /**** Module ****/
        var soap = require('soap');
        /*Local Varible */
        // var url = 'https://apiqa.invoice4u.co.il/Services/ApiService.svc?singleWsdl';
        var url = 'https://apiqa.invoice4u.co.il/Services/ApiService.svc?0175605647';
        var soapHeader = ''//xml string for header
        var token = '';
        var params = {
            host: 'www.privateqa.invoice4u.co.il',
            path: '/Services/MeshulamService.svc',
            wsdl: '/Services/MeshulamService.svc?0175605647',
        }
        try {
            soap.createClient(params)

        } catch (error) {
            console.log("🚀 ~ file: invice4u.js ~ line 19 ~ error", error)

        }
        /*using Soap CLient*/
        soap.createClient(url, function (err, client) {
            client. addSoapHeader(soapHeader);
            /*Start LoginFunctions*/
            // var args = {
            // email: "Test@test.com",
            // password: "123456"
            // };
            var args = {
                email: 'giftmatching@gmail.com',
                password: 'matching'
            }
            client.VerifyLogin(args, function (err, result) {
                if (err) {
                    console.log("🚀 ~ file: invice4u.js ~ line 25 ~ err", err)
                    // throw err;
                }
                args = { token: result.VerifyLoginResult };
                /*End LoginFunctions*/

            });

        })
    }
}

