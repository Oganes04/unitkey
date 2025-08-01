//========================== СТИЛИЗАЦИЯ CHECKBOX ========================

$(".check-label").on("click", function () {
    let isChecked = $(this).find("input").prop("checked");
    if (isChecked) {
        $(this).find(".fakecheck").addClass("checked");
    } else {
        $(this).find(".fakecheck").removeClass("checked");
    }
});

//=================== Маска номера телефона ============

//  $('input[type="tel"]').inputmask({
//   "mask": "+7 (999) 999 - 99 - 99",
//   "placeholder": "+7 (   )     -    -   ",
//   "showMaskOnHover": false,
//   "showMaskOnFocus": true
// });


//========================== ФУНКЦИЛГАЛ FAQ ========================

$(".faq__item").on("click", function () {
    const $content = $(this).find('.faq__item-answer');
    const $header = $(this).find('.faq__item-question');
    
    if ($header.hasClass('open')) {
        $content.slideUp();
        $header.removeClass('open');
    } else {
        $(".faq__item").find('.faq__item-answer').slideUp();
        $(".faq__item").find('.faq__item-question').removeClass('open');

        $content.slideDown();
        $header.addClass('open');
    }
});


//========================== Функционал бургер меню ====================

$("#burger_menu").click(function() {
  $(this).toggleClass('open');
  $(".header__adaptive").toggleClass("open");
  $(".header__adaptive").slideToggle(300);
  $('html').toggleClass('hidden');
});

$(document).on('click', '.header__adaptive nav ul li', function(e) {
  $("#burger_menu").removeClass('open');
  $(".header__adaptive").slideToggle(300);
  $('html').removeClass('hidden');
});


//=================== Слайдр галереи ============

const productSlider = new Swiper('.product-silder', {
    
    speed: 600,
    pagination: {
        el: ".product-silder-scrollbar",
        clickable: true,
    },
});

function sliderMouseSlideInit() {
    document.addEventListener("mousemove", function (e) {
        const targetElement = e.target;
        if (targetElement.closest("[data-mousemove-swipe]")) {
            const sliderElement = targetElement.closest(
                "[data-mousemove-swipe]"
            );
            const sliderItem =
                sliderElement.swiper.slides[getIndex(sliderElement)];
            const sliderLength = sliderElement.swiper.slides.length;

            if (sliderLength > 1) {
                const sliderWidth = sliderItem.offsetWidth;
                const sliderPath = Math.round(sliderWidth / sliderLength);
                const sliderMousePos =
                    e.clientX - $(sliderElement).offset().left;
                const sliderSlide = Math.floor(sliderMousePos / sliderPath);
                sliderElement.swiper.slideTo(sliderSlide);
            }
        }
    });


    // Добавляем событие для отслеживания ухода мыши с элемента слайдера
    document.querySelectorAll('[data-mousemove-swipe]').forEach(function(sliderElement) {
        sliderElement.addEventListener("mouseleave", function() {
            sliderElement.swiper.slideTo(0); // Возвращаем на первый слайд
        });
    });

    function getIndex(el) {
        return Array.from(el.parentNode.children).indexOf(el);
    }
}
  
if (document.querySelector('[data-mousemove-swipe]')) {
    sliderMouseSlideInit();
}

