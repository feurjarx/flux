var Dispatcher = (function () {
    var Event = (function () {

        function Event(name) {
            this.handlers = [];
            this.name = name;
        }

        Event.prototype.addHandler = function (fn) {
            this.handlers.push(fn);
        };

        Event.prototype.fire = function () {
            var args = [].concat.apply([], arguments);
            this.handlers.forEach(function (fn) {
                fn.apply(null, args);
            });
        };

        return Event;
    }());


    var EventAggregator = (function() {
        var events = [];

        function getEvent(name) {
            return events.find(function (event) {
                return event.name === name;
            });
        }

        function dispatch() {
            var args = [].concat.apply([], arguments);
            var eventName = args[0];

            var event = getEvent(eventName);
            if (!event) {
                event = new Event(eventName);
                events.push(event);
            }

            event.fire(args.splice(1));
        }

        function subscribe(eventName, handler) {
            var event = getEvent(eventName);
            if (!event) {
                event = new Event(eventName);
                events.push(event);
            }

            event.addHandler(handler);
        }

        return {
            dispatch: dispatch,
            subscribe: subscribe
        };
    }());

    return EventAggregator;
}());