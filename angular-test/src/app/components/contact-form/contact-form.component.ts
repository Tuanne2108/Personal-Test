import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  email: string = '';
  name: string = '';

  constructor(private emailService: EmailService) {}
  sendWelcome() {
    this.emailService.sendWelcomeEmail(
      this.email,
      this.name,
      {
        type: 'Standard',
        createdDate: new Date().toLocaleDateString()
      }
    ).subscribe({
      next: () => {
        console.log('Welcome email sent successfully');
        // Reset form or show success message
      },
      error: (error) => {
        console.error('Error sending welcome email:', error);
        // Show error message
      }
    });
  }
}