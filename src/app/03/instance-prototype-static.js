function Session(title, owner, duration) {
    this.title = title;
    this.owner = owner;
    this.duration = duration;
    this.register = function() {
        // A specific way to register this session
    }
}

Session.prototype.prefix = 'Session';
Session.prototype.getDetails = function() {
    return `${this.prefix} ${this.title} - A ${this.duration} minutes session by ${this.owner}`;
};


Session.getHash = function(obj) {
    if( obj instanceof Session) {
        return obj.duration ^ 37;
    }
}

var thisSesson = new Session(
    'JavaScript Patterns',
    'The Community',
    300
);

console.log(thisSesson.getDetails());


var sessions = [];
[1,2,3,4,5].forEach(function(){
    sessions.push(new Session(
    'JavaScript Patterns ' + ((Math.random() * 97) | 0),
    'The Community ' +  ((Math.random() * 47) | 0),
    ((Math.random() * 300) | 0)
));
});

//console.log(Session);
//sessions.forEach(x => console.log(x));
//sessions.forEach(x => console.log(x.getDetails()));
sessions.forEach(function(x) { console.log(x.getDetails(), ' ===> ', Session.getHash(x))} );

