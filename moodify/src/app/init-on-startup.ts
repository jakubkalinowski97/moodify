import { AuthService } from "./core/services/auth.service";

export function initSynchronousFactory(authService: AuthService) {
    return () => {
        authService.handleNetlifyEvents();
    };
}