import axios from "axios";

export const fetchPayments = async () => {
  const { data } = await axios.get("http://localhost:3001/payments");
  return data;
};
