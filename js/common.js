'use strict'

const scrollTo = {
   init: function() {
      $('a.scroll-to').on('click', function(e){
         e.preventDefault();
         var anchor = $(this).attr('href');
         $('html, body').stop().animate({
               scrollTop: $(anchor).offset().top - 60
         }, 800);
      });
   }
}

const maskPhone = {
   init: function() {
      $('.js-phone').mask('+7 (999) 999-99-99');
   }
}

const btn = {
   btn: '.btn-basket',
   init: function() {
      var t = this;
      $(t.btn).on('click', function(){
         $(this).addClass('_active');
         setTimeout(function(){
            $(t.btn).removeClass('_active');
         }, 1300)

      })
   }
}

const vall = {
   init:function(){
      $('.js-vall').on('blur', function(){
         if($(this).val()) {
            $(this).removeClass('form-error').addClass('form-success');
         } else {
            $(this).removeClass('form-success').addClass('form-error');
            $(this).val('').attr('placeholder', 'Заполните поле');
         }
      });
   }
}

const regMail = {
   init: function(){
      $('.js-email').on('blur', function(){
         if($(this).val() && $(this).val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)>-1) {
            $(this).removeClass('form-error').addClass('form-success');
         } else {
            $(this).removeClass('form-success').addClass('form-error');
            $(this).val('').attr('placeholder', 'Введите корректный e-mail');
         }
      });
   }
}

const regNum = {
   init:function(){
      $('.js-num').on('blur', function(){
         if($(this).val() && $(this).val().search(/^(\d){1,13}$/)>-1) {
            $(this).removeClass('form-error').addClass('form-success');
         } else {
            $(this).removeClass('form-success').addClass('form-error');
            $(this).val('').attr('placeholder', 'Только цыфры');
         }
      })
   }
}

const regPhone = {
   init: function(){
      $('.js-phone').on('blur', function(){
         if($(this).val() && $(this).val().search(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)>-1) {
            $(this).removeClass('form-error').addClass('form-success');
         } else {
            $(this).removeClass('form-success').addClass('form-error');
            $(this).val('').attr('placeholder', 'Заполните поле');
         }
      });
   }
}


var fieldSelect = {
   field: '.js-select-field',
   caption: '.js-select-caption',
   option: '.js-select-option',
   init: function init() {
     var t = this;
     $(t.caption).on('click', function () {
       t.toggleOptions(this);
     });
     $(t.option).on('click', function () {
       t.selectOption(this);
     });
     $('body').on('click', function (event) {
       if (!event.target.closest(t.field)) t.hideAllOptions();
     });
   },
   toggleOptions: function toggleOptions(obj) {
     var t = this,
         p = $(obj).closest(t.field);
     $(t.field).not(p).removeClass('is-open');
     p.toggleClass('is-open');
   },
   hideAllOptions: function hideAllOptions() {
     var t = this;
     $(t.field).removeClass('is-open');
   },
   
   selectOption: function selectOption(obj) {
     var t = this,
         p = $(obj).closest(t.field);
     t.hideAllOptions();
     p.find(t.caption).html($(obj).html());
     p.find(t.value).val($(obj).data('val'));
 
     if ($(obj).hasClass(t.subm)) {
       p.find('form').submit();
     }
 
     if ($(p).hasClass(t.nav)) {
       $(t.navItem).removeClass('is-active');
       $(t.navItem + '[data-id="' + $(obj).data('val') + '"]').addClass('is-active');
     }
   }
 };

function initSlider() {
   $('.slider').slick({
      arrows: true,
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 1000,
      infinity: true,
      responsive: [
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            }
         }
      ]
   })
}
initSlider();


$('.js-tab-trigger').click(function() {
   var id = $(this).attr('data-tab'),
      content = $('.js-tab-content[data-tab="'+ id +'"]');
   
   $('.js-tab-trigger._active').removeClass('_active');
   $(this).addClass('_active');
   
   $('.js-tab-content._active').removeClass('_active');
   content.addClass('_active');
   $('.slider').slick('unslick');
   initSlider();
 
});


