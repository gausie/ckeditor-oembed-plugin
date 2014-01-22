( function() {

	'use strict';

	CKEDITOR.plugins.add( 'oembed', {

		lang: 'en,en-gb',
		requires: 'widget,dialog',
		icons: 'oembed',
		hidpi: true,

		onLoad: function() {
			CKEDITOR.addCss('.oembed { background: rgb(225, 225, 225); border: 1px solid rgb(182, 182, 182); height: 100px; text-align: center; line-height: 100px; overflow: hidden; whitespace: nowrap; }');
		},

		init: function( editor ) {

			var cls = editor.config.oembedClass || 'oembed';

			console.dir(editor.lang);

			editor.widgets.add( 'oembed', {
				inline: false,
				dialog: 'oembed',
				button: editor.lang.oembed.button,
				mask: true, // prevent clickable
				allowedContent: 'p(!' + cls + ')',
				pathName: editor.lang.oembed.pathName,

				template: '<p class="' + cls + '" data-cke-survive=1></p>',

				parts: {
					div: 'p'
				},

				defaults: {
					url: ''
				},

				data: function() {
					this.element.$.innerHTML = editor.lang.oembed.widgetPrefix + this.data.url;
				},

				upcast: function( el, data ) {
					
					if ( !( el.name == 'p' && el.hasClass( cls ) ) )
						return;

					if ( el.children.length > 1 )
						return;

					data.url = el.children[0].value.replace(/\[embed\]([^\[]+)\[\/embed\]/i, '$1');
					el.children[0].value = data.url;

					// Add attribute to prevent deleting empty span in data processing.
					el.attributes[ 'data-cke-survive' ] = 1;

					return el;
				},

				downcast: function( el ) {

					el.children[0].value = "[embed]"+this.data.url+"[/embed]";

					return el;
				}
			} );

			// Add dialog.
			CKEDITOR.dialog.add( 'oembed', this.path + 'dialogs/oembed.js' );

		}
	} );

} )();
