import Mailjet from "node-mailjet";

const emailService = async (activatetoken, username, email) => {
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
  });

  await mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_EMAIL,
            Name: "Builder Vilage",
          },
          To: [
            {
              Email: `${email}`,
              Name: "tech bro",
            },
          ],

          Subject: "Builder Vilage Account Activation Link",
          TextPart: `Welcome to Builder Village! May the delivery force be with you!`,
          HTMLPart: `<div style="Background-color: smoke, padding: 3rem">
                  <h2 style="color:blue, font-size=1.1rem, margin-bottom:1rem;">Dear ${username}</h2>
                  <h3>Please Click on the click below to activate your account</h3>
                <a href="${process.env.CLIENT_URL}/authentication/activiate">${activatetoken}</a>
    
                </div>`,
        },
      ],
    })
    .then((result) => {
      //   console.log("mailjet status:", result.body.Messages[0]);
    })
    .catch((err) => {
      console.log("mail jet", err);
      return false;
    });
};

export default emailService;
