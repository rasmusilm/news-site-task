function persistUserLoginData(email: string, apiKey: string) {
    localStorage.email = email;
    localStorage.apiKey = apiKey;
    localStorage.identified = true;
}

function persistAllUserData(email: string | null, apiKey: string | null, name: string | null) {
    localStorage.email = email;
    localStorage.apiKey = apiKey;
    localStorage.name = name;
    localStorage.identified = true;
}

function clearUserData() {
    localStorage.identified = false;
    localStorage.removeItem("email");
    localStorage.removeItem("apiKey")
    localStorage.removeItem("name")
}

export {persistUserLoginData, persistAllUserData, clearUserData}