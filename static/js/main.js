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
//                options[container] = '#pic_page';
                $images.viewer('destroy').viewer(options);

		});
});

//重载
$("p1").click(function(){
//    alert("段落被点击了。");

  var $images = $('.docs-pictures');


        jQuery.get("http://127.0.0.1:8000/reload/",function(data,status){
			alert("状态: " + status);






		});
});


//保存
$("p2").click(function(){
//    alert("段落被点击了。");

  var $images = $('.docs-pictures');

//  var selecter_list = $("#tag_selecter").find(".tag-active") ;
//    var tag_list = new Array();
//  for(var i=0; i<selecter_list.length; i++){
//        selecter = selecter_list[i];
//        tag_list.push(selecter.firstChild.nodeValue);
//  }

    var selecter_list = $("#tag_selecter").find(".tag-active") ;

  var tag_list = new Array();
  for(var i=0; i<selecter_list.length; i++){
        selecter = selecter_list[i];
        var is = new Object();
        is.parent=$(selecter).parent().attr("id");
        is.son=selecter.firstChild.nodeValue;
        is.level=$(selecter).parent().parent().attr("level").length;
        tag_list.push(is);
  }



   jQuery.post("http://127.0.0.1:8000/savetag/",
    JSON.stringify({
        key:$('img.viewer-move').attr("alt"),
        tags:tag_list
    }),
    function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
});


$("p3").click(function(){
//    alert("段落被点击了。");

        var selecter_list = jQuery("#tag_selecter").find(".tag") ;
        for(var i=0; i<selecter_list.length; i++){
                selecter = $(selecter_list[i]);
                if(selecter.hasClass("tag-active")){
                    selecter.removeClass('tag-active')
                }
                if(selecter.hasClass("tag-active")){
                    selecter.removeClass('tag-active')
                }
         }
        var d = $('#tag_selecter').find('.add-list');

        d.remove();



});


$("p4").click(function(){
//    alert("段落被点击了。");

  var $images = $('.docs-pictures');
  var $mb = $(  "#tags" );

        jQuery.post("http://127.0.0.1:8000/getpictag/",
    {
        key:$('img.viewer-move').attr("alt")
    },
    function(data,status){
//        alert("数据: \n" + data + "\n状态: " + status);
        var js = JSON.parse(data);

loadtag(js);

//        var taglist = new Array();
//        for(var i=0; i<js.length; i++){
//                var jsonobj = js[i];
//                taglist.push( jsonobj.tag);
//         }
//
//        var selecter_list = jQuery("#tag_selecter").find(".tag") ;
//        for(var i=0; i<selecter_list.length; i++){
//                selecter = selecter_list[i];
//                if  (taglist.includes(selecter.firstChild.nodeValue)){
//                    $(selecter).addClass('tag-active')
//                    taglist.splice(taglist.indexOf(selecter.firstChild.nodeValue),1);
//                }
//         }
//
//        for(var i=0; i<taglist.length; i++){
//                var tag = taglist[i]
//                var html = '<li class=" label label-default removeable tag tag-active"'+'data-tag-slug="'+toSlug(tag)+'">'+tag+'<a href="#" class="tag-undo" data-tag-slug="'+toSlug(tag)+'">X</a></li>';
//                $(html).prependTo($('#my-second-tags'));
//         }




    });




});

loadtag = function(taglist) {

    if(taglist.length==0){
        return null;
    }

    tag = taglist[0];
     var selecter_list_parent= jQuery("#tag_selecter").find("ul#"+tag.tag_parent)[0];
    var selecter_list = jQuery("#tag_selecter").find("ul#"+tag.tag_parent)[0].children;

    for(var j=0; j<taglist.length; j++){

       tag = taglist[j];
       var text = tag.tag
       changed_flag = false;
            var len = selecter_list.length;
            for(var i=0; i<len; i++){
                selecter = selecter_list[i];




                    if  (tag.tag==selecter.firstChild.nodeValue){
                        $(selecter).addClass('tag-active')
                        changed_flag = true;
//                        taglist.splice(taglist.indexOf(selecter.firstChild.nodeValue),1);
                    }else{
                        if(i==selecter_list.length-1 && !changed_flag){
                            var html = '<li class=" label label-default removeable tag tag-active"'+'data-tag-slug="'+toSlug(text)+'">'+text+'<a href="#" class="tag-undo" data-tag-slug="'+toSlug(text)+'">X</a></li>';
                            $(html).prependTo(selecter_list_parent);
                        }
                    }
            }
            if($(selecter_list).parents('sub_list').attr('level')!==undefined){
                if($(selecter_list).parents('sub_list').attr('level').length<3){
                    var level = $(selecter_list).parents('sub_list').attr('level')+1;
                    var html = '<sub_list id="'+text+level+'" level="'+level+'">'+text+'<ul id="'+text+'"  class="tag-cloud list-inline"></ul></sub_list> ';
                    $(selecter_list).parents('sub_list').after($(html));
                    $('#'+text).taxonomy_jquery();
                }
            }
            loadtag(tag.son)

    }

//                var text = tag.tag
//                if(selecter.parent().attr('level')!==undefined){
//                    if(selecter.parent().attr('level').length<=this.maxlevel){
//                        var level = selecter.parent().attr('level')+1;
//                        var html = '<sub_list class="'+this.addList+'" id="'+text+level+'" level="'+level+'">'+text+'<ul id="'+text+'"  class="tag-cloud list-inline"></ul></sub_list> ';
//                        selecter.parent().after($(html));
//                        $('#'+text).taxonomy_jquery();
//                    }
//                }
//                loadtag(tag.son);




  return null;
};



    toSlug = function(string){
      return encodeURIComponent(string).toLowerCase();
    };




