export declare class MailService {
    constructor();
    private to;
    sendUserNotification(user: string): Promise<void>;
    sendBusinessNotification(user: string, business: string): Promise<void>;
    sendUserNotificationToUser(to: string): Promise<void>;
    sendBusinessNotificationToUser(to: string, business: string): Promise<void>;
}
