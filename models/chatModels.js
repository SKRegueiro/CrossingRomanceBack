const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const getChatHistory = (recipientEmail) => {
    let query = `SELECT * FROM chat WHERE (sender_email = '${global.loggedUser.email}' OR sender_email = '${recipientEmail}') AND (recipient_email = '${recipientEmail}' OR recipient_email = '${global.loggedUser.email}')`
    return runQuery(query)
};

const getLastChat = (recipientEmail) => {
    let query = `SELECT * FROM chat WHERE (sender_email = '${global.loggedUser.email}' OR sender_email = '${recipientEmail}') AND (recipient_email = '${recipientEmail}' OR recipient_email = '${global.loggedUser.email}') ORDER BY date DESC LIMIT 1`

    return runQuery(query)
}

const storeMessage = (msgObject) => {
    let query = `INSERT INTO chat (sender_email, recipient_email, content, date) VALUES ('${global.loggedUser.email}', '${msgObject.recipient_email}', '${msgObject.content}', '${msgObject.date}') `

    return runQuery(query)
}

module.exports = {
    getChatHistory: getChatHistory,
    storeMessage: storeMessage,
    getLastChat: getLastChat
}