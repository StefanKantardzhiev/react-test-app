module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Content-Type','application/json')
    // res.setHeader('Set-Cookie:http-only')
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-Type, X-Authorization');
    next();
};