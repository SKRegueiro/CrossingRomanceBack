const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const getNewUser = (limit, loggedUserId) => {
    let query = `SELECT users.* FROM users WHERE users.id NOT IN (SELECT likes.shown_user_id FROM likes WHERE likes.user_id = ${loggedUserId}) AND users.id != ${loggedUserId} LIMIT ${limit}`

    return runQuery(query)
}

const registerProfile = (userInfo) => {
    let query = `INSERT INTO users (name, first_name, email) VALUES ('${userInfo.name}', '${userInfo.firstName}', '${userInfo.email}')`
    return runQuery(query)
}

const addProfile = (userInfo) => {
    let query = `INSERT INTO users (name, first_name, gender, switch_id, email, island_name, fruit, password) VALUES ('${userInfo.name}', '${userInfo.firstName}', '${userInfo.gender}', '${userInfo.consoleName}', '${userInfo.email}', '${userInfo.islandName}', '${userInfo.fruit}', '${userInfo.password}')`
    return runQuery(query)
}

const inDatabase = (email) => {
    let query = `SELECT * FROM users WHERE email = "${email}"`
    return runQuery(query)
}

const like = (likedId, loggedUserId) => {
    let query = `INSERT INTO likes (user_id, shown_user_id, action) VALUES (${loggedUserId}, ${likedId.likedId}, '${likedId.action}')`
    return runQuery(query)
}

const likesBack = (likedId, loggedUserId) => {
    let query = `SELECT action FROM likes WHERE user_id = ${likedId} AND shown_user_id = ${loggedUserId}`
    return runQuery(query)
}

const getMatches = (userId) => {
    let query = `SELECT DISTINCT t1.shown_user_id FROM likes t1 INNER JOIN likes t2 ON t1.user_id = t2.shown_user_id AND t1.shown_user_id = t2.user_id AND t2.action = 'liked' WHERE t1.user_id = ${userId} AND t1.action = 'liked'`

    return runQuery(query)
}

const findUserbyUsername = (username) => {
    let query = `SELECT FROM users WHERE switch_id = ${username}`;
    return runQuery(query)
}

const findById = (id) => {
    let query = `SELECT * FROM users WHERE id = ${id}`;
    return runQuery(query)
}

module.exports = {
    getNewUser: getNewUser,
    addProfile: addProfile,
    like: like,
    findUserbyUsername: findUserbyUsername,
    inDatabase: inDatabase,
    registerProfile: registerProfile,
    findById: findById,
    likesBack: likesBack,
    getMatches: getMatches
}