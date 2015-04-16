'use strict';

// Create an instance
var wavesurfer2 = Object.create(WaveSurfer);

// Init & load audio file
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : document.querySelector('#waveform2'),
        waveColor     : 'violet',
        progressColor : 'purple',
        cursorColor   : 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    /*wavesurfer.init({
        container: document.querySelector('#wave'),
        backend: 'MediaElement'
    });*/

    // Init
    wavesurfer2.init(options);
    // Load audio from URL
    wavesurfer2.load('media/demo2.mp3');

    // Regions
    if (wavesurfer2.enableDragSelection) {
        wavesurfer2.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.7)'
        });
    }
});

// Play at once when ready
// Won't work on iOS until you touch the page
wavesurfer2.on('ready', function () {
    //wavesurfer.play();
});

// Report errors
wavesurfer2.on('error', function (err) {
    console.error(err);
});

// Do something when the clip is over
wavesurfer2.on('finish', function () {
    console.log('Finished playing');
});


/* Progress bar */
document.addEventListener('DOMContentLoaded', function () {
    var progressDiv = document.querySelector('#progress-bar2');
    var progressBar = progressDiv.querySelector('.progress-bar2');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer2.on('loading', showProgress);
    wavesurfer2.on('ready', hideProgress);
    wavesurfer2.on('destroy', hideProgress);
    wavesurfer2.on('error', hideProgress);
});


// Drag'n'drop
document.addEventListener('DOMContentLoaded', function () {
    var toggleActive = function (e, toggle) {
        e.stopPropagation();
        e.preventDefault();
        toggle ? e.target.classList.add('wavesurfer-dragover') :
            e.target.classList.remove('wavesurfer-dragover');
    };

    var handlers = {
        // Drop event
        drop: function (e) {
            toggleActive(e, false);

            // Load the file into wavesurfer
            if (e.dataTransfer.files.length) {
                wavesurfer2.loadBlob(e.dataTransfer.files[0]);
            } else {
                wavesurfer2.fireEvent('error', 'Not a file');
            }
        },

        // Drag-over event
        dragover: function (e) {
            toggleActive(e, true);
        },

        // Drag-leave event
        dragleave: function (e) {
            toggleActive(e, false);
        }
    };
});
