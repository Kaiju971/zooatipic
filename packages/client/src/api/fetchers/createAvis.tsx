import axios from "../../axios";
import { Avis } from "../../types/avis";

export const fetchAvis = async (
  data: Avis
): Promise<{ results: { id: number }[] }> => {
  const response = await axios.post<{ results: { id: number }[] }>(
    `/createavis`,
    data
  );
  return response.data;
};
