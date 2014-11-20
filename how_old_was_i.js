$(function() {
  SNBinder.get_named_sections('templates.html', null, function(templates) {
    var my_age;
    var parent_age;
    var calcAge = function(input, output){
      var birthday = $('.'+input).val();
      var age = moment().diff(birthday, 'years');
      $(output).html(SNBinder.bind(templates.age, {age: age}));
      $.cookie(input, birthday, { expires: 30 });
      return age;
    };
    var calcHowOldWasI = function(){
      var ret = '';
      if (my_age && parent_age) {
        var year = parent_age - my_age;
        ret = SNBinder.bind(templates.how_old_was_i, {
          'my_age': my_age
          ,'how_old_was_i': my_age - year
          ,'year': moment().subtract(year, 'years').format('YYYY')
        });
      }
      $('.js_how_old_was_i').html(ret);
    };
    // 
    $('.js_today').html(SNBinder.bind(templates.today, {
      today: moment().format('YYYY年M月D日')
    }));
    // 私の年齢を計算する
    var calcMyAge = function(){
      my_age = calcAge('jsinput_my_birthday', '.js_my_age');
    };
    $('.jsinput_my_birthday').change(function(){
      calcMyAge();
      calcHowOldWasI();
    });
    // 親の年齢を計算する
    var calcParentAge = function(){
      parent_age = calcAge('jsinput_parent_birthday', '.js_parent_age');
    };
    $('.jsinput_parent_birthday').change(function(){
      calcParentAge();
      calcHowOldWasI();
    });
    // 初期値を設定する
    var age = $.cookie('jsinput_my_birthday');
    if (age) {
      $('.jsinput_my_birthday').val(age).change();
    }
    age = $.cookie('jsinput_parent_birthday');
    if (age) {
      $('.jsinput_parent_birthday').val(age).change();
    }
  });
});
