var fs = require('fs');
var path = require('path');
var Q = require('q');
var song = require('./songModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findSongs  = Q.nbind( song.find, song );
var createSong = Q.nbind( song.create, song );
var removeSong = Q.nbind( song.remove, song );
var updateSong = Q.nbind( song.findOneAndUpdate, song );

module.exports = {

  updateSong: function(req, res, next){

    console.log('updateSong = ', req.body.title );

    var song = {
      click : req.body.click,
    };

    updateSong( {title: req.query.title}, song, , {new: true} );
      .then(function(result) {
        if( result.length ) {
          console.log('update song!!! ::: ', result );
          res.send( result );
        } 
        else {
          res.json( [] );
        }
        
      })
      .fail(function (error) {
        console.log('error update song!!! ::: ', error );
        res.json( error );
      });
  },

	searchSong: function(req, res, next){

    console.log('searchSong = ', req.query.keyword );

    var query = {};

    if( req.query.searchCondition === 'title' ) {
      query['title'] = { "$regex": req.query.keyword };
    }
    else if( searchCondition === 'artist' ) {
      query['artist'] = { "$regex": req.query.keyword };
    }

		findSongs( query )
      .then(function(songs) {
      	if( songs.length ) {
      		console.log('songs exists!!! ::: ', songs.length );
          res.send( songs );
        } 
        else {
          res.json( [] );
        }
      	
      })
      .fail(function (error) {
        console.log('error search song!!! ::: ', error );
      	res.json( error );
      });
	},

  removeSong: function(req, res, next){

  	console.log('removeSong = ', req.body.title );

    removeSong( {title: req.body.title} )
      .then(function(result){
        res.json( result );
      })
      .fail(function(error){
        console.log('error remove song!!! ::: ', error );
        res.json( error );
      });
  },

	insertSong: function (req, res, next) {

    var songs = [];

    for( var i = 0; i < req.body.data.length; i++ ) {
      let input = req.body.data[i];
      let song = {};

      song.title = input.title;
      song.album = input.album;
      song.artist = input.artist;
      song.janre = input.janre;
      
      let songPath = input.songPath;
    
      song.media.data = fs.readFileSync( songPath );
      song.media.contentType = path.extname( songPath );
    }

		console.log('insertSong = ', songs.length );

    createSong( songs )
	    .then(function(result){
	      res.json( result );
	    })
	    .fail(function(error){
        console.log('insertSong = ', error );
	      res.json( error );
	    });
    
  }
  
};
