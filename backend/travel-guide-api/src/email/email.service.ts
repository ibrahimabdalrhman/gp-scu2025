import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com', 
      port: 465,
      secure: true, 
      auth: {
        user: 'Ahmedsaiedwady@zohomail.com',
        pass: 'Aa1020304050*',
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const info = await this.transporter.sendMail({
      from: 'Travel Guide <Ahmedsaiedwady@zohomail.com>', 
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  }
}
