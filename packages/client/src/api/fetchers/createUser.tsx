import axios from "../../axios";

export const createUser = async (
  data: FormData
): Promise<{ results: { id: number }[] }> => {
  const response = await axios.post<{ results: { id: number }[] }>(
    `/createuser`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
