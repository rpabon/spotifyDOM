/****************** Tests for the spotifyDOM wrapper ********************/
var launchTests = function() {
    //TEST 1 :: By element id
    //get the element <p id="paragraph"></p>
    var paragraph = new SpotifyDOM('#paragraph');
    
    //console messages
    if(console){ 
        console.warn ? console.warn('Selector for #paragraph', paragraph) : console.log('Selector for #paragraph', paragraph);
    }
    
    //change the inner content of <p id="paragraph"></p>
    paragraph.html('This paragraph was changed using the spotifyDOM wrapper on ' + today().date + ' at ' + today().time);

    //TEST 2 :: By element class
    //get the element <p class="spotifyDOM-class"></p>
    var spotifyCLass = new SpotifyDOM('.spotifyDOM-class');

    //console messages
    if(console){
        console.warn ? console.warn('Selector for .spotifyDOM-class', spotifyCLass) : console.log('Selector for .spotifyDOM-class', spotifyCLass);
    }

    //change the inner content of <p class="spotifyDOM-class"></p>
    spotifyCLass.html('This element was changed using the spotifyDOM wrapper on ' + today().date + ' at ' + today().time);

    //TEST 3 :: By element name and collections
    //get all the elements <li></li>
    var listItems = new SpotifyDOM('li');

    //console messages
    if( console ) { 
        if( console.warn ) {
            console.warn('Selector for <li>', listItems);
            if( listItems.isCollection() ) {
                console.warn('The list is a collection!');
            }
        } else {
            console.log('Selector for <li>', listItems);
            if( listItems.isCollection() ) {
                console.log('The list is a collection!');
            }
        }
    }
    
    //change the inner content of all <li></li> elements and add to them the class "active"
    listItems.each(function( item ) {
        item.html('<span class="badge">new</span>New content for list element added on ' + today().date + ' at ' + today().time);
        item[0].className += ' active';
    });
};
/***********************************************************************/

/***** Callback for the fire button using the spotifyDOM wrapper *******/
var fireButton = new SpotifyDOM('#fire-tests');
fireButton.each(function( btn ) {
    btn[0].addEventListener("click", function() {
        launchTests();
    }, false);
});
/**********************************************************************/

/******************* Date and time function ***************************/
var today = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Because January is 0
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    if( dd < 10 ) { dd = '0' + dd }
    if( mm < 10 ) { mm = '0' + mm }
    if( HH < 10 ) { HH = '0' + HH }
    if( MM < 10 ) { MM = '0' + MM }

    return{
        date: dd + '.' + mm + '.' + yyyy,
        time: HH + ':' + MM
    }
};
/**********************************************************************/