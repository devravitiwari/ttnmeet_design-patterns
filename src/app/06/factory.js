(function () {
    'use strict';


    var createVideo = (function() { 'use strict';

        // the model
        function Video(config) {
            this.title = config.title;
            this.duration = config.duration;
        }
        Video.prototype.getDetails = function() {
            return `${this.title} : A ${this.duration} min ${this.kind}(${this.id})`;
        };

        // subclass of the model class
        function Beam(config) {
            this.id = config.eventId;
            this.kind = 'beam';
            Video.call(this, config);
        }

        Beam.prototype = Video.prototype;

        // subclass of the model class
        function Vod(config) {
            this.id = config.id;
            this.kind = 'vod';
            Video.call(this, config);
        }



        // the factory function
        function factory(config) {
            if(config.eventId) {
                return new Beam(config);
            } else {
                return new Vod(config);
            }
        }

        return factory;

    })();


    var beamConfig = {
        eventId: 232,
        title: 'Beautiful Mind : A critique',
        duration: 40
    };

    var vodConfig = {
        id: 978,
        title: 'The Chainsmokers - Don\'t let me down',
        duration: 35
    }


    var beam = createVideo(beamConfig);
    var vod = createVideo(vodConfig);

    console.log(beam.getDetails());
    console.log(vod.getDetails());



})();