class TokenServices {
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.token;
    }

    getRefershToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenServices();