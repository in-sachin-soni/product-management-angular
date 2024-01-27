export interface Login {
    username:string;
    password:string;
}

export interface LoginResponse {
    username:string;
    email:string;
    token:string;
}