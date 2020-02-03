"use strict";

var err = function(e){
  alert(e);
};
/**
 * @param {string} contentId
 * @param {Array} inlineVars
 */
var parseL = function(contentId, inlineVars){

  var strProto = String.prototype;
  /**
   * returns content of a string between the FIRST @earlyStart and LAST @farEnd
   * @param {string} earlyStart
   * @param {string} farEnd
   * @returns {string}
   */
  strProto.betweenFar = function(earlyStart, farEnd){
    var arr = this.split(earlyStart);
    arr.shift();
    var arr2 = arr.join(earlyStart).split(farEnd);
    arr2.pop();
    return arr2.join(farEnd);
  };
  /**
   * returns content of a string between the FIRST @earlyStart and FIRST @nearEnd
   * @param {string} earlyStart
   * @param {string} nearEnd
   * @returns {string}
   */
  strProto.betweenNear = function(earlyStart, nearEnd){
    var arr = this.split(earlyStart);
    arr.shift();
    return arr.join(earlyStart).split(nearEnd).shift();
  };
  /**
   * returns content of a string between the LAST @lateStart and LAST @farEnd
   * @param {string} lateStart
   * @param {string} farEnd
   * @returns {string}
   */
  strProto.betweenLateFar = function(lateStart, farEnd){
    var arr2 = this.split(lateStart).pop().split(farEnd);
    arr2.pop();
    return arr2.join(farEnd);
  };
  /**
   * @param {string} tag
   * @returns {string}
   */
  strProto.betweenTag = function(tag){
    return this.betweenNear('<' + tag + '>', '</' + tag + '>');
  };
  /**
   * @param {string} what - is it found in a string?
   * @returns {boolean}
   */
  strProto.has = function(what){ return this.indexOf(what) !== -1; };
  /**
   * @param {string} what
   * @param {string} withWhat
   * @returns {string}
   */
  strProto.repl = function(what, withWhat){ return this.split(what).join(withWhat); };


  var cObj = $('#' + contentId);
  var tpl = parseL.tpl;
  var cont = cObj.html();

  var id = 0;

  /**
   * @param {string} tpl
   * @param {string} start
   * @param {string} end
   * @returns {string[]}
   */
  var collectSubTags = function(tpl, start, end){
    var keys = [];
    if(!tpl.has(start)) return [];
    var arr = tpl.split(start);
    arr.forEach(function(sub){
      if(sub.has(end)){
        keys[sub.split(end).shift()] = true;
      }
    });
    var ret = [];
    for(var k in keys)
      ret.push(k);
    return ret;
  };
  var processSubTags = function(tags, tpl, cont){
    tags.forEach(function(tag){
      tpl = tpl.repl('[[' + tag + ']]', cont.betweenTag(tag));
    });
    return tpl;
  };
  /**
   * this one finds all js between {{}} and inserts the result of its execution
   * @param {string} template
   * @returns {string}
   */
  var executeAllJSinTemplate = function(template){
    var exec = function(code){
      var ret = null;
      eval("ret = " + code + ";");
      return ret;
    };
    var keys = [];
    var In = "{{", Out = "}}";
    if(!template.has(In)) return template;
    var arr = template.split(In);
    arr.forEach(function(sub){
      if(sub.has(Out)){
        keys[sub.split(Out).shift()] = true;
      }
    });
    var ret = [];
    for(var insertion in keys) {
      template = template.repl(In + insertion + Out, exec(insertion));
    }
    return template;
  };
  /**
   * @param {string} _tag the tag to process.
   * @returns {boolean}
   */
  var parseOneTag = function(_tag){
    var tg = _tag;
    var tagOpen = '<' + tg + '>';
    var tagClose = '</' + tg + '>';
    if(cont.has(tagOpen) && cont.has(tagClose)){
      var template = tpl.betweenFar('<tp:' + tg + '>', '</tp:' + tg + '>');
      template = executeAllJSinTemplate(template);
      var content = cont.betweenNear(tagOpen, tagClose);
      var subTags = collectSubTags(template, '[[', ']]');
      var insertion =
        subTags.length !== 0
          ? processSubTags(subTags, template, content)
          : template.repl(':::', content);
      if(subTags.length !== 0 && template.has(":::")){
        err("Tag <" + tg + "> has both ::: and sub tags: [[" + subTags.join("]], [[") + "]] - it will be processed incorrectly");
      }
      var ID = "{id}";
      if(cont.has(ID))
        insertion = insertion.repl(ID, '' + (id++));
      cont = cont.repl(tagOpen + content + tagClose, insertion);
      //alert(content);
      return true;
    }
    return false;
  };
  var parseTag = function(tag, func){
    while(parseOneTag(tag)) {
    }
  };
  /**
   * @param {Array<String>} tags
   */
  var parseTags = function(tags){
    tags.filter(function(tag){
      return tag !== '';
    }).forEach(function(tag){
      parseTag(tag);
    })
  };

  parseTags(collectSubTags(tpl, '<tp:', '>'));

  var insertVariables = function(){
    for(var k in inlineVars) {
      cont = cont.repl("::" + k + "::", inlineVars[k]);
    }
  };
  insertVariables();

  cObj.html(cont);
  setTimeout(function(){
    $('#' + contentId + "-wait").hide();
    cObj.show();
  }, 200);

};
var a2c = function(c){
  $('#cont').append(c);
};
/**
 * @param {function} onReady
 */
parseL.ready = function(onReady){
  if(parseL.__ready == null){
    parseL.__ready = [];
    $(document).ready(function(){
      var loadTpl = function(){};
      loadTpl = function(){
        $.ajax('tpl/template.html', {
          success:function(tpl){
            parseL.tpl = tpl;
            parseL.__ready.forEach(function(f){
              f();
            })
          },
          error:function(){
            loadTpl();
          }
        });
      };
      loadTpl();
    });
  }
  parseL.__ready.push(onReady);
};