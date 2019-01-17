/**
 * @name Smanker
 * @author Malte Zoudlik
 * @version 1.0.0
 * @copyright (c) 2019
 */

var Smanker = function(selector, topOffset) {
    var linkElements = (!selector || typeof selector == "undefined") ? document.querySelectorAll('a[href^="#"]') : document.querySelectorAll(selector),
        offset = (!topOffset || typeof topOffset == "undefined") ? 0 : topOffset,
        timer = null;

    [].forEach.call(linkElements, function(elem) {
        elem.addEventListener('click', runScrollAnimation);
    });

    function runScrollAnimation(e) {
        var elem = e.currentTarget, 
            target = document.getElementById(elem.getAttribute('href').replace('#', ''));

        e.preventDefault();
        scrollFunction(target, 800, offset);
    }
    function scrollFunction(elem, duration, view) {
        if (view === "top") view = 0; 
        else if (view === "bottom") view = window.innerHeight;
        else if (view === "center") view = window.innerHeight / 2;

        if(timer !== null) {
            window.clearTimeout(timer);
            timer = null;
        }

        var steps = (elem.getBoundingClientRect().top - window.pageXOffset - view) / (duration / 15),
            currentTime = 0,
            animateScroll = function () {
                currentTime += 15;
                var val = steps;

                document.documentElement.scrollTop += val;
                if (currentTime < duration) timer = setTimeout(animateScroll, 15);
            };
        animateScroll();
    }
}
