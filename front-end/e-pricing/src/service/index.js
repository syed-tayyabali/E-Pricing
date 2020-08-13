const baseUrl = 'http://localhost:3001';

function constructUrl(url) {
    return `${baseUrl}${url}`;
}

export { constructUrl };