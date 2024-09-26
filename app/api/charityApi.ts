import axios from "axios";

export const fetchCharities = async () => {
  const { data } = await axios.get("http://localhost:3001/charities");
  return data;
};
