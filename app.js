//require Node's built in modules
const os = require('os');

//require third party modules
const logger = require('logger').createLogger('log.txt');
const yargs = require('yargs');

//require our custom module
const users = require('./users');

//get info from OS
let appUser = os.userInfo();

//user input
let command = process.argv[2];
let args = yargs.argv;
let userName = args.username;
let email = args.email;
let password = args.password;

let logStatus = "Failure";
let logMessage = "";

//validation
if (command == undefined || command.match(/-/g)) 
{
    //no command is sent
    logMessage = "Command not found";
}
else
{
    //process the command that was sent
    if (command === 'create')
    {
        if (userName !== undefined && email !== undefined && password !== undefined)
        {
            let user = users.insertUser(userName, password, email);
            if (user)
            {
                logStatus = "Success";
                logMessage = `User created: ${user.username}, ${user.password}, ${user.email}.`;
            }
            else
            {
                logMessage = `User not created: Duplicate User (${userName}) found`;
            }
        }
        else
        {
            logMessage = "Missing some user data";
        }
        
    }
    else if (command === 'read')
    {
        if (userName === undefined)
        {
            logMessage = "Missing user name";
        }
        else
        {
            let user = users.getUser(userName);
            if (user)
            {
                logStatus = "Success";
                logMessage = `User ${user.username}, ${user.email}.`;
            }
            else
            {
                logMessage = `User (${userName}) not found`;
            }
        }
    }
    else if (command === 'update')
    {
        if (userName !== undefined && email !== undefined && password !== undefined)
        {
            let user = users.updateUser(userName, password, email);
            if (user)
            {
                logStatus = "Success";
                logMessage = `User Updated: ${user.username}, ${user.email}.`;
            }
            else
            {
                logMessage = `User (${userName}) not found`;
            }
        }
        else
        {
            logMessage = "Missing some user data";
        }
    }
    else if (command === 'delete')
    {
        if (userName === undefined || password === undefined)
        {
            logMessage = "Missing user name";
        }
        else 
        {
            let user = users.deleteUser(userName, password);
            if (user)
            {
                logStatus = "Success";
                logMessage = `User ${user.username} deleted`;
            }
            else
            {
                logMessage = `User (${userName}) not found`;
            }
        }
    }
    else if (command === 'list')
    {
        if (userName === undefined || password === undefined)
        {
            logMessage = "Missing credentials";
        }
        else if (userName !== "Admin" || password !== "admin")
        {
            logMessage = "Invalid credentials";
        }
        else
        {
            let userList = users.listUsers();
            if (userList === 0)
            {
                logMessage = "No users found";
            }
            else
            {
                logStatus = "Success";
                logMessage = ('Users: ');
                userList.forEach((val) => {
                    logMessage += `${val.username}, ${val.email}; `;
                });
            }
        }
    }
    else
    {
        logMessage = `Command (${command}) not able to be processed.`;
    }
}

//write log file
logger.info(`App accessed by ${appUser.username}: ${logStatus} - ${logMessage}`);