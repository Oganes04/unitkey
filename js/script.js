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
//   $(".header__adaptive").slideToggle(300);
  $('html').toggleClass('hidden');
});

$(document).on('click', '.header__adaptive nav ul li', function(e) {
  $("#burger_menu").removeClass('open');
//   $(".header__adaptive").slideToggle(300);
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



$(document).ready(function () {
    $('.slider-wrapper').each(function () {
        const $wrapper = $(this);
        const $input = $wrapper.find('.investment-input');
        const $slider = $wrapper.find('.slider-input');
        const $progress = $wrapper.find('.slider-progress');
        const $thumb = $wrapper.find('.slider-thumb');

        const min = parseInt($wrapper.data('min')) || 0;
        const max = parseInt($wrapper.data('max')) || 100;
        const step = parseInt($wrapper.data('step')) || 1;
        const defaultValue = parseInt($wrapper.data('default')) || min;

        // Init
        $slider.attr({ min, max, step, value: defaultValue });
        $input.val(formatNumber(defaultValue));
        updatePosition(defaultValue);

        // Events
        $slider.on('input', function () {
            const val = parseInt(this.value);
            $input.val(formatNumber(val));
            updatePosition(val);
            // triggerChange(val);
        });

        $input.on('input', function () {
            const val = parseFormatted($(this).val());
            if (!isNaN(val) && val >= min && val <= max) {
                $slider.val(val);
                updatePosition(val);
                triggerChange(val);
            }
        });

        $input.on('blur', function () {
            let val = parseFormatted($(this).val());
            val = Math.min(Math.max(val, min), max);
            const steppedVal = Math.round(val / step) * step;
            $slider.val(steppedVal);
            $input.val(formatNumber(steppedVal));
            updatePosition(steppedVal);
            triggerChange(steppedVal);
        });

        $slider.on('mouseenter', () => {
            $thumb.css({
                transform: 'translateY(-50%) translateX(-50%) scale(1.1)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            });
        });

        $slider.on('mouseleave', () => {
            $thumb.css({
                transform: 'translateY(-50%) translateX(-50%)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            });
        });

        function updatePosition(val) {
            const percent = ((val - min) / (max - min)) * 100;
            $progress.css('width', percent + '%');
            $thumb.css('left', percent + '%');
        }

        function triggerChange(val) {
            console.log('Значение изменено:', formatNumber(val));
            // Здесь можно вызывать другие функции, например:
            // $wrapper.trigger('valueChange', [val]);
        }

        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        function parseFormatted(str) {
            return parseInt(str.toString().replace(/\s/g, ''), 10) || 0;
        }
    });
});




$(document).ready(function () {
    function parseNumber(str) {
        return parseFloat(str.toString().replace(/\s|₽|%/g, '').replace(',', '.')) || 0;
    }

    function formatNumber(num, decimals = 0) {
        return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function calculateOutputs() {
        const price = parseNumber($('[name="investmentSumm"]').val());
        const scenario = $('.input-select .investment-input').val().trim().toLowerCase();
        const investmentYears = parseNumber($('[name="investmentDate"]').val());

        if (price <= 0 || investmentYears <= 0 || !(scenario === 'аренда' || scenario === 'перепродажа')) return;

        const currentYear = new Date().getFullYear();
        const completionYear = currentYear + investmentYears;
        const yearsToCompletion = completionYear - currentYear;

        const coef = investmentYears;
        const maxCoef = 10;

        const maxAnnualYieldSale = 28;
        const expoSale = 1.2;
        const baseYieldIfDelivered = 6;

        const maxAnnualYieldRent = 12;
        const expoRent = 0.4;

        let forecast, roi, payback;

        if (scenario === 'перепродажа') {
            let annualYieldSale, growthFactor, growthPercent, finalPrice;

            if (yearsToCompletion <= 0) {
                annualYieldSale = baseYieldIfDelivered;
                growthFactor = Math.pow(1 + annualYieldSale / 100, 1);
                growthPercent = (growthFactor - 1) * 100;
                finalPrice = price * growthFactor;
            } else {
                annualYieldSale = maxAnnualYieldSale * Math.pow(coef / maxCoef, expoSale);
                growthFactor = Math.pow(1 + annualYieldSale / 100, yearsToCompletion);
                growthPercent = (growthFactor - 1) * 100;
                finalPrice = price * growthFactor;
            }

            forecast = finalPrice - price;
            roi = growthPercent;
            payback = yearsToCompletion;

        } else if (scenario === 'аренда') {
            const priceFactor = Math.pow(20000000 / price, 0.2);
            const annualYieldRent = maxAnnualYieldRent * Math.pow(coef / maxCoef, expoRent) * priceFactor;
            const annualIncome = price * annualYieldRent / 100;
            const monthlyIncome = annualIncome / 12;
            const paybackYears = price / annualIncome;

            forecast = annualIncome * investmentYears;
            roi = (forecast / price) * 100;
            payback = paybackYears;
        }

        $('[name="investmentForecast"]').val(`${formatNumber(forecast)} ₽ | ${formatNumber(roi, 1)}%`);
        $('[name="investmentROI"]').val(`${formatNumber(roi, 1)}%`);
        $('[name="investmentPayback"]').val(`${formatNumber(payback, 1)}`);
    }

    // Обработка текстовых полей
    $(document).on('input change', '[name="investmentSumm"], [name="investmentDate"]', calculateOutputs);

    // Обработка range-слайдеров, если они существуют
    $(document).on('input change', 'input[type="range"]', function () {
        // Обновляем связанное текстовое поле, если нужно
        const name = $(this).attr('name');
        $(`[name="${name}"]`).val($(this).val());
        calculateOutputs();
    });

    // Клик по селекту
    $('.input-select-btn').on('click', function () {
        const $items = $(this).closest('.input-select').find('.input-select-items');
        $items.toggleClass('opened');
    });

    // Выбор значения из селекта
    $('.input-select-items li').on('click', function () {
        const value = $(this).text();
        $(this).closest('.input-select').find('.investment-input').val(value);
        $('.input-select-items').removeClass('opened');
        calculateOutputs();
    });
});




$(document).on('click', '.input-select-items li', function(e) {
    const value = $(this).text();

    $(this).closest('label').find('input').val(value);
    $(this).closest('label').find('.input-select-items ul').slideUp();
});

$(document).on('click', '.input-select-btn', function(e) {
    $(this).closest('label').find('.input-select-items ul').slideToggle();
});




$(".catalog__selectors button").on("click", function () {
    $(".catalog__selectors button").removeClass('active');

    $(this).addClass('active');
});



