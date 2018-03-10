const client = require('socket.io').listen(4500).sockets;
const mongo = require('mongodb').MongoClient;
//It's really important that you set up MongoDB and install it the correct way.
//There will be a tutorial on this later.

//This will later on when it's finnished be a payed version of the bot.Then this script will get removed :/
//But for now I think that it would be good that we develope this as a community and support new commits or changes made.

//Create the connections to the database called steambot. Or create the database if it isn't set up or run before.
mongo.connect('mongodb://127.0.0.1/steambot', function(err, db){
    if(err) throw err; //Display any errors that we may get.
    
    console.log('MongoDB was connected to the database!');

    client.on('connection', function(sockets){
        latestTrade = function(latest){
            socket.emit('latest')
        }
    });

});