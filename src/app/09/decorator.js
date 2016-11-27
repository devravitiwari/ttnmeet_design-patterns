(function () {
    'use strict';

    var noop = function(){};

    function Beverage() {
        this.description = 'unknown beverage';
        this.getDescription = function() {
            return this.description;
        };
        this.getCost = noop;
    }

    function Espresso() {
        this.description = 'Espresso';
        this.cost = 50;
    }

    Espresso.prototype = new Beverage();

    Espresso.prototype.getCost = function() {
        return this.cost;
    };

    function Latte() {
        this.description = 'Latte';
        this.cost = 45;
    }
    Latte.prototype = new Beverage();
    Latte.prototype.getCost = function() {
        return this.cost;
    };


    function CondimentDecorator() {
        this.getDescription = noop;
    }
    CondimentDecorator.prototype = new Beverage();



    function MilkDecorator(decoratee) {
        this.decoratee = decoratee;
    }
    MilkDecorator.prototype = new CondimentDecorator();
    MilkDecorator.prototype.getDescription = function() {
        return this.decoratee.getDescription() + ' , with extra Milk';
    };
    MilkDecorator.prototype.getCost = function() {
        return this.decoratee.getCost() + 2;
    };




    function MochaDecorator(decoratee) {
        this.decoratee = decoratee;
    }
    MochaDecorator.prototype = new CondimentDecorator();
    MochaDecorator.prototype.getDescription = function() {
        return this.decoratee.getDescription() + ' , Mocha';
    };
    MochaDecorator.prototype.getCost = function() {
        return this.decoratee.getCost() + 5;
    };






    function ChocoDecorator(decoratee) {
        this.decoratee = decoratee;
    }
    ChocoDecorator.prototype = new CondimentDecorator();
    ChocoDecorator.prototype.getDescription = function() {
        return this.decoratee.getDescription() + ' , with Oreo Choco Chips';
    };
    ChocoDecorator.prototype.getCost =  function() {
        return this.decoratee.getCost() + 10;
    };






    function testCase1() {
        var blackMorning = new Espresso();
        var latteEvening = new Latte();
        console.log(blackMorning.getDescription() + ' costs ' + blackMorning.getCost());
        console.log(latteEvening.getDescription() + ' costs ' + latteEvening.getCost());

    }

    function testCase2() {

        var blackMorning = new Espresso();
        var latteEvening = new Latte();

        console.log('Vanilla Beverages');
        console.log(blackMorning.getDescription() + ' costs ' + blackMorning.getCost());
        console.log(latteEvening.getDescription() + ' costs ' + latteEvening.getCost());

        console.log('--===========================--');
        console.log('Decorating the beverages');
        console.log('-------------------------------');

        console.log('>> Espresso with milk and choco dips');


        var blackMorningDecorated = new MilkDecorator(blackMorning);
        console.log(blackMorningDecorated.getDescription() + ' costs ' + blackMorningDecorated.getCost());
        blackMorningDecorated = new ChocoDecorator(blackMorningDecorated);
        console.log(blackMorningDecorated.getDescription() + ' costs ' + blackMorningDecorated.getCost());



        console.log('>> Mocha Latte');

        var mochaLatte = new MochaDecorator(latteEvening);
        console.log(mochaLatte.getDescription() + ' costs ' + mochaLatte.getCost());
        console.log('--===========================--');



    }

    function run() {
        //testCase1();
        testCase2();
    }

    run();



})();