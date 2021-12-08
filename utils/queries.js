function userQuery(id){
    return {
        name: 'userQuery',
        text: 'SELECT * FROM player WHERE id = $1',
        values: [id]
    }
}

module.exports = {userQuery}