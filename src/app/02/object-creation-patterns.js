// Object literal notion - most commonly used

var ttnmeet = {};
ttnmeet.on = new Date(Date.now());
ttnmeet.title = 'Learning Design patterns as applied to JavaScript';
ttnmeet.durationInHours = 3;
ttnmeet.toString = function() {
    return `A ${this.durationInHours}+ hours TTN meet on ${this.title}, on ${this.on}`
};

console.log(ttnmeet.toString());


// Object.create - new api introduced in ECMA5
var beam = Object.create(null); // prototype to delegate to - note the use of `delegate` instead of `inherit`
beam['id'] = 456;
beam.title = 'Learning JavaScript Creational Patterns';
beam.duration = 50;

console.log(beam);



// Object literal with property accessors
var point = {
    x: 1.0,
    y: 1.0,

    get r() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() {
        return Math.atan2(this.y, this.x);
    },
    get polar() {
        return "("+this.r+", "+this.theta+")";
    }
};

console.log(point);
console.log(point.polar);
