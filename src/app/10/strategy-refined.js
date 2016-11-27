(function () {
    'use strict';

    function Comment(options) {
        this.title = options.title;
        this.time = options.time;
    }
    Comment.prototype.toString = function() {
        return this.title + ' made at ' + this.time + ' hours';
    };

    function CommentsCollection() {
        this.strategy = new CommentSortStrategy;
        this.comments = null;
        this.setStrategy = function(strategy) {
            this.strategy = strategy;
        };
    }

    CommentsCollection.prototype.showComments = function() {

        this.strategy.sort(this.comments).forEach(function(c) {
            console.log(c.toString());
        });
    };


    function getHash() {
        var salt = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var hash = ' [';
        [1,2,3,4,5,6,7,8,9,0].forEach(function() {
            hash += salt[0|(Math.random() * salt.length)];
        });
        return hash + '] ';
    }

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
                commentPrefix = '[ ] Night Comment';
            } else {
                commentPrefix = '[.] Early Morning Comment';
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
        this.sort = function(comments) {
            return comments.sort(this.comparator);
        };
        this.comparator = function(first, second) {
            return first.time - second.time;
        };
    };

    CommentSortStrategy.NightMorningEveningRest = new CommentSortStrategy();
    CommentSortStrategy.NightMorningEveningRest.comparator = function(first, second) {
        var sortOrder = 0 ;
        if(first.sortPriority == second.sortPriority) {
            sortOrder = first.time - second.time;
        } else {
            sortOrder = first.sortPriority - second.sortPriority;
        }
        return sortOrder;
    };
    CommentSortStrategy.NightMorningEveningRest.sort = function(comments) {
        var rawComments = comments,
            sortedComments;

        // prepare comments as per strategy
        rawComments.forEach(function(comment) {

            if(comment.time >= 20 && comment.time < 24) {
                comment.sortPriority = 1;
            } else if(comment.time >= 8 && comment.time < 12) {
                comment.sortPriority = 2;
            } else if(comment.time >= 16 && comment.time < 20) {
                comment.sortPriority = 3;
            } else {
                comment.sortPriority = 10;
            }


        });

        // perform action
        sortedComments = rawComments.sort(this.comparator);

        // reset comments to raw comments as if nothing happened
        rawComments.forEach(function(comment) {
            delete comment.sortPriority;
        });

        return sortedComments;
    };

    function testCase1() {
        var commentCollection = new CommentsCollection();
        commentCollection.comments = getComments();
        commentCollection.setStrategy(CommentSortStrategy.NightMorningEveningRest);
        commentCollection.showComments();
    }

    function run() {
        testCase1();
    }

    run();



})();