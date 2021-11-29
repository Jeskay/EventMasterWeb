const command = function(req, data){
    console.log(req);
    return {
        username: "Bob",
        avatar: "randomURL"
    }
}
module.exports = {command}