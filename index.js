#! /usr/bin/env node

var _ = require('lodash');

//load JSON dictionary of words
var words = require('./words_dictionary.json');

//use minimist to parse args
var argv = require('minimist')(process.argv.slice(2));

// -l length
// -c characters given

// seperate all characters for -c param into array
var givenCharacters = argv.c.split('');

//create regex for words with only given characters
var regexStr = '^[';

for(var i = 0; i < givenCharacters.length; i++) {
    regexStr += givenCharacters[i];
}

regexStr += ']*$';

var re = new RegExp(regexStr);

// first, filter by characters alone
var filteredWords = Object.keys(words).filter(w => w.match(re));

// then, filter by length if -l param present
if(argv.l) {
    filteredWords = filteredWords.filter(w => w.length === argv.l);
}

// then find number of occurences of each letter from -c param

var charsObj = {};
for(var j = 0; j < argv.c.length; j++) {
    charsObj[argv.c[j]] = argv.c.split(argv.c[j]).length - 1;
}

// filter by occurences of each letter to verify words don't contain too many
// letters

var singles = Object.keys(charsObj);
for(i = 0; i < singles.length; i++) {
    filteredWords = filteredWords.filter(
        w => (w.split(singles[i]).length - 1) <= charsObj[singles[i]]);
}

// finally, print out found words
console.log('Found ' + filteredWords.length + ' possible words:');
for(i = 0; i < filteredWords.length; i++) {
    console.log('\t' + filteredWords[i]);
}
