export function signin(user, isLoggedIn) {
    return {
        type: "SINGIN",
        payload: {
            user,
            isLoggedIn
        }
    }
}