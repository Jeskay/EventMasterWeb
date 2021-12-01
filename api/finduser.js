function command(req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    return {
        request: body,
        status: 'OK'
    }
}
module.exports = {command}