import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(apiKey);
  }

  private to: string[] = ['samuel@geeks5g.com', 'camilo.g@geeks5g.com'];

  async sendUserNotification(user: string) {
    const msg = {
      to: this.to,
      from: 'tech@taktek.app',
      subject: 'New User Registered',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>New User Registered</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 30px;">
          <h2 style="color: #2d3748;">New User Registered</h2>
          <p>A new user has just signed up on your platform.</p>

          <table style="width: 100%; margin-top: 20px;">
          <tr>
              <td style="font-weight: bold; width: 100px;">Email:</td>
              <td style="color: #1a202c;">${user}</td>
          </tr>
          </table>

          <p style="margin-top: 30px;">You can log in to your admin panel to review the account.</p>

          <div style="margin-top: 40px; font-size: 12px; color: #888;">
          This is an automated notification. Please do not reply to this email.
          </div>
        </div>
        </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Notification email sent to ${this.to}`);
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
    }
  }

  async sendBusinessNotification(user: string, business: string) {
    const msg = {
      to: this.to,
      from: 'tech@taktek.app',
      subject: 'New Business Registered',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>New Business Registered</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 30px;">
            <h2 style="color: #2d3748;">New Business Registered</h2>
            <p>A new business has just been added to your platform.</p>

            <table style="width: 100%; margin-top: 20px;">
              <tr>
                <td style="font-weight: bold; width: 140px;">Business Name:</td>
                <td style="color: #1a202c;">${business}</td>
              </tr>
              <tr>
                <td style="font-weight: bold;">Registered By:</td>
                <td style="color: #1a202c;">${user}</td>
              </tr>
            </table>

            <p style="margin-top: 30px;">You can review this business in your admin dashboard.</p>

            <div style="margin-top: 40px; font-size: 12px; color: #888;">
              This is an automated notification. Please do not reply to this email.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Notification email sent to ${this.to}`);
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
    }
  }

  async sendUserNotificationToUser(to: string) {
    const msg = {
      to,
      from: 'tech@taktek.app',
      subject: 'Welcome to Google Rank AI',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>Welcome to Google Rank AI</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 30px;">
          <h2 style="color: #2d3748;">Welcome to Google Rank AI</h2>
          <p>You have signed up on our platform.</p>

          <table style="width: 100%; margin-top: 20px;">
          <tr>
              <td style="font-weight: bold; width: 100px;">Welcome</td>
              <td style="color: #1a202c;">${to}</td>
          </tr>
          </table>

          <p style="margin-top: 30px;">You can now manage your businesses.</p>

          <div style="margin-top: 40px; font-size: 12px; color: #888;">
          This is an automated notification. Please do not reply to this email.
          </div>
        </div>
        </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Notification email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
    }
  }

  async sendBusinessNotificationToUser(to: string, business: string) {
    const msg = {
      to,
      from: 'tech@taktek.app',
      subject: 'New Business Registered',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>New Business Registered</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 30px;">
            <h2 style="color: #2d3748;">New Business Registered</h2>
            <p>You have registered a new business.</p>

            <table style="width: 100%; margin-top: 20px;">
              <tr>
                <td style="font-weight: bold; width: 140px;">Business Name:</td>
                <td style="color: #1a202c;">${business}</td>
              </tr>
            </table>
            <p style="margin-top: 30px;">You can review this business in your dashboard.</p>

            <div style="margin-top: 40px; font-size: 12px; color: #888;">
              This is an automated notification. Please do not reply to this email.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Notification email sent to ${this.to}`);
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
    }
  }
}
