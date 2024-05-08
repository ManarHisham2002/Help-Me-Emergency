export const setAuthUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
}

export const getAuthUser = (data) => {
    if(localStorage){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export const removeAuthUser = () => {
    if (localStorage) {
        localStorage.removeItem('user');
    }
}