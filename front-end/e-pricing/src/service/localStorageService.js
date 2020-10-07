function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}

function setUser(_id, firstName, lastName, email, token) {
    localStorage.setItem('user', JSON.stringify({ _id, firstName, lastName, email, token }));
}

function getUser() {
    let str =  localStorage.getItem('user');
    return JSON.parse(str);
}

function removeUser() {
    localStorage.removeItem('user');
}

export { setToken, getToken, removeToken, setUser, getUser, removeUser };