const transporter = require('./email.util');
const emailVerify = require('./template/emailVerify');

const sendEmail = async (to, urlVerification, name) => {
  const info = await transporter.sendMail({
    from: '"BIKUREN" <bikurenbusiness@gmail.com>',
    to,
    subject: "Your verification account!",
    html: emailVerify(urlVerification, name)
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendEmail;