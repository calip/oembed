/**
 * Oembed - Configuration
 * 
 * oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.
 *
 * @copyright 2020 Beplas Studio
 *
 * @license MIT
 *
 * @package oembed
 * @version 1.0
 * @author  Beplas Studio <alip@beplasstudio.com>
 * @link    https://beplasstudio.com/
 */
function oembed_render()
{
    if (!$.oembed) {
        $.oembed = {};
    };
    
    $.oembed.config = {
      width: 420,
      height: 345
    };
    
    $.oembed.apis = {
        youtube: "https://www.youtube.com/oembed?url=#tag#&callback=?",
        vimeo: "https://vimeo.com/api/oembed.jsonp?url=#tag#&callback=?",
        dailyMotion: "https://www.dailymotion.com/api/oembed?url=#tag#&callback=?",
        twitter: "https://api.twitter.com/1/statuses/oembed.json?url=#tag#&callback=?",
        soundcloud: "https://soundcloud.com/oembed.json?url=#tag#&callback=?",
        facebook: "https://web.facebook.com/plugins/post/oembed.json?url=#tag#&callback=?",
        amcharts: "https://live.amcharts.com/oembed/?url=#tag#&callback=?"
    };
    
    $.oembed.schemes = {
        youtube: [
            "https?:\/\/(?:www\.)?youtube\\.com/watch.+v=[\\w-]+&?",
            "https?:\/\/(?:www\.)?youtu\\.be/[\\w-]+",
            "https?:\/\/www\.youtube.com/embed"],
        vimeo: [
            "https?:\/\/(?:www\.)?vimeo\.com\/groups\/.*\/videos\/.*",
            "https?:\/\/(?:www\.)?vimeo\.com\/.*",
            "https?:\/\/(?:www\.)?vimeo\.com\/groups\/.*\/videos\/.*",
            "https?:\/\/(?:www\.)?vimeo\.com\/.*"],
        dailyMotion: ["https?:\/\/(?:www\.)?dailymotion\\.com/.+"],
        twitter: ["https?:\/\/(?:www\.)?twitter.com/.+"],
        soundcloud: ["https?:\/\/(?:www\.)?soundcloud\\.com\/.+"],
        facebook: ["https?:\/\/(?:web\.)?facebook\.com\/(?:.*|photos)\/(?:.*|post|photos|videos)"],
        amcharts: ["https?:\/\/(?:www\.)?live\.amcharts\.com\/.*"]
    };

    $.oembed.extractors = {
        youtube: /.*(?:v\=|be\/|embed\/)([\w\-]+)&?.*/
    };

    $.oembed.templates = {
        youtube: "<iframe src=\"https://www.youtube.com/embed/#tag#\"" +
                 "width=\"#width#\" height=\"#height#\"></embed>",
        soundcloud: "<iframe src=\"https://w.soundcloud.com/player/?visual=true&url=#tag#\"" +
                 "width=\"#width#\" height=\"#height#\"></embed>",
        amcharts: "<iframe src=\"#tag#/embed\" width=\"#width#\" height=\"#height#\"></embed>"
     };
    
    // Get HTML either by building an HTML template with
    $.oembed.getHTML = function (provider, tag, node) {
      var template = this.templates[provider];
      if (template) {
        node.replaceWith(template.replace("#tag#", tag)
        .replace("#width#", this.config.width)
        .replace("#height#", this.config.height));
      } else {
        var url = this.apis[provider].replace('#tag#', tag);
        $.getJSON(url, null, function (data) {
            node.replaceWith(data.html);
        });
      }
    };
    
    $.oembed.match = function (url, node) {
        for (var provider in this.schemes) {
            var schemes = this.schemes[provider];
            var extractor = this.extractors[provider];
            for (var i = 0; i < schemes.length; i++) {
                var regExp = new RegExp(schemes[i], "i");
                var match = url.match(regExp);
                if (!(match !== null)) { continue; }
                if (extractor) {
                    var tag = url.match(extractor)[1];
                } else {
                    var tag = match[0];
                }
                tag = provider == 'amcharts' ? tag: encodeURIComponent(tag);
                return this.getHTML(provider, tag, node);
            }
        }
    };
    $.fn.oembed = function () {
        return this.each(function () {
            var $this = $(this);
            $this.find("a").each(function (i, link) {
                $container = $(link);
                var url = $container.attr('href');
                $.oembed.match(url, $container);
            });
        });
    };
    $('[itemprop="articleSection"]').oembed();
}
oembed_render();
