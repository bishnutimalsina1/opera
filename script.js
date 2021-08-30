jQuery(document).ready(function($) {
    var slider = $(".royalSlider").royalSlider({
        arrowsNav: false,
    fadeinLoadedSlide: true,
    controlNavigationSpacing: 0,
    controlNavigation: 'thumbnails',
    thumbs: {
      autoCenter: false,
      fitInViewport: true,
      orientation: 'vertical',
      spacing: 0,
      paddingBottom: 0
    },
    keyboardNavEnabled: true,
    imageScaleMode: 'fill',
    imageAlignCenter:true,
    slidesSpacing: 0,
    loop: false,
    loopRewind: true,
    numImagesToPreload: 3,
    video: {
      autoHideArrows:true,
      autoHideControlNav:false,
      autoHideBlocks: true
    }, 
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 450,
    imgWidth: 640,
    imgHeight: 360
    }).data('royalSlider');
    
    slider.ev.on('rsOnCreateVideoElement', function() {
        var f = slider.videoObj,
        url = f.attr('src').split('?')[0];
        // postMessage
        function post(action, value) {
            var data = { method: action };
            if (value) {
                data.value = value;
            }
            if (f && f[0] && f[0].contentWindow) f[0].contentWindow.postMessage(JSON.stringify(data), url);
        }
        // display event
        function onMessageReceived(e) {
            var data = JSON.parse(e.data);
            // Add listeners here
            if (data.event === 'ready') {
                // post('addEventListener', 'play');
                // post('addEventListener', 'pause');
                post('addEventListener', 'finish');
            }
            if (data.event === 'finish') {
              if (data.event === 'finish') {
                setTimeout(function(){
                  var $slider = $('.royalslider');
                    slider.next();
                    console.log(slider.currSlideId);
                },2000);
            }
             }
        }
        if (window.addEventListener){
            window.addEventListener('message', onMessageReceived, false);
        } else { // IE
            window.attachEvent('onmessage', onMessageReceived, false);
        }
    });
});