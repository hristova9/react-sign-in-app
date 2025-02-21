export interface FormDataSignIn {
    email: string;
    password: string;
}

export interface FormDataSignUp extends FormDataSignIn {
    username: string;
    repassword: string;
}