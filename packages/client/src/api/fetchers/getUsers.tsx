import axios from "../../axios";
import { User } from "../../types/users";

interface UserResponse {
  results: User[];
}

export const getUsers = async (): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>("/users");
  return response.data;
};
