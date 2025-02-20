import { User } from "./User";

export interface RegisteredUser extends User{
    id: string;
    username: string;
}