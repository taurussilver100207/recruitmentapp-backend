import nodemailer from 'nodemailer';

export const sendEmailService = async (emails, type) => {
  try {
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      throw new Error("Missing or invalid email addresses");
    }

    let subject, html;

    switch (type) {
      // thông báo lịch kiểm tra  
      case "schedule":
        subject = "Announcement of test schedule !";
        html = `
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear: [recipient],</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">First of all, our company would like to thank you for participating in our company's recruitment program.</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">The company would like to announce:</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">-vacancies: []</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">-test schedule: [test schedule]</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">-test topic: [test]</p> //nhét link làm bài test vào đây
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">For more details, please contact [phone number] for more details.</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">We hope you can arrange time to participate. In case you cannot arrange a time, please contact us at the phone number/address above to reconfirm.</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards!</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">HR Manager</p>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">[sign]</p>
          </div>
        `;
        break;

      // nếu kết quả bài test mà đạt
      case "accepted":
        subject = "Congratulations! Announcement of interview schedule.";
        html = `
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear Applicant,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">First of all, we would like to thank you for taking the time to research and apply for the [...] position at our company.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">After getting the test results, we realize that you are a potential candidate for this position. We will send you an interview schedule soon, please pay attention to the email sent to you.
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">Hope to be able to discuss more with you at the interview!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #333333; margin-top: 40px;">[sign]</p>
        <p style="font-size: 16px; line-height: 1.5; color: #333333;">[position held] - [company name]</p>
        </div>
        `;
        break;

      // nếu kết quả bài test mà không đạt
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

    const promises = emails.map(email => {
      return transport.sendMail({
        from: '"Hoàng" <nguyenhuyhoang10a2qn@gmail.com>',
        to: email,
        subject: subject,
        html: html,
      });
    });

    const info = await Promise.all(promises);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const sendMail = async (req, res) => {
  try {
    const { emails, type } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length === 0 || !type) {
      throw new Error("Missing email list or type in request body");
    }

    const response = await sendEmailService(emails, type);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
}
