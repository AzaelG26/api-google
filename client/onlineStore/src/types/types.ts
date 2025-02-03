export interface AuthResponse{
    message: string,
    token: string,
}

export interface AuthResponseError{
    message:{
        error: string
    }
}

export interface User{
    id:string,
    email: string,
}