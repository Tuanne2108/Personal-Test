import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  userName: string;
  accountDetails?: {
    type: string;
    createdDate: string;
  };
  actionUrl?: string;
  title?: string;
  message?: string;
  details?: Record<string, string>;
  actionText?: string;
}

export interface EmailRequest {
  to: string;
  subject: string;
  templateName: string;
  templateData: EmailData;
  attachments?: File[];
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  sendTemplatedEmail(emailRequest: EmailRequest): Observable<any> {
    const formData = new FormData();
    
    formData.append('to', 'tuannhm@smartosc.com');
    formData.append('subject', emailRequest.subject);
    formData.append('templateName', emailRequest.templateName);
    formData.append('templateData', JSON.stringify(emailRequest.templateData));
    
    if (emailRequest.attachments) {
      emailRequest.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    return this.http.post(`${this.apiUrl}/send-email`, formData);
  }

  sendWelcomeEmail(to: string, userName: string, accountDetails?: any): Observable<any> {
    return this.sendTemplatedEmail({
      to,
      subject: 'Welcome to Our Platform!',
      templateName: 'welcome',
      templateData: {
        userName,
        accountDetails,
        actionUrl: 'https://yourplatform.com/getting-started'
      }
    });
  }
}