$(function() {
   scrollTo.init();
   maskPhone.init();
   btn.init();
   vall.init(); 
   regMail.init(); 
   regPhone.init(); 
   regNum.init();
   fieldSelect.init();
   password.init();
   gTabs.init();
   rangeSlider.init();
});

$('.js-count-plus').on('click', function(){
   var val = parseInt($('.js-counter').val());
   val = val + 1;
   $('.js-counter').val(val + ' м²')
})

$('.js-count-minus').on('click', function(){
   var val = parseInt($('.js-counter').val());
   if(val >= 0) {
      val = val - 1;
      $('.js-counter').val(val + ' м²')
   }
})
$('.js-regard').on('keydown', function(e){
   if(e.keyCode == 13 && $(this).val()) {
      $('.form-regard').append('<span class="regard-span">' + $(this).val() + '<span class="regard-cross"></span></span>');
      $(this).val('');
   }
   $('.regard-cross').on('click',function(){
      $(this).closest('.regard-span').remove();
   })
})


$(document).ready(function() {
   $(form).keydown(function(event){
      if(event.keyCode == 13) {
         event.preventDefault();
         return false;
      }
   });
});

$( function() {
   $(".js-range").slider({
     range: "max",
     min: 10000000,
     max: 40000000,
     step: 10000,
     slide: function(event, ui) {
       $("#js-range-val").val(ui.value);
     }
   });
   $( "#js-range-val").val($(".js-range").slider("value"));
   $('#js-range-val').on('change keyup', function(){
      var val = $(this).val();
      if(val >= 10000000 && val <= 40000000){
         $(".js-range").slider('value', val);
      }
   })
});

function showPassword(){
   const btn = document.querySelector('.form-password__img');
   const input = document.querySelector('.js-password');
   btn.addEventListener('click', ()=> {
      btn.classList.toggle('_active')
      if(input.getAttribute('type') === 'password'){
         input.setAttribute('type', 'text')
      } else {
         input.setAttribute('type', 'password')
      }
   })
}

showPassword();


const inputFile = document.getElementById("fileElem");
const imgBox = document.querySelector(".b-essay-form__foto-block");

imgBox.addEventListener("dragenter", dragenter, false);
imgBox.addEventListener("dragover", dragover, false);
imgBox.addEventListener("drop", drop, false);
function dragenter(e) {
   e.stopPropagation();
   e.preventDefault();
}
   
function dragover(e) {
   e.stopPropagation();
   e.preventDefault();
}
function drop(e) {
   e.stopPropagation();
   e.preventDefault();
   
   var dt = e.dataTransfer;
   var files = dt.files;
   
   handleFiles(files);
}

function handleFiles(files) {
   let timeOut = 0;  
   $('.b-essay-form__foto-block__info').html('');
   for (var i = 0; i < files.length; i++) {
      timeOut = timeOut + 300;
      var file = files[i];
      var filesName = file.name;  
      if (!file.type.startsWith('image/') || file.size > 1048576){ continue } 
      var duration = 2 + 2/100*(file.size/1048576*100);         
      var fileInfoBox = '<div class="form-foto-block__info-item">'+
                        '<div class="form-foto-block__info-name"><span class="form-foto-block__info-cross"></span>'+filesName+'</div>'+
                        '<div class="form-foto-block__info-progressbar"><span style="animation: progressBar '+duration+'s ease-in-out;animation-fill-mode: both;"></span></div>';      
      $('.form-foto-block__info').append(fileInfoBox);      
   }
};

$('.form-foto-block__info').on('click', '.form-foto-block__info-cross', function() {
   $(this).closest('.form-foto-block__info-item').remove();
})


removeFile.addEventListener('click', function() {
   inputFile.value = '';
   preview.innerHTML = '';
   preview.classList.remove('is-foto');
   controls.classList.remove('show');
});

refresFile.addEventListener('click', function() {
   if(inputFile) inputFile.click();
});

