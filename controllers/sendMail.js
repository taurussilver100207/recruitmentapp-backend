import nodemailer from 'nodemailer';

export const sendEmailService = async (recipients) => {
  try {
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      throw new Error("Missing or invalid recipients");
    }

    const transport = nodemailer.createTransport({
     host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      }
    });

    const promises = recipients.map(recipient => {
      return transport.sendMail({
        from: '"XYZ Company" <companyXYZ@gmail.com>',
        to: recipient.email,
        subject: recipient.subject,
        html: recipient.htmlTemplate,
      });
    });

    const info = await Promise.all(promises);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createEmailTemplate = (recipient, type) => {
  let subject, htmlTemplate;

  switch (type) {
    case "schedule":
      subject = "Announcement of Test Schedule";
      htmlTemplate = `
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear ${recipient.firstName} ${recipient.lastName},</p>
          <p>Please find the link to the test below:</p>
          <a href="${recipient.linkTest}" style="font-size: 16px; color: #007BFF;">Access the test here: </a>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">Deadline for submitting test papers: ${recipient.deadline}</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards!</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">HR Manager</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">[sign]</p>
        </div>
      `;
      break;

    case "accepted":
      subject = "Congratulations! Announcement of interview schedule.";
      htmlTemplate = `
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear ${recipient.firstName} ${recipient.lastName},</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">First of all, we would like to thank you for taking the time to research and apply for the [...] position at our company.</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">After getting the test results, we realize that you are a potential candidate for this position. Therefore, we respectfully invite you to participate in the interview with the following information:</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">- Time: ${recipient.interviewTime}</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">- Location: ${recipient.interviewLocation}</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">Please confirm your participation in the interview before ${recipient.confirmationDeadline} via this email to confirm the information!</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">Hope to be able to discuss more with you at the interview!</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards,</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">[sign]</p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">[position held] - [company name]</p>
    </div>
      `;
      break;

    case "rejected":
      subject = "Notification of test results!";
      htmlTemplate = `
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">Dear ${recipient.firstName} ${recipient.lastName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">First of all, on behalf of the Company, we would like to thank you for participating in our recruitment program.</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">After checking professional knowledge, the Company would like to announce:</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">You were not accepted for the position of ${recipient.vacancyName}</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">The hiring committee appreciates the time you take to apply. Wishing you good luck in your job search and hope to cooperate with you in other job positions in the future.</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">Best regards!</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">HR Manager</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333333;">[sign]</p>
        </div>
      `;
      break;

    default:
      htmlTemplate = "<p>Invalid email type specified</p>";
      break;
  }

  return { subject, htmlTemplate };
};

export const sendMail = async (req, res) => {
  try {
    const { emails } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).send("Missing email list in request body");
    }

    const response = await sendEmailService(emails);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
};

export const getEmailPreview = async (req, res) => {
  try {
    const { recipient, type } = req.body;
    if (!recipient || !type) {
      return res.status(400).send("Missing recipient or type in request body");
    }

    const { subject, htmlTemplate } = createEmailTemplate(recipient, type);
    res.status(200).json({ subject, htmlTemplate });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating email preview");
  }
};
