CKEDITOR.dialog.add( 'oembed', function( editor ) {

	'use strict';

	return {
		title: Drupal.t("Embed media"),
		minHeight: 1,
		contents: [
			{
				id: 'info',
				elements: [
					{
						id: 'url',
						type: 'text',
						label: Drupal.t("Add your media url here"),

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
