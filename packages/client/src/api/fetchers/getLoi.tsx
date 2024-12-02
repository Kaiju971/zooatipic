import axios from "../../axios";
import { Loi } from "../../types/loi";

interface ReponseData {
  results: Loi[];
}

type Params = {
  titreLoi: string;
};

export const fetchLoi = async ({ titreLoi }: Params): Promise<ReponseData> => {
  console.log(titreLoi);
  const response = await axios.get<ReponseData>(`/loi/${titreLoi}`);
  return response.data;
};
