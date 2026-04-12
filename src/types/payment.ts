export type PaymentStatus = "pending" | "completed" | "failed";
export type PaymentProvider = "airtel" | "moov";

export interface Payment {
  id: string;
  cvId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  providerReference: string | null;
  provider: PaymentProvider;
  phoneNumber: string;
  createdAt: string;
}

export interface PaymentInitRequest {
  cvId: string;
  phoneNumber: string;
  provider: PaymentProvider;
}

export interface PaymentInitResponse {
  paymentId: string;
  status: PaymentStatus;
  message: string;
}

export interface PaymentStatusResponse {
  paymentId: string;
  status: PaymentStatus;
  cvIsPaid: boolean;
}

// Price in FCFA
export const CV_PRICE_FCFA = 1000;
