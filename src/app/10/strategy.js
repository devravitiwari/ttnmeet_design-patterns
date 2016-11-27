(function () {
    'use strict';

    function Comment(options) {
        this.title = options.title;
        this.time = options.time;
    }
    Comment.prototype.toString = function() {
        return this.title + ' made at ' + this.time + ' hours';
    };

    function getHash() {
        var salt = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var hash = ' [';
        [1,2,3,4,5,6,7,8,9,0].forEach(function() {
            hash += salt[0|(Math.random() * salt.length)];
        });
        return hash + '] ';
    }



    function CommentsCollection() {
        this.strategy;
        this.comments = null;
        this.setStrategy = function(strategy) {
            this.strategy = strategy;
        };
    }
    CommentsCollection.prototype.showComments = function() {
        this.comments.sort(this.strategy.comparator).forEach(function(c) {
            console.log(c.toString());
        });
    };

    function getComments() {

        function getCommentPrefix(time) {
            var commentPrefix;

            if(time >= 8 && time < 12) {
                commentPrefix = '[+] Morning Comment';
            } else if(time >= 12 && time < 16) {
                commentPrefix = '[*] Afternoon Comment';
            } else if(time >= 16 && time < 20) {
                commentPrefix = '[-] Evening Comment';
            } else if(time >= 20 && time < 24){
                commentPrefix = '[.] Night Comment';
            } else {
                commentPrefix = '[ ] Early Morning Comment';
            }
            return commentPrefix;
        }

        var count = 30
            , comments = []
            , time
            ;

        while (count--) {
            time = (Math.random() * 24) | 0;
            comments.push(new Comment({
                time: time,
                title: getCommentPrefix(time) + getHash()
            }));
        }
        return comments;
    }


    var CommentSortStrategy = function() {
        // default Strategy
        this.comparator = function(first, second) { return first.time - second.time};
    };

    CommentSortStrategy.MorningFirst = new CommentSortStrategy();
    CommentSortStrategy.MorningFirst.comparator = function(first, second) {
        if(first.time >= 8 && first.time < 12) {
            // first is a morning comment
            if(second.time >= 8 && second.time < 12) {
                // second is also a morning comment
                // sort first and second in ascending order
                return first.time - second.time;
            } else {
                // first is a morning comment but second is not.
                return -1;
            }
        } else {
            // first is not a morning comment
            if(second.time >= 8 && second.time < 12) {
                // second is a morning comment
                // order second comment before first
                return 1;

            } else {
                // none is a mornign comment;

                // sort first and second in ascending order
                //return first.time - second.time;

                // do not sort
                return 0;
            }
        }
    };

    CommentSortStrategy.EveningFirst = new CommentSortStrategy();
    CommentSortStrategy.EveningFirst.comparator = function(first, second) {
        if(first.time >= 16 && first.time < 20) {
            // first is a morning comment
            if(second.time >= 16 && second.time < 20) {
                // second is also a morning comment
                // sort first and second in ascending order
                return first.time - second.time;
            } else {
                // first is a morning comment but second is not.
                return -1;
            }
        } else {
            // first is not a morning comment
            if(second.time >= 16 && second.time < 20) {
                // second is a morning comment
                // order second comment before first
                return 1;

            } else {
                // none is a mornign comment;

                // sort first and second in ascending order
                //return first.time - second.time;

                // do not sort
                return 0;
            }
        }
    };

    CommentSortStrategy.NightMorningEveningRest = new CommentSortStrategy();
    CommentSortStrategy.NightMorningEveningRest.comparator = function(first, second) {

        if(first.time >= 20 && first.time < 24) {
            first.sortPriority = 1;
        } else if(first.time >= 8 && first.time < 12) {
            first.sortPriority = 2;
        } else if(first.time >= 16 && first.time < 20) {
            first.sortPriority = 3;
        } else {
            first.sortPriority = 10;
        }

        if(second.time >= 20 && second.time < 24) {
            second.sortPriority = 1;
        } else if(second.time >= 8 && second.time < 12) {
            second.sortPriority = 2;
        } else if(second.time >= 16 && second.time < 20) {
            second.sortPriority = 3;
        } else {
            second.sortPriority = 10;
        }

        var sortOrder = 0 ;
        if(first.sortPriority == second.sortPriority) {
            sortOrder = first.time - second.time;
        } else {
            sortOrder = first.sortPriority - second.sortPriority;
        }

        delete first.sortPriority;
        delete second.sortPriority;
        return sortOrder;

    };


    function testCase1() {
        var commentCollection = new CommentsCollection();
        commentCollection.comments = getComments();

        commentCollection.setStrategy(CommentSortStrategy.MorningFirst);
        commentCollection.showComments();

        console.log('= = = = = = = = = = = = = = = = = = =');

        commentCollection.setStrategy(CommentSortStrategy.EveningFirst);
        commentCollection.showComments();

    }

    function testCase2() {
        var commentCollection = new CommentsCollection();
        commentCollection.comments = getComments();
        commentCollection.setStrategy(CommentSortStrategy.NightMorningEveningRest);
        commentCollection.showComments();
    }

    function run() {
         testCase1();
        //testCase2();
    }

    run();



})();