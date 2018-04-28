// map to log then copy everything over b/c MDN defines console as read-only
window.log = (function(console) {
    // define added behaviours
    var module = {
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
        // handle functions
        handle: {
            'debug': (console && console.log ? console.log : undefined),
            'log': (console && console.log ? console.log : undefined),
            'info': (console && console.info ? console.info : undefined),
            'warn': (console && console.warn ? console.warn : undefined),
            'error': (console && console.error ? console.error : undefined),
            'critical': (console && console.error ? console.error : undefined)
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
    };

    // overwrite debug info log err
    Object.keys(module.type).forEach(function(level) {
        module[level] = function() {
            if (console.type[level] >= console.type[console.level]) {
                // backlog cache portion
                if (console.enableBacklog) {
                    // pop off end if backlog is too long
                    while (console.backlog.length >= console.maxBacklogLength) {
                        console.backlog.pop();
                    }

                    // either take json or maintain pointers
                    var items = Array.prototype.slice.call(arguments);
                    if (console.jsonify) {
                        items = JSON.stringify(items);
                        // cut json string if too long
                        if (console.maxBacklogWidth > 0) {
                            items = items.substring(0, (console.maxBacklogWidth > items.length ? items.length : console.maxBacklogWidth))
                        }
                    }

                    // add to backlog
                    console.backlog.unshift(items);
                }

                // logging portion
                if (console.handle[level]) {
                    console.handle[level].apply(console, arguments);
                }
            }
        };
    });

    return module;
}(window.console ? window.console : undefined));

// try an copy everything over to the console object.  We do this b/c technically its defined as read only
for (attr in window.log) {
    try {
        console[attr] = window.log[attr];
    } catch (err) {}
}
