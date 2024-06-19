export const setAuthUser = (data) => {
    localStorage.setItem("patient",JSON.stringify(data));
};

export const getAuthUser = (data) => {
    if (localStorage.getItem("patient")) {
        return JSON.parse(localStorage.getItem("patient"))
    }
};

export const removeAuthUser = () => {
    if(localStorage.getItem("patient")) {
        localStorage.removeItem("user");
    }
};