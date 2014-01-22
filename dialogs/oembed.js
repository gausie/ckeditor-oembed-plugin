CKEDITOR.dialog.add( 'oembed', function( editor ) {

	'use strict';

	var lang = editor.lang.oembed;

	return {
		title: lang.title,
		minHeight: 1,
		contents: [
			{
				id: 'info',
				elements: [
					{
						id: 'url',
						type: 'text',
						label: lang.dialogInput,

						setup: function( widget ) {
							this.setValue( widget.data.url );
						},

						commit: function( widget ) {
							widget.setData( 'url', this.getValue() );
						}
					}
				]
			}
		]
	};
} );
