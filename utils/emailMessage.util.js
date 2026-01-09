const transporter = require('./email.util');

const sendEmail = async (to, token) => {
  const info = await transporter.sendMail({
    from: '"Bikuren Motorbike Rental" <suryanegara1209@gmail.com>',
    to,
    subject: "Your verification account!",
    //text: "Nice nice nice", // Plain-text version of the message
    html: `
        <p>Kle keren anjayy</p>
        <a href="https://flowing-lizard-lately.ngrok-free.app//auth/${token}"
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
        `, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};

module.exports = sendEmail;