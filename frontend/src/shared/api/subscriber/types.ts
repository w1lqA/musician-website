export interface SubscriberDTO {
    id: string;
    email: string;
    subscribed_at: string;
    is_active: boolean;
    unsubscribed_at: string | null;
}

export interface CreateSubscriberDTO {
    email: string;
}

export interface CreateSubscriberResponseDTO {
    id: string;
    email: string;
    subscribed_at: string;
    is_active: boolean;
}