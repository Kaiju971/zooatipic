import axios from "../../axios";
import { User } from "../../types/users";

interface UserData {
  results: User[];
}

type Params = {
  userId?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
};

export const getUserBy = async ({
  userId,
  email,
  password,
}: Params): Promise<UserData> => {
  const response = await axios.get<UserData>("/getuserby", {
    params: {
      id: userId,
      email: email,
      password: password,
    },
  });
  return response.data;
};
