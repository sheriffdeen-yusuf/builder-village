import Mailjet from "node-mailjet";

const sendForgetPasswordLink = async (resetToken, username, email) => {
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

          Subject: "Builder Vilage Reset Password Link",
          TextPart: `Welcome to Builder Village! May the delivery force be with you!`,
          HTMLPart: `<div style="Background-color: smoke, padding: 3rem">
                  <h2 style="color:blue, font-size=1.1rem, margin-bottom:1rem;">Dear ${username}, you have requested for a 
                  reset password. kindly ignore if you didnt initiate this call.</h2>
                  <h3>Please Click on the click below to reset your password</h3>
                <a href="${process.env.CLIENT_URL}/reset-password/">${resetToken}</a>
    
                </div>`,
        },
      ],
    })
    .then((result) => {
      //   console.log("mailjet status:", result.body.Messages[0]);
    })
    .catch((err) => {
      console.log("mail-jet: Reset-password error: ", err);
      return false;
    });
};

export default sendForgetPasswordLink;
