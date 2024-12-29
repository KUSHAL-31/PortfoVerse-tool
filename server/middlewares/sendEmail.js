const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "sendMail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
});

exports.sendOtpMail = (email, otp) => {
    console.log(process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_HOST, process.env.SMTP_PORT);
    transporter.sendMail(
        {
            from: process.env.SMTP_USER,
            to: email,
            subject: "OTP for K31 Portfolio maker",
            html: `
            <div style="
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    background: #f9fafc;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
>
    <h1 style="
        text-align: center;
        color: rgb(201, 80, 59);
        margin-bottom: 20px;
    ">
        K31 <span style="
            color: rgb(27, 27, 27);
            font-weight: 700;
        ">Portfolio Maker</span>
    </h1>
    <p style="
        color: #555;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
    ">
        Thank you for being a part of <strong>K31 Portfolio Maker</strong>! Here's your <strong>One-Time Password (OTP)</strong> to log in:
    </p>
    <div style="
        margin: 20px auto;
        text-align: center;
    ">
        <span style="
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            background-color: rgb(201, 80, 59);
            padding: 10px 20px;
            border-radius: 8px;
        ">${otp}</span>
    </div>
    <p style="
        color: #555;
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
    ">
        Please use this OTP within <strong>120 seconds</strong> to access your account securely.
    </p>
    <p style="
        color: #777;
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
    ">
        If you did not request this OTP or need assistance, please contact our support team immediately.
    </p>
    <hr style="
        border: none;
        border-top: 1px solid #ddd;
        margin: 20px 0;
    ">
    <p style="
        color: #777;
        font-size: 14px;
        text-align: center;
    ">
        Regards,<br>
        <strong>K31 Portfolio Maker Team</strong>
    </p>
</div>
            `,
        },
        (err, data) => {
            if (err) {
                console.log("Error" + err);
            } else {
                console.log("Email send successfully");
            }
        }
    );

    console.log(email);
};
