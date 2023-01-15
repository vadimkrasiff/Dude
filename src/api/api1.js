export const authAPI = {
    async me () {
        let response = await fetch("https://social-network.samuraijs.com/api/1.0/auth/me", {
            method: 'GET',
            "API-KEY": "ba57bf0b-3972-4266-aa8e-843fff7b4a9d",
            
        });
        return response.json(); 
    },
    async login ( email, password, rememberMe = false, captcha = null ) {
        let response = await fetch("https://social-network.samuraijs.com/api/1.0/auth/login", {
            method: 'POST',
            "API-KEY": "ba57bf0b-3972-4266-aa8e-843fff7b4a9d",
            
        }, { email, password, rememberMe, captcha });

        return response;
    },
    async authMe () {
        let response = await fetch("https://social-network.samuraijs.com/api/1.0/auth/login", {
            method: 'DELETE',
            "API-KEY": "ba57bf0b-3972-4266-aa8e-843fff7b4a9d",
            
        });
        return response; 
    },
}