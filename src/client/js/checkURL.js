/**
 * A function that can be used to check the url.
 */

/* HINTS
    1. https://gist.github.com/franciskim/41a959f8e3989254ef5d - I used this one for this project.
    2. https://www.tutorialspoint.com/How-to-validate-URL-address-in-JavaScript
    3. https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
    4. https://www.codegrepper.com/code-examples/javascript/javascript+validate+url
    5. https://stackoverflow.com/a/5717133/6483379
    6. https://www.npmjs.com/package/valid-url
 */

function checkURL(value)
{
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    return regexp.test(value);
} 

export { checkURL }