(function($) {
  "use strict";

  var imageSelector = [
    ".page__content img[src$='.jpg']",
    ".page__content img[src$='.jpeg']",
    ".page__content img[src$='.png']",
    ".page__content img[src$='.gif']",
    ".page__content img[src$='.webp']",
    ".page__content img[src$='.JPG']",
    ".page__content img[src$='.JPEG']",
    ".page__content img[src$='.PNG']",
    ".page__content img[src$='.GIF']",
    ".page__content img[src$='.WEBP']"
  ].join(",");

  $(function() {
    $(imageSelector).each(function() {
      var $img = $(this);

      if ($img.hasClass("emoji") || $img.closest("a").length) {
        return;
      }

      var src = $img.attr("src");
      if (!src || src.indexOf("data:") === 0) {
        return;
      }

      $img.wrap(
        $("<a>", {
          href: src,
          class: "image-popup image-popup--generated",
          title: $img.attr("alt") || ""
        })
      );
    });

    $(".page__content a[href$='.jpg'], .page__content a[href$='.jpeg'], .page__content a[href$='.png'], .page__content a[href$='.gif'], .page__content a[href$='.webp'], .page__content a[href$='.JPG'], .page__content a[href$='.JPEG'], .page__content a[href$='.PNG'], .page__content a[href$='.GIF'], .page__content a[href$='.WEBP']")
      .has("> img")
      .addClass("image-popup");

    if ($.fn.magnificPopup) {
      $(".page__content .image-popup").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        },
        image: {
          tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.find("img").attr("alt") || item.el.attr("title") || "";
          }
        },
        removalDelay: 500,
        mainClass: "mfp-zoom-in",
        callbacks: {
          beforeOpen: function() {
            this.st.image.markup = this.st.image.markup.replace(
              "mfp-figure",
              "mfp-figure mfp-with-anim"
            );
          }
        },
        closeOnContentClick: true,
        midClick: true
      });
    }
  });
})(jQuery);
