import nodemailer from "nodemailer";

// Send an email with a link and custom HTML content
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      // service: process.env.SERVICE,
      // post: process.env.EMAIL_PORT,
      // secure: Boolean(process.env.SECURE),
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: `
            <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 80vh;
              width: 100vw;
            "
          >
            <div
              class="border"
              style="
                height: 300px;
                width: 400px;
                border: 3px solid black;
                padding: 10px;
                border-radius: 15px;
                background-color: #081b29;
                color: #ededed;
              "
            >
              <h1
                style="
                  background-color: #112e42;
                  color: #ededed;
                  border: 3px solid #00abf0;
                  border-radius: 15px 15px 0 0;
                  display: flex;
                  align-items: center !important;
                  margin: 0px;
                "
              >
                <img
                  style="width: 45px; padding: 5px; margin-left: 13px;"
                  src="https://www.iconsdb.com/icons/preview/black/new-post-xxl.png"
                  alt=""
                />
                <span style="display: flex; padding-top: 11px;">BULK EMAIL TOOL</span>
              </h1>
              <h3>${subject}</h3>
              <hr />
              <p>
                This link is valid for 15 minutes.
                Kindly use it before it elapses, or generate a new link to proceed.
              </p>
              <a href="${text}" target="_blank" style="text-decoration: none; background-color: #00abf0; color: black; border-radius: .2rem; padding: .2rem;">CLICK HERE</a>
            </div>
          </div>
            `,
    });

    return info;
  } catch (error) {
    return error;
  }
};

export default sendEmail;
