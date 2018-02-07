const open = require("open");
const fs = require('fs')
const path = require('path')
// open("http://www.yahoo.com");

const openurls = dir => {
  const moveFrom = dir

  fs.readdir( moveFrom, function( err, files ) {
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 

    files.forEach( function( file, index ) {
      var fromPath = path.join( moveFrom, file );      // var toPath = path.join( moveTo, file );

      fs.stat( fromPath, function( error, stats ) {
        if ( error ) {console.error( "Error stating file.", error ); return;}

        if ( stats.isFile() ) {
          console.log( "'%s' is a FILE.", fromPath );
        } else if( stats.isDirectory() ) {
          console.log( "'%s' is a FOLDER.", fromPath );
          fromPath = path.join(fromPath, 'index-FINISHED.html')
          if (!fs.existsSync(fromPath)) {
            fromPath = fromPath.replace('-FINISHED', '')
          }
          open(fromPath)          // open(fromPath, 'brackets')
        } else {
          console.log( "'%s' is a huh???????.", fromPath );
        }
      });
    });
});


}

openurls('../')