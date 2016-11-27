// Single level namespace
var Westeros = Westeros || {};

Westeros.Castle = function(name) {
    this.name = name;
};

Westeros.Castle.prototype.build = function() {
    console.log('Building castle : ', this.name);
};

// Multi level namespace
var Westeros = Westeros || {};

Westeros.Structures = Westeros.Structures || {};

Westeros.Structures.Castle = function(name) {
    this.name = name;
};

Westeros.Structures.Castle.prototype.build = function() {
    console.log('Building castle : ', this.name);
};


Westeros.Houses = Westeros.Houses || {};

function Stark() {
}

Westeros.Houses.Stark = new Stark();

Westeros.Houses.Stark.getDetails = function() {
    console.log('Sigel : DireWolf');
    console.log('Words : "Winter is coming"');
    console.log('Ruling House : House Stark');
};


/////////////

// A complete example

var Westeros;
(function (Westeros) {
    // root namespace/module
    (function (Structures) {
        // sub namespace

        var Castle = Structures.Castle = (function () {
            function Castle(name) {
                this.name = name;
            }
            Castle.prototype.Build = function () {
                console.log("Castle built: " + this.name);
            };
            return Castle;
        })();

        var Wall = Structures.Wall = (function () {
            function Wall() {
                console.log("Wall constructed");
            }
            return Wall;
        })();

    })(Westeros.Structures || (Westeros.Structures = {}));

})(Westeros || (Westeros = {}));



////////


var Session = (function() { 'use strict';
    // the constructor function
    function Session(title, duration) {
        this.title = title;
        this.duration = duration;
    }
    // util functions
    function getDetails() {
        return `${this.title} - ${this.duration} minutes`;
    }

    // augmenting prototype
    Session.prototype.getDetails = getDetails;

    // returning constructor
    return Session;

})();


var sessions = [];
[1,2,3,4,5].forEach(() => {
    sessions.push(new Session(
        'JavaScript Patterns ' + ((Math.random() * 97) | 0),
        ((Math.random() * 300) | 0)
    ));
});

sessions.forEach(x => console.log(x.getDetails()));


