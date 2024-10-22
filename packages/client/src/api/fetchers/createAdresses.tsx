import axios from "../../axios";
import { Adresse } from "../../types/adresses";

export const fetchAdresses = async (
  data: Adresse
): Promise<{ results: { id: number }[] }> => {
  const response = await axios.post<{ results: { id: number }[] }>(
    `/createadresse`,
    data
  );
  return response.data;
};
