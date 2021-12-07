function command(req, body, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log(JSON.parse(body).id);
    return {
        status: 'OK'
    }
}
module.exports = {command}