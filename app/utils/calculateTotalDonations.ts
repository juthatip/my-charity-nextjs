import { Payments } from "@/types";

export const calculateTotalDonations = (payments: Payments[]): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0);
};
