$(function () {
  'use strict';

  var console = window.console || { log: function () {} };
  var $images = $('.docs-pictures');
  var $toggles = $('.docs-toggles');
  var $buttons = $('.docs-buttons');
  var options = {
    // inline: true,
    url: 'data-original',
    ready: function (e) {
      console.log(e.type);
    },
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view: function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    }
  };

  function toggleButtons(mode) {
    if (/modal|inline|none/.test(mode)) {
      $buttons
        .find('button[data-enable]')
          .prop('disabled', true)
        .filter('[data-enable*="' + mode + '"]')
          .prop('disabled', false);
    }
  }

  $images.on({
    ready:  function (e) {
      console.log(e.type);
    },
    show:  function (e) {
      console.log(e.type);
    },
    shown:  function (e) {
      console.log(e.type);
    },
    hide:  function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view:  function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    }
  }).viewer(options);

  toggleButtons(options.inline ? 'inline' : 'modal');

  $toggles.on('change', 'input', function () {
    var $input = $(this);
    var name = $input.attr('name');

    options[name] = name === 'inline' ? $input.data('value') : $input.prop('checked');
    $images.viewer('destroy').viewer(options);
    toggleButtons(options.inline ? 'inline' : 'modal');
  });

  $buttons.on('click', 'button', function () {
    var data = $(this).data();
    var args = data.arguments || [];

    if (data.method) {
      if (data.target) {
        $images.viewer(data.method, $(data.target).val());
      } else {
        $images.viewer(data.method, args[0], args[1]);
      }

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          args[0] = -args[0];
          break;

        case 'destroy':
          toggleButtons('none');
          break;
      }
    }
  });

  $('[data-toggle="tooltip"]').tooltip();












});


$("p").click(function(){
//    alert("段落被点击了。");

  var $images = $('.docs-pictures');


        jQuery.get("http://127.0.0.1:8000/loadpic/",function(data,status){
//			alert(状态: " + status);
$("#gallery").empty();
			var js = JSON.parse(data);
            for(var i=0; i<js.length; i++){
                var jsonobj = js[i]
                var txt1="<li><img data-original=\"";              // 使用 HTML 标签创建文本
                var txt2=jsonobj.path;  // 使用 jQuery 创建文本
                var txt3="\" src=\"";
                var txt4="\" alt=\"";
                var txt5=jsonobj.key;
                var txt6="\"></li>";
//                txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
                final = txt1+txt2+txt3+txt2+txt4+txt5+txt6
                $("#gallery").append(final);        // 追加新元素


            }


                options[name] = name === 'inline';
                $images.viewer('destroy').viewer(options);

		});
//            <li><img data-original="../static/img/9SWr_KTB4xz0R_EBuv2sxU6vICQpflqQvM0QgrzNEII.jpg" src="../static/img/9SWr_KTB4xz0R_EBuv2sxU6vICQpflqQvM0QgrzNEII.jpg" alt="Jokhang Temple"></li>


//        var txt1="<p>文本。</p>";              // 使用 HTML 标签创建文本
//        var txt2=$("<p></p>").text("文本。");  // 使用 jQuery 创建文本
//        var txt3=document.createElement("p");
//        txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
//        $("#gallery").append(txt1,txt2,txt3);        // 追加新元素

});