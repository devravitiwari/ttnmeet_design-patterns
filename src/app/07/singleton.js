(function () {
    'use strict';

    var Repository = (function() { 'use strict';

        var _instance = null;

        function Repository(config) {
            this.name = 'Singleton Repository';
            this.options = config;
        }

        function getInstance(config) {
            if(!_instance) {
                _instance = new Repository(config);
            }
            return _instance;
        }

        return {
            getInstance: getInstance
        }

    })();

    var repo1 = Repository.getInstance({type: 'Blogger'}),
        repo2 = Repository.getInstance({type: 'Post'});

    console.log('Are repos the same ? ', repo1 === repo2);
    console.log(repo1);
    console.log(repo2);

})();