import nodemailer from 'nodemailer';

export const sendEmailService = async (recipients, type) => {
  try {
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      throw new Error("Missing or invalid recipients");
    }

    let subject, htmlTemplate;

    function createHtmlTemplate(type, recipient) {
      switch (type) {
        // lịch làm bài test
        case "schedule":
          subject = "Announcement of Test Schedule";
          return `
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear ${recipient.firstName} ${recipient.lastName},,</p>
              // other content
              // link bài test
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards!</p>
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">HR Manager</p>
              <p style="font-size: 16px; line-height: 1.5; color: #333333;">[sign]</p>
            </div>
          `;

        // kết quả bài test đạt và thông báo lịch phỏng vấn
        case "accepted":
          subject = "Congratulations! Announcement of interview schedule.";
          return `
          <div>
            <p>Dear ${recipient.firstName} ${recipient.lastName},,</p>
            <p>First of all, we would like to thank you for taking the time to research and apply for the [...] position at our company.</p>
            <p>After getting the test results, we realize that you are a potential candidate for this position. Therefore, we respectfully invite you to participate in the interview with the following information:</p>
            <p>- Time: ${recipient.interviewTime}</p>
            <p>- Location: ${recipient.interviewLocation}</p>
            <p>Please confirm your participation in the interview before ${recipient.confirmationDeadline} via this email to confirm the information !</p>
            <p>Hope to be able to discuss more with you at the interview !</p>
            <p>Best regards,</p>
            <p>[sign]</p>
            <p>[position held]-[company name]</p>
          </div>
        `;
          break;

        // nếu kết quả bài test mà không đạt
        case "rejected":
          subject = "Notification of test results !";
          return `
        <div>
          <p>Dear ${recipient.firstName} ${recipient.lastName},,</p>
          <p>First of all, on behalf of the Company, we would like to thank you for participating in our recruitment program.</p>
          <p>After checking professional knowledge, the Company would like to announce:</p>
          <p>You were not accepted for the position of ${recipient.vacancyName}</p>
          <p>The hiring committee appreciates the time you take to apply. Wishing you good luck in your job search and hope to cooperate with you in other job positions in the future.</p>
          <p>Best regards!</p>
          <p>HR Manager</p>
          <p>[sign]</p>
        </div>
      `;
          break;

        default:
          return "<p>Invalid email type specified</p>";
      }
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      }
    });

    const promises = recipients.map(recipient => {
      htmlTemplate = createHtmlTemplate(type, recipient);
      return transport.sendMail({
        from: '"XYZ Company" <companyXYZ@gmail.com>',
        to: recipient.email,
        subject: subject,
        html: htmlTemplate,
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
    res.status(200).send([response,type]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
}
