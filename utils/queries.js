function userQuery(id){
    return {
        name: 'userQuery',
        text: `
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
	    	WHERE player.id = $1
	    ) AS likes,
	    (
	    	SELECT 
	    	COUNT("subjectId")
	    	FROM player
	    	LEFT JOIN commend ON player.id = "subjectId" AND NOT cheer
	    	WHERE player.id = $1
	    ) AS dislikes
        FROM player WHERE player.id = $1
        `,
        values: [id]
    }
}

module.exports = {userQuery}