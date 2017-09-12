/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 17:27:28
 * @version $Id$
 */

var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User', usersSchema);
