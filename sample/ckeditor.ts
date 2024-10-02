declare global {
	interface Window {
		editor: ClassicEditor;
	}
}

import {
	ClassicEditor,
	Autoformat,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	Table,
	TableToolbar
} from 'ckeditor5';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import { Math, AutoformatMath } from '../dist/index.js';
import '../dist/index.css';
// import { Math, AutoformatMath } from '../src/index.js';

import 'ckeditor5/ckeditor5.css';
import coreTranslationsDe from 'ckeditor5/translations/de.js';

coreTranslationsDe.de.dictionary[ 'Insert math' ] = 'Mathe einfügen';
coreTranslationsDe.de.dictionary[ 'Display mode' ] = 'Anzeigemodus';
coreTranslationsDe.de.dictionary[ 'Equation preview' ] = 'Vorschau der Gleichung';
coreTranslationsDe.de.dictionary[ 'Insert equation in TeX format.' ] = 'Gleichung im TeX-Format einfügen.';

ClassicEditor
	.create( document.getElementById( 'editor' )!, {
		language: {
			// The UI will be German.
			ui: 'de'
		},
		plugins: [
			Math,
			AutoformatMath,
			Essentials,
			Autoformat,
			BlockQuote,
			Bold,
			Heading,
			Image,
			ImageCaption,
			ImageStyle,
			ImageToolbar,
			ImageUpload,
			Indent,
			Italic,
			Link,
			List,
			MediaEmbed,
			Paragraph,
			Table,
			TableToolbar,
			CodeBlock,
			Code,
			Base64UploadAdapter
		],
		toolbar: [
			'undo',
			'redo',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'code',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'uploadImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'codeBlock',
			'math'
		],
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		math: {
			engine: 'mathjax',
			outputType: 'span',
			forceOutputType: false,
			enablePreview: true
		},
		translations: [
			coreTranslationsDe
		]
	} )
	.then( editor => {
		window.editor = editor;
		CKEditorInspector.attach( editor );
	} )
	.catch( err => {
		window.console.error( err.stack );
	} );
