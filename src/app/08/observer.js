(function () {
    'use strict';

    var Subject = (function() { 'use strict';

        var _observers = [],
            _state = null;

        function Subject() {
        }

        Subject.prototype.getPrice = function() {
            return _state;
        };

        Subject.prototype.setPrice = function(newState) {
            _state = newState;
            notify(_state);
        };

        Subject.prototype.register = function(observer) {
            _observers.push(observer);
        };

        Subject.prototype.deregister = function(observer) {
            var index = indexOf(observer);
            if(index > -1) {
                _observers.splice(index, 1);
            }
        };

        function indexOf(observer) {
            return _observers.indexOf(observer);
        }

        function notify(state) {
            _observers.forEach(function(observer) {
                observer.update(state);
            });
        }

        return Subject;

    })();

    var Observer = (function() { 'use strict';

        function Observer(config) {
            this.name = config.name;
        }

        Observer.prototype.update = function(state) {
            console.log(`${this.name} receiving update -  ${state}`);
        };

        return Observer;

    })();


    var newsPaperService = new Subject();

    var house1 = new Observer({name: 'firstHouse'}),
        house2 = new Observer({name: 'secondHouse'}),
        house3 = new Observer({name: 'thirdHouse'});


    newsPaperService.register(house1);
    newsPaperService.register(house2);
    newsPaperService.register(house3);


    newsPaperService.setPrice(1);
    newsPaperService.setPrice(2);

    newsPaperService.deregister(house1);

    newsPaperService.setPrice(5);


})();