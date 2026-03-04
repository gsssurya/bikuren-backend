const transporter = require('./email.util');

const sendEmail = async (to, urlVerification) => {
  const info = await transporter.sendMail({
    from: '"Bikuren Motorbike Rental" <suryanegara1209@gmail.com>',
    to,
    subject: "Your verification account!",
    html: `
        <p>Trying to verify your email? Please click the button below</p>
        <a href="${urlVerification}"
        style="
            display:inline-block;
            padding:12px 24px;
            background:#4F46E5;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
        ">
            Click to verify
        </a>
        `,
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendEmail;