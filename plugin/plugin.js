( function() {

  'use strict';

  CKEDITOR.plugins.add( 'oembed', {

    requires: 'widget,dialog',
    icons: 'oembed',
    hidpi: true,

    onLoad: function() {
      CKEDITOR.addCss('.oembed { background: rgb(225, 225, 225); border: 1px solid rgb(182, 182, 182); height: 100px; text-align: center; line-height: 100px; overflow: hidden; whitespace: nowrap; }');
    },

    init: function( editor ) {

      var cls = editor.config.oembedClass || 'oembed';


      editor.ui.addButton('oembed', {
        label : Drupal.t('Embed'),
        command : 'oembed'
      });

      editor.widgets.add( 'oembed', {
        inline: false,
        dialog: 'oembed',
        mask: true, // prevent clickable
        allowedContent: 'p(!' + cls + ')',
        pathName: 'oembed',

        template: '<p class="' + cls + '" data-cke-survive=1></p>',

        parts: {
          div: 'p'
        },

        defaults: {
          url: ''
        },

        data: function() {
          this.element.$.innerHTML = Drupal.t('Embedding media from: ') + this.data.url;
        },

        upcast: function( el, data ) {
          
          if ( !( el.name == 'p' && el.hasClass( cls ) ) ){
              return;
          }

          if ( el.children.length > 1 ){
              return;
          }

          data.url = el.children[0].value.replace(/\[embed\]([^\[]+)\[\/embed\]/i, '$1');
          el.children[0].value = data.url;

          // Add attribute to prevent deleting empty span in data processing.
          el.attributes[ 'data-cke-survive' ] = 1;

          return el;
        },

        downcast: function( el ) {
          
          if( el.children.length > 1 ){
              // Delete spellcheck tags
              el.children.forEach(function(child, index){
                  if(child.attributes !== undefined && child.attributes.hasOwnProperty('data-scaytid')){
                      el.children.splice(index, 1);
                 }
              });
          }

          el.children[0].value = "[embed]"+this.data.url+"[/embed]";

          return el;
        }
      } );

      // Add dialog.
      CKEDITOR.dialog.add( 'oembed', this.path + 'dialogs/oembed.js' );

    }
  } );

} )();
