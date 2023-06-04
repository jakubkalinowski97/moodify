import { AuthService } from "./core/services/auth.service";

export function initAppFactory(authService: AuthService) {
    return () => {
        authService.handleNetlifyEvents();
    };
}