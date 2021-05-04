const muconn = require("../lib/mongoUtils");

const getUsers = () => {
  return muconn.conn().then((client) => {
    return client.db('isis3710usersdb').collection('isis3710userscollection').find({}).toArray();
  });
}

const getUser = (username) => {
  return muconn.conn().then((client) => {
    return client.db('isis3710usersdb').collection('isis3710userscollection').findOne({ "username": `${username}` })
  });
}
const addUser = async (user) => {
  const client = await muconn.conn();
  return await client.db("isis3710usersdb").collection("isis3710userscollection").insertOne(user);
};

const user = { getUsers, addUser ,getUser};

module.exports = user;