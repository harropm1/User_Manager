//require built in module
const fs = require('fs');

//read saved data from file
let getUsers = () =>
{
    try 
    {
        let usersString = fs.readFileSync('users.json');
        return JSON.parse(usersString);
    }
    catch (err)
    {
        return [];
    }
};

//save data in file
let saveUsers = (users) =>
{
    fs.writeFileSync('users.json', JSON.stringify(users));
};

//insert a new user
let insertUser = (username, password, email) =>
{
    let users = getUsers();

    //in ES6, if the parameter and property names are the same, you can just write them like this:
    let user = {
        username,
        password,
        email
    };

    //ensure there are no duplicates
    let duplicateUsers = users.filter((user) =>
    {
        return (user.username === username || user.email === email);
    });

    //save the user
    if (duplicateUsers.length === 0)
    {
        users.push(user);
        saveUsers(users);
        return user;
    }
};

//get a single user by user name
let getUser = (username) =>
{
    let users = getUsers();
    //another arrow function
    let filteredUsers = users.filter((user) => user.username === username);
    return filteredUsers[0];
}

// "Update" (delete and insert) a user
var updateUser = (username, password, email) =>
{
    var users = getUsers();
    var filteredUsers = users.filter((user) => (user.username === username && user.password === password));

    // verify user exists
    if (filteredUsers.length > 0)
    {
        // delete the existing user
        deleteUser(username, password);
        // insert new user
        return insertUser(username, password, email);
    }

    return filteredusers[0];
};

// Delete a user
var deleteUser = (username, password) =>
{
    var users = getUsers();
    var filteredUsers = users.filter((user) => (user.username !== username && user.password !== password));

    saveUsers(filteredUsers);

    return users.length !== filteredUsers.length;
};

// Return all Users
var listUsers = () => {
    return getUsers();
};

//exporting functions to expose/call from app.js
module.exports = {
    insertUser,
    getUser,
    updateUser,
    deleteUser,
    listUsers
};