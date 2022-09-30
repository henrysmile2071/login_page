const users = require('../models/users')
function verifyAccount(accountData) {
  let verifyToken = ''
  const userIndex = users.findIndex(account => account.email === accountData.email)
  if (userIndex === -1) {
    verifyToken = 'noEmailInDB' //no user in database
  } else if (accountData.password === users[userIndex].password) {
    verifyToken = users[userIndex] //pass
  } else {
    verifyToken = 'incorrectPassword' //incorrect password
  }
  return verifyToken
}

module.exports = verifyAccount