import axios from "axios";
import { User } from "@/models/user";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

//get
export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(BASE_URL);

  console.log("users: ", response.data);
  return response.data;
}

//delete
export async function deleteUser(id: number): Promise<{ id: number }> {
  const response = await axios.delete<{ id: number }>(
    `${BASE_URL}/${id}`
  );
  return response.data;
}

//create
export type CreateUserPayload = Omit<User, "id">;

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await axios.post<User>(BASE_URL, payload);
  return response.data;
}

//update
// export async function updateUser(id: number): Promise<{ id: number }> {
//   const response = await axios.put<{ id: number }>(
//     `${BASE_URL}/${id}`
//   );
//   return response.data;
// }