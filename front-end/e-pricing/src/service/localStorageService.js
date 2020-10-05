function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}

function setUser(_id) {
    localStorage.setItem('user', _id);
}

function getUser() {
    return localStorage.getItem('user');
}

function removeUser() {
    localStorage.removeItem('user');
}

export { setToken, getToken, removeToken, setUser, getUser };