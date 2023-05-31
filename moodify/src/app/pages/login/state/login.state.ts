import { User } from "netlify-identity-widget";

export interface AuthState {
    user: User | null,
    isAdmin: boolean,
    error: Error | null
}