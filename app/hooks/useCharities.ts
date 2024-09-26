import { useQuery } from "react-query";
import { fetchCharities } from "@/api/charityApi";
import { Charity } from "@/types";

export const useCharities = () => {
  return useQuery<Charity[]>("charities", fetchCharities);
};
