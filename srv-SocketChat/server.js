var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var numOnlineUsers = 0;
var onlineUserList = [];
var socketIdToUserIdDict = new Object();

//returns userId if it is a valid username and password (username exists and 
//password is correct). returns -1 otherwise
function checkUserNameAndPassWord(userName,password){
  ;
}

//returns 1 if userName exists in database, 0 if not
function userNameExists(userName){
  ;
}

//this function creates a new user (initializes all fields) and returns
//the userId of the newly created user
function createNewUser(userName,password){
  ;
}

//attempts to create a new user
function createUserAttempt(userName,password){
   if (userNameExists(userName) == 1) return -1;

   else return createNewUser(userName,password);
}



server.listen(3000, function(){
  console.log('Listening on *:3000');
});


io.on('connection', function(client){
  console.log('new connection');

      client.on("userDisconnect", function(userId){

            userList.splice(onlineUserList.indexOf(client.id), 1);
            var clientId = client.id;
            delete socketIdToUserIdDict.clientId;
            numOnlineUsers--;

      });


      client.on("registerAttempt", function(userName,password){
            if (userName==null || userName == ""){
                io.emit("registerUserNameEmpty");
            }

            else if (password==null || password == ""){
                io.emit("registerPasswordEmpty");
            }

            else{
                var newUserId = createUserAttempt(userName,password);

                if (newUserId== -1){
                   io.emit("userNameExists");
                }

                else{
                   io.emit("accountSuccessFullyCreated",userName);
                }

            }
            
      });

      client.on("userLogin", function(userName,password){
            console.log('login attempt');

            if (userName==null || userName == ""){
                console.log('userNameEmpty');
                io.emit("userNameEmpty");
            }

            else if (password==null || password == ""){
                console.log('passwordEmpty');
                io.emit("passwordEmpty");
            }

            else{
                var newUserId = checkUserNameAndPassWord(userName,password);

                //login failure
                if (newUserId == -1){
                    io.emit("wrongUserNameOrPassword");
                }

                //login success
                else{
                  onlineUserList.push(client.id);
                  var clientId = client.id;
                  socketIdToUserIdDict.clientId = newUserId;
                  numOnlineUsers++;
                  pushInitialInfoAtLogin();
                }
            }

      });

      //pushes necessary information to a user that just logged in
      function pushInitialInfoAtLogin(){
         ;
      }

          

});
