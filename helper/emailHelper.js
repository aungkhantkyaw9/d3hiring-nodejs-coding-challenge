"use strict";

/**
 * Validate Email
 *
 * @param email
 * @reutrn True (valid) | False (not valid)
 */
exports.validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Extract Email
 *
 * @param message text message
 * @reutrn email array that found in given string
 */
exports.extractEmail = (message) => {
    let re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
    let matches = [...message.matchAll(re)].flat();
    
    return [...new Set(matches)];
}