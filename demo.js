$( document ).ready(function() {
    
    var fileLoader = new LoadFile();
    
    fileLoader._addFile("demo.css","cSS");
    fileLoader._addFile("demo2.css","cSS");
    fileLoader._addFile("demo3.css","cSS");
    fileLoader._addFile("demo4.css","cSS");
    fileLoader._addFile("demo5.css","cSS");
    
    setTimeout(function(){
    	fileLoader._removeAllFiles();
    },1000);
    
    console.log( "ready!",fileLoader);
   
});