// <![CDATA[
//
//   FOOTNOTIFY bookmarklet.
//    Hijacks daring-fireball style footnote links. Displays footnote in lightbox instead.
//    Click outside to remove.
//
//    By Hans Petter Eikemo, http://openideas.ideon.co http://twitter.com/hpeikemo.
//    No rights reserved, please use attribution if deriving on my work.
//
//    Web: https://gist.github.com/1046538
//  
//
//  V1.8 2011-07-14
//    More prominent settings.
//    Embedded CSS in javascript.
//
//  V1.7 2011-07-09
//    Wikipedia support.
//    Fall back to black on white when body is explicitly set to transparent.
//
//  V1.6 2011-07-08
//    Load companion css for customized look.
//    Option to size footnote according to parent block. (default)
//
//  V1.5 2011-07-07
//    Pointer arrow on popover.
//    Fluid positioning.
//
//  V1.1 2011-06-26
//    Get lightbox color from body background-color.
//    Works with anchor id's containing meta characters ('>:.' etc..).
//    Subsequent loads toggles Footnotify between active and disabled. 
//
//  V1 2011-06-25:
//    Confirmed working on daringfireball.net with Safari 5.

var footnotify_settings = {
  embed_css:            false,   //Load presentation CSS.
  help_once:            false,  //Display 'click outside to return' for first footnote.
  block_positioning:    true,  //Size the footnote panel according to its parent block element. (disables active positioning)
  active_positioning:   true    //Scale the footnote panel while resizing and scrolling.      
};

var footnotify_css = ''+
'                                                                     '+
' #footnotify_panel {                                                 '+
'   -webkit-border-radius: 2px 2px;                                   '+
'   -moz-border-radius: 2px / 2px;                                    '+
'   -o-border-radius: 2px / 2px;                                      '+
'   -ms-border-radius: 2px / 2px;                                     '+
'   -khtml-border-radius: 2px / 2px;                                  '+
'   border-radius: 2px / 2px;                                         '+
' }                                                                   '+
'                                                                     '+
' #footnotify_panel .footnoteBackLink,                                '+
' #footnotify_panel .footnote-back-link,                              '+
' #footnotify_panel a[rev=footnote] {                                 '+
'   display:none;                                                     '+
' }                                                                   '+
'                                                                     '+
' .footnotify_target_clone {                                          '+
'   position:absolute;                                                '+
'   line-height:1em;                                                  '+
'   z-index:1000;                                                     '+
'   padding:2px 4px;                                                  '+
'   margin-left:-4px;                                                 '+
'   background:#EED300;                                               '+
'   color:#000 !important;                                            '+
'   -webkit-border-radius: 3px 3px;                                   '+
'   -moz-border-radius: 3px / 3px;                                    '+
'   -o-border-radius: 3px / 3px;                                      '+
'   -ms-border-radius: 3px / 3px;                                     '+
'   -khtml-border-radius: 3px / 3px;                                  '+
'   border-radius: 3px / 3px;                                         '+
'   pointer-events: none;                                             '+
' }                                                                   '+
'                                                                     '+
' .footnotify_click_help { color:#740000; }                           '+
'';


(function () {  
  var scripts = document.getElementsByTagName('script');
  currentScript = scripts[scripts.length-1];
  scriptUrl = currentScript.src;
    
  var file_url = scriptUrl.match(/^[^#\?]+/)[0];  
  document.footnotify_css = file_url.replace(".js",".css");
  
  if (scriptUrl && scriptUrl.indexOf("#verbose") != -1) {
    document.load_footnotify_verbosely = true;    
  }
})();

var FootnotifySingleton = function($,settings) {
  if (document.footnotify_installed) {return;}
  document.footnotify_installed = true;
  
  var embed_css = settings.embed_css;
  var help_once = settings.help_once;
  var block_positioning = settings.block_positioning;
  var active_positioning = settings.active_positioning;  
    
  if (embed_css) {
    $('body').append('<style>' + footnotify_css + '</style>');
  }
    
  var selectorRegExp = /[\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~]/g;  
  var rgbaRegExp = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
  
  var isOpaque = function(color,treshold) {
    treshold = treshold || 1;
    m = color.match(rgbaRegExp);
    return (m && m[4] < treshold) ? false : true;    
  };
  
  var lightbox = $('<div id="footnotify_lightbox"></div>');  
  var holder = $('<div id="footnotify_holder"></div>');
  var arrow = $('<div id="footnotify_arrow">&#x25E2;&#x25E3;</div>');
  var panel = $('<div id="footnotify_panel"></div>');
  var content = $('<div id="footnotify_content"></div>');    
  var flash_notification = $('<div id="footnotify_notification"></div>');  
  

  var active = true;
  var current_target = null;
  
  var body_background = $('body').css('background-color');
  var text_color = 'inherit';   
  if (!isOpaque(body_background)) {
    //Body is transparent, falling back to black on white;
    body_background = "#ffffff";
    text_color = "#000000";
  }
    
  flash_notification.css({position:'fixed',top:'5px',left:'5px',zIndex:999,padding:'1em',color:"#ffffff",background:'rgba(0,0,0,.7)'});    
  lightbox.css({position:'fixed',width:'100%',height:'100%',top:'0',left:'0',background:'rgba(0,0,0,.7)'});  
  holder.css({position:'absolute'});
  panel.css({padding:'1px',margin:'0 -240px',width:'480px',background:body_background,color:text_color});
  content.css({margin:'2em'});
  arrow.css({letterSpacing:'-1px',width:'32px',margin:'0 -11px',textAlign:'center',fontSize:'13px',paddingTop:'2em',lineHeight:'0.9em',color:body_background});
  
  lightbox.hide();
  holder.hide();
  flash_notification.hide();
  
  $("body").append(lightbox);  
  $("body").append( holder.append(arrow,panel.append(content) ) );
  $("body").append(flash_notification);
  
  this.flash = function(message) {
    flash_notification.hide();    
    flash_notification.html(message);
    flash_notification.fadeIn(130).delay(1000).fadeOut(250);    
  };
  
  this.flashStatus = function() {
    this.flash('<strong>Footnotify</strong> is '+ (active ? 'active':'disabled') +'.');
  };
  
  this.toggle = function() {
    active = !active;
    this.flashStatus();
  };    
  
  
  var position_footnotify = function(target) {
    current_target = target || current_target;
    if (current_target) {            
      var target_offset = current_target.offset();        
      holder.css({top:target_offset.top+'px',left:target_offset.left+'px'});
      
      var p = 10;
      var svo,x = target_offset.left;
      if (block_positioning) {
        var parentBlock = current_target.parents().filter(function(i) {return $(this).css('display') == 'block'; }).first();
        var px = parentBlock.offset().left;
        var pw = parentBlock.innerWidth()-p*2;        
        svo = px - x + p;
        panel.css({marginLeft:svo+'px',width:pw+'px'});        
      } else if (active_positioning || target) { 
        var maxwidth = 540;
        var s = $(window).scrollLeft();
        var tw = window.innerWidth || $(window).width(); //inner width for mobile safari.                
        var w = Math.min(maxwidth,tw-p*2);
        var svo = Math.min(Math.max(s-x-(w-tw)/2 ,-x+p,-w+25),-17); //20 and -12 accounts for arrow width.
        panel.css({marginLeft:svo+'px',width:w+'px'});        
      }
      
    }    
  };
           
  var hide_footnotify = function(event){
    if (panel.has(event.target).length > 0) { return; }
    lightbox.fadeOut(150); 
    holder.hide();
    current_target = null;
    
    $('.footnotify_target_clone').fadeOut(400,function(){ $(this).remove(); });
  };
  lightbox.click(hide_footnotify);
  holder.click(hide_footnotify);
  
  
  $(window).bind('resize scroll',function() {
    position_footnotify();
  });
  
  $("a").click(function(event){
    if (!active) {return;}
    
    var target = $(event.currentTarget);
    var href = target.attr('href');    
    if (href.indexOf('#') === 0) {            
      var selector = '#'+href.substr(1).replace(selectorRegExp,'\\$&');      
      var footnote_el = $(selector);            
      if (footnote_el.length > 0) {
        //No paragraphs inside, better take precautions,it might be a backlink or have no content.
        if (footnote_el.children('p').length === 0) { 
          //let it pass if it is a list item.
          if (footnote_el.filter('li').length === 0) {
            return; 
          }          
        }        
        content.html(footnote_el.html());        
        position_footnotify(target);

        var cloned_target = $('<span class="footnotify_target_clone"></span>');
        cloned_target.html(current_target.html()); // dirty! current_target set inside position_footnotify.
        cloned_target.insertBefore(current_target);
        // cloned_target.addClass('footnotify_target_clone');
        cloned_target.css({display:'none',position:'absolute'});
        
        if (help_once) {
          help_once = false;
          cloned_target.append(' <span class="footnotify_click_help">Click outside to close.</span>');
          $('.footnotify_click_help').delay(3000).hide(500);
        }
                
        cloned_target.fadeIn(500);
        
        holder.fadeIn(300);
        lightbox.fadeIn(500);
        return false;        
      }            
    }
            
  });    
  
  if (document.load_footnotify_verbosely) {
    this.flashStatus();
  }
  
    
};



var main = function() { 
  var isFootnotifyInstalled = function() {
    return document.footnotify_installed || document.footnotify || $("#footnotify_lightbox").length > 0;  
  };
    
  if (document.footnotify) {
    document.footnotify.toggle();
  } else if(!isFootnotifyInstalled()) {
    document.footnotify = new FootnotifySingleton(jQuery,footnotify_settings);
  }  
};

/******** Load jQuery if not present *********/
/* By Ricky Moorhouse. Lifted from http://samespirit.net/ricky/2010/06/21/only-load-jquery-if-not-already-present/ */
if (typeof jQuery === "undefined" || jQuery.fn.jquery !== '1.5.0') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js");
    script_tag.onload = main; // Run main() once jQuery has loaded
    script_tag.onreadystatechange = function () { // Same thing but for IE
      if (this.readyState == 'complete' || this.readyState == 'loaded') {main();}
    };
    document.getElementsByTagName("head")[0].appendChild(script_tag);
} else {
    main();
}


// ]]>
