/**
 * Binding ajax behavior to form submission.
 * User: Spiros Kabasaskalis,kabasakalis@gmail.com,
 *http://.reverbnation/spiroskabasakalis
 * http://iws/kabasakalis.gr
 * Licensed under the MIT licenses:
  * http://www.opensource.org/licenses/mit-license.php
 * Date: February 2nd,2013
 * Time: 1:57 AM
 * This js file is binding ajax behavior to  the form submission  using the jquery form plugin.(http://jquery.malsup.com/form/#getting-started)
 * With this plugin it is possible to include file fields in the form-they will be submitted without a page refresh,
 * though this is technically not ajax,(since this is not possible with xhr object).The plugin uses a technique involving an iframe.
 * If you intend to include a  file field in your form,read more in the link below.
 * http://jquery.malsup.com/form/#file-upload
 *
 * Modified by Chris Backhouse
 * Use class 'ajax-form' rather than id
 * */

$(function () {

    //this function hijacks regular form submission and turns it into ajax submission with jquery form plugin.
    $.js_crud_afterValidate = function(form, data, hasError) {
        if (!hasError) {
            $.submit_crud_ajax ();
            return false;
        } //if has not error submit via ajax
        else {
            return false;
        }
    };

    // post-submit callback.
    function show_crud_Response (responseText, statusText, xhr, $form) {
      //  console.log(responseText);
        if (responseText.success == true) {
            $("#success-note")
                //.fadeOut(1000, "linear", function() {
                //    $(this)
                        .fadeIn(2000, "linear");
                //}
            //);
             var ID=responseText.id;
             //$("#ajax-form  > form").slideToggle(500, function() {
            //$.fancybox.update();
		//});
        }
        else {
            $("#error-note")
                .hide()
                .show()
                .css({"opacity": 1 })
        }
    } ;


    var spinnneropts = {
           lines:13, // The number of lines to draw
           length:7, // The length of each line
           width:4, // The line thickness
           radius:20, // The radius of the inner circle
           corners:1, // Corner roundness (0..1)
           rotate:0, // The rotation offset
           color:'#000', // #rgb or #rrggbb
           speed:1, // Rounds per second
           trail:60, // Afterglow percentage
           shadow:false, // Whether to render a shadow
           hwaccel:false, // Whether to use hardware acceleration
           className:'spinner', // The CSS class to assign to the spinner
           zIndex:2e9, // The z-index (defaults to 2000000000)
           top:'auto', // Top position relative to parent in px
           left:'auto' // Left position relative to parent in px
       };
       var spinnertarget = document.getElementById(AjaxCrudBehavior.modelClassName+"-grid");
       var spinner = new Spinner(spinnneropts)

  //options for the ajax form submission
    var options  = {
        success:       show_crud_Response ,  // post-submit callback
      dataType:  'json'   ,     // 'xml', 'script', or 'json' (expected server response type)
    //   iframe:true, //please read jquery form plugin documentation for this option.
        // $.ajax options can be used here too.
        beforeSend : function() {
            spinner.spin(spinnertarget);
        },
        complete : function() {
            spinner.stop();
        }
    };

    $.submit_crud_ajax  = function() {
        $('.ajax-form > form').ajaxSubmit(options )
    };
});
