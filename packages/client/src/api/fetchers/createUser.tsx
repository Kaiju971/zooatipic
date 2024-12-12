import axios from "../../axios";
import { User } from "../../types/users";

export const createUser = async (
  data: User
): Promise<{ results: { id: number }[] }> => {
  const response = await axios.post<{ results: { id: number }[] }>(
    `/createuser`,
    data
  );
  return response.data;
};
