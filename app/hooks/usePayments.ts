import { useQuery } from "react-query";
import { fetchPayments } from "@/api/paymentApi";
import { Payments } from "@/types";

export const usePayments = () => {
  return useQuery<Payments[]>("payments", fetchPayments);
};
