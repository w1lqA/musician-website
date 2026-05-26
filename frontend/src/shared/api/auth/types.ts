// src/shared/api/auth/types.ts
export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    access: string;
    refresh: string;
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
}

export interface RegisterRequestDTO {
    email: string;
    password: string;
    password2: string;
    first_name?: string;
    last_name?: string;
}

export interface RegisterResponseDTO {
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
    message: string;
}

export interface UserDTO {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    is_staff: boolean;
    is_active: boolean;
    created_at: string;
}

export interface ChangePasswordRequestDTO {
    old_password: string;
    new_password: string;
    new_password2: string;
}

export interface ChangePasswordResponseDTO {
    message: string;
}