const format = require('pg-format');

function userQuery(id){
    return format(`
        SELECT 
	    id,
	    "eventsPlayed",
	    "eventsHosted",
	    score,
	    banned,
	    "minutesPlayed",
	    (
	    	SELECT 
	    	COUNT("subjectId")
	    	FROM player
	    	LEFT JOIN commend ON player.id = "subjectId" AND cheer
	    	WHERE player.id = id
	    ) AS likes,
	    (
	    	SELECT 
	    	COUNT("subjectId")
	    	FROM player
	    	LEFT JOIN commend ON player.id = "subjectId" AND NOT cheer
	    	WHERE player.id = id
	    ) AS dislikes
        FROM player WHERE player.id = %L`,
		id);
}

module.exports = {userQuery}