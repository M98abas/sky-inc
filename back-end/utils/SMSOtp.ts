const accountSid = "AccountSId";
const authToken = "Token";
const client = require("twilio")(accountSid, authToken);

export default async function (data: any) {
  client.messages
    .create({ body: data.body, from: "+15017122661", to: data.toNumber })
    .then((message: any) => console.log(message.sid));
}
