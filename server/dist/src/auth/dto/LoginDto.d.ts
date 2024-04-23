declare enum UserRole {
    Patient = "patient",
    Doctor = "doctor"
}
export declare class LoginDto {
    email: string;
    password: string;
    role: UserRole;
}
export {};
