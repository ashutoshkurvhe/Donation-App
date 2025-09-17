// utils/emailService.js
const nodemailer = require("nodemailer");
const logger = require("./logger");
const { promisify } = require("util");
const { readFile } = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const readFileAsync = promisify(readFile);

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      pool: true, // use pooled connections
      maxConnections: 5, // limit to 5 simultaneous connections
      maxMessages: 100, // limit to 100 messages per connection
      rateDelta: 1000, // limit to 1 message per second
      rateLimit: 5, // limit to 5 messages in rateDelta
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        logger.error("SMTP Connection Error:", error);
      } else {
        logger.info("SMTP Server is ready to send messages");
      }
    });
  }

  async loadTemplate(templateName) {
    try {
      const templatePath = path.join(
        __dirname,
        "../templates",
        `${templateName}.html`
      );
      const template = await readFileAsync(templatePath, "utf8");
      return handlebars.compile(template);
    } catch (error) {
      logger.error(`Failed to load email template: ${templateName}`, error);
      throw new Error(`Email template not found: ${templateName}`);
    }
  }

  async sendEmail({ to, subject, templateName, context, attachments = [] }) {
    const MAX_RETRIES = 3;
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Load and compile template
        const template = await this.loadTemplate(templateName);
        const html = template(context);

        // Generate plain text version
        const text = html.replace(/<[^>]*>/g, "");

        // Send email
        const info = await this.transporter.sendMail({
          from: {
            name: process.env.SMTP_FROM_NAME || "NGO Donation App",
            address: process.env.SMTP_USER,
          },
          to: Array.isArray(to) ? to.join(",") : to,
          subject,
          text,
          html,
          attachments,
          headers: {
            "X-Priority": "1", // High priority
            "X-MSMail-Priority": "High",
            Importance: "high",
          },
        });

        logger.info("Email sent successfully", {
          messageId: info.messageId,
          to,
          subject,
          template: templateName,
        });

        return info;
      } catch (error) {
        lastError = error;
        logger.warn(`Email send attempt ${attempt} failed:`, {
          error: error.message,
          to,
          subject,
          template: templateName,
        });

        if (attempt < MAX_RETRIES) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    // All retries failed
    logger.error("Email send failed after all retries:", {
      error: lastError,
      to,
      subject,
      template: templateName,
    });

    throw new Error(
      `Failed to send email after ${MAX_RETRIES} attempts: ${lastError.message}`
    );
  }

  // Pre-defined email templates
  async sendWelcomeEmail(user) {
    return this.sendEmail({
      to: user.email,
      subject: "Welcome to NGO Donation App",
      templateName: "welcome",
      context: {
        name: user.name,
        loginLink: `${process.env.FRONTEND_URL}/login`,
      },
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    return this.sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      templateName: "password-reset",
      context: {
        name: user.name,
        resetLink: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
      },
    });
  }

  async sendDonationConfirmation(donation) {
    return this.sendEmail({
      to: donation.donor.email,
      subject: "Thank You for Your Donation",
      templateName: "donation-confirmation",
      context: {
        donorName: donation.donor.name,
        amount: donation.amount,
        campaign: donation.campaign.title,
        ngo: donation.campaign.createdBy.organizationName,
        receiptLink: `${process.env.FRONTEND_URL}/donations/${donation._id}/receipt`,
      },
    });
  }

  async sendCampaignApprovalNotification(campaign) {
    return this.sendEmail({
      to: campaign.createdBy.contactEmail,
      subject: "Campaign Approved",
      templateName: "campaign-approved",
      context: {
        ngoName: campaign.createdBy.organizationName,
        campaignTitle: campaign.title,
        campaignLink: `${process.env.FRONTEND_URL}/campaigns/${campaign._id}`,
      },
    });
  }

  async sendNGOApprovalNotification(ngo) {
    return this.sendEmail({
      to: ngo.contactEmail,
      subject: "NGO Registration Approved",
      templateName: "ngo-approved",
      context: {
        ngoName: ngo.organizationName,
        dashboardLink: `${process.env.FRONTEND_URL}/dashboard`,
      },
    });
  }
}

module.exports = new EmailService();
