import nodemailer from 'nodemailer';

export const sendEmailService = async (email, type) => {
  try {
    if (!email) {
      throw new Error("Missing email address");
    }

    let subject, html;

    switch (type) {
      // nếu kết quả phỏng vấn mà đạt
      case "accepted":
        subject = "Congratulations! Announcement of interview schedule.";
        html = `
          <div>
            <p>Dear Applicant,</p>
            <p>First of all, we would like to thank you for taking the time to research and apply for the [...] position at our company.</p>
            <p>After getting the test results, we realize that you are a potential candidate for this position. Therefore, we respectfully invite you to participate in the interview with the following information:</p>
            <p>-[interview time]</p>
            <p>- [interview location]</p>
            <p>Please confirm your participation in the interview before [time] via this email to confirm the information !</p>
            <p>Hope to be able to discuss more with you at the interview !</p>
            <p>Best regards,</p>
            <p>[sign]</p>
            <p>[position held]-[company name]</p>
          </div>
        `;
        break;

      // nhận lịch thông báo làm bài test
      case "schedule":
        subject = "Announcement of test schedule !";
        html = `
          <div>
            <p>Dear: [recipient],</p>
            <p>First of all, our company would like to thank you for participating in our company's recruitment program.</p>
            <p>The company would like to announce:</p>
            <p>-vacancies: []</p>
            <p>-test schedule: [test schedule]</p>
            <p>-location: [location]</p> //nhét link làm bài test vào đây
            <p>For more details, please contact [phone number] for more details.</p>
            <p>We hope you can arrange time to participate. In case you cannot arrange a time, please contact us at the phone number/address above to reconfirm.</p>
            <p>Best regards!</p>
            <p>HR Manager</p>
            <p>[sign]</p>
          </div>
        `;
        break;

      // nếu kết quả phỏng vấn mà không đạt
      case "rejected":
        subject = "Notification of test results !";
        html = `
          <div>
            <p>Dear: [recipient],</p>
            <p>First of all, on behalf of the Company, we would like to thank you for participating in our recruitment program.</p>
            <p>After checking professional knowledge, the Company would like to announce:</p>
            <p>You were not accepted for the position of [vacancy name]</p>
            <p>The hiring committee appreciates the time you take to apply. Wishing you good luck in your job search and hope to cooperate with you in other job positions in the future.</p>
            <p>Best regards!</p>
            <p>HR Manager</p>
            <p>[sign]</p>
          </div>
        `;
        break;
      default:
        throw new Error("Invalid email type");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      }
    });

    const info = await transport.sendMail({
      from: '"Hoàng" <nguyenhuyhoang10a2qn@gmail.com>',
      to: email,
      subject: subject,
      html: html,
    });

    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const sendMail = async (req, res) => {
  try {
    const { email, type } = req.body;
    if (!email || !type) {
      throw new Error("Missing email or type in request body");
    }

    const response = await sendEmailService(email, type);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
}
