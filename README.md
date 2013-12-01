# spotifyDOM solution
> by Ricardo Pabón ![rpabon8bit](/img/favicon.png)

* The solution is included in __js/spotifyDOM.js__
* Tests are included in __js/tests.js__
* The code in both files can be seen also in this document
* The solution can be seen online [here](http://pabon.16mb.com/spotifydom)

## Proposed solution

```javascript
/**
 * Constructor for the SpotifyDOM object.
 *
 * @param selector {String}, it can follow the following formats:
 *  - class e.g. '.element'
 *  - identifier e.g. '#element'
 *  - tag name e.g. 'li'
 * @return {SpotifyDOM}
 */
var SpotifyDOM = function(selector) {

    if( selector ) {
        if( selector.nodeType ) {

            this[0] = selector;
            this.length = 1;

        } else if( typeof selector === 'string' ) {
            var elements = document.querySelectorAll(selector);

            for( var i in elements ) {
                this[i] = elements[i];
            }

            this.length = elements.length;
        }
    }

    return this;
};

/**
 * Changes or returns the content of the element.
 *
 * @param content {String}
 * @return {SpotifyDOM}
 * @method html
 * @return {String} The content of the element
 * @throws {SpotifyDOMInvalidElement} When the current content of the wrapper
 * is a collection,
 *  e.g. SpotifyDOM(‘li’).html(‘test’)
 */
SpotifyDOM.prototype.html = function(content) {

    if( this.isCollection() ) {
        var SpotifyDOMInvalidElement = function() {
            return this;
        };
        return new SpotifyDOMInvalidElement();

    } else {
        if( content && (typeof content !== 'undefined') ) {
            this[0].innerHTML = content;
        }
    }

    return this;
};

/**
 * Applies the callback to every element of the collection, the callback will
 * receive the current SpotifyDOM object of the iteration.
 *
 *  e.g. SpotifyDOM(‘li’).each(function(element) { element.html(‘test’); });
 *
 * @method each
 * @param {Function} callback
 * @return {SpotifyDOM}
 */
SpotifyDOM.prototype.each = function(callback) {

    if( callback && (typeof callback === 'function') ) {
        for( var i = 0; i < this.length; i++ ) {
            var spotifyElement = new SpotifyDOM(this[i]);
            callback.call(this, spotifyElement, i);
        }
    }

    return this;
};

/**
 * @method isCollection
 * @return {Boolean} true if the currently selected element is a collection(e.g. ‘li’).
 */
SpotifyDOM.prototype.isCollection = function() {
    return this.length > 1;
};
```

## Tests for the proposed solution


```javascript
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
```
