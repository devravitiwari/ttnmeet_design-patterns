function Castle(name) {
    this.name = name;
    this.build = function () {
        console.log(this.name);
    }
}

var castleBlack = new Castle('Castle Black');
var winterfell = new Castle('Winterfell');


castleBlack.build();
winterfell.build();

// monkey patching
castleBlack.build = function() {
    console.log('Harrenhall');
};

castleBlack.build();
winterfell.build();


///////////

// function Castle(name) {
//     this.name = name;
// }
//
// Castle.prototype.build = function() {
//     console.log('From the vantage point of castle ', this.name);
// };
//
// var castleBlack = new Castle('Castle Black');
// var winterfell = new Castle('Winterfell');
//
//
// castleBlack.build();
// winterfell.build();
//
