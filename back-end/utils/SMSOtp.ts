const accountSid = "AccountSId";
const authToken = "Token";
// const client = require("twilio")
import * as twilio from "twilio";
const client = twilio(accountSid, authToken);

export default async function (message: any, to: any) {
  client.messages
    .create({ body: message, from: "+12563641871", to })
    .then((message: any) => console.log(message.sid));
}
