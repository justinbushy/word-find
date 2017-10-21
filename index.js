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
    console.log('has -l ' + argv.l);
    filteredWords = filteredWords.filter(w => w.length === argv.l);
}

// then, filter repeating letters
// check all given characters and save which ones only occur once
var singleChars = [];
for(var j = 0; j < argv.c.length; j++) {
    if((argv.c.split(argv.c[j]).length - 1) === 1) {
        singleChars.push(argv.c[j]);
    }
}

// iterate over single characters and make sure they don't occur more than once
// in filter
for(i = 0; i < singleChars.length; i++) {
    filteredWords = filteredWords.filter(w => (w.split(singleChars[i]).length - 1) <= 1);
}

// finally, print out found words
console.log(filteredWords);
