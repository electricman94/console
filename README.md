# Console

An extension of the web console API.  Allows for backlogging and extended logging functionalities.

## Include

```
<script src="includes/script/log.js" integrity='sha384-l4Bt6prRZPKMBj49DQiYHLIPO/0YU+wpbKHTK8vVnyofcA9VOK9WMp5IBf7pq5Nc'></script>
```

## Interface

```
// level reported
level: 'debug',
// types defined
type: {
    'debug': 0,
    'log': 10,
    'info': 20,
    'warn': 30,
    'error': 40,
    'critical': 50
},
// enable backlogging of previous messages
enableBacklog: true,
// the backlog array
backlog: [],
// maximum length of the console backlog.  Set to 0 for infinite.
maxBacklogLength: 32,
// convert messages to JSON array in the backlog.
jsonify: false,
// maximum backlog width used when jsonifying.  Set to 0 for infinite.
maxBacklogWidth: 256
```

## Examples

Warning: This module tries to overwrite the window.console object.  The MDN docs define window.console as a read only object.  While I have tested in a variety of browsers and found window.console can be assigned to in Chrome, Firefox, and IE, that may change in the future.  As a precaution, I recommend using window.log.<method> instead of window.console.<method>.

### Hello World

```
console.log('Hello World!');
```

### All functions

```
console.debug('debug');
console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.critical('critical');
```

### Supress output

```
console.level = 'info';

console.debug('debug');
console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.critical('critical');
```

### Backlogging

```
console.enableBacklog = true;
console.log('Hello World!');
alert(JSON.stringify(console.backlog));
```

### Backlogging as JSON

```
console.enableBacklog = true;
console.jsonify = true;

console.log('Hello World!');
alert(JSON.stringify(console.backlog));
```

### Limit lengths

```
console.enableBacklog = true;
console.jsonify = true;
console.maxBacklogLength = 2;
console.maxBacklogWidth = 12;


console.log('1: Hello World!');
console.log('2: Hello World!');
console.log('3: Hello World!');
console.log('4: Hello World!');
alert(JSON.stringify(console.backlog));
```

## License

This project is licensed under the GNULGPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
