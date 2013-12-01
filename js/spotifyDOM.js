/**
 * Author: Ricardo Pabón
 * Date: 01.12.13
 */

/**
 * Constructor for the SpotifyDOM object.
 *
 * @param selector {String}, it can follow the following formats:
 *  - class e.g. '.element'
 *  - identifier e.g. '#element'
 *  - tag name e.g. 'li'
 * @return {SpotifyDOM}
 */
var SpotifyDOM = function( selector ) {

    if( selector ) { //check if the parameter has been given
        if( selector.nodeType ) { //handle DOM Element entry

            this[0] = selector;
            this.length = 1;

        } else if( typeof selector === 'string' ) { //handle #id, .class and element entries
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
SpotifyDOM.prototype.html = function( content ) {

    if( this.isCollection() ) { //check if the instance is a collection
        var SpotifyDOMInvalidElement = function() {
            return this;
        };
        return new SpotifyDOMInvalidElement(); //error handling

    } else {
        if( content && (typeof content !== 'undefined') ) { //change the inner content
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
SpotifyDOM.prototype.each = function( callback ) {

    if( callback && (typeof callback === 'function') ) {
        for( var i = 0; i < this.length; i++ ) {
            //make a spotifyDOM instance of the DOM element to pass to the callback
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