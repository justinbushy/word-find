# word-find
This is a node command line tool to cheat at word games. It allows the user to find words from a large dictionary using arguments passed in. 

To install as a command-line tool:
```
git clone https://github.com/justinbushy/word-find.git
cd word-find
npm install 
npm link
```

To run locally: 
```
git clone https://github.com/justinbushy/word-find.git
cd word-find
npm install 
node index.js [params]
```

Parameters:
```
-c [characters given]
-l [length of word needed]
```

For example:
If you were given the letters ceedu and needed a five letter word:
```
wordfind -c ceedu -l 5
```

Or if you are running locally:
```
node index.js -c ceedu -l 5
```
