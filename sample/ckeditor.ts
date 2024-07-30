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

import Math from '../src/math.js';
import AutoMath from '../src/automath.js';

import 'ckeditor5/ckeditor5.css';

ClassicEditor
	.create( document.getElementById( 'editor' )!, {
		plugins: [
			Math,
			AutoMath,
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
			engine: 'mathjax', // or katex or function. E.g. (equation, element, display) => { ... }
			lazyLoad: undefined,
			outputType: 'script', // or span
			className: 'math-tex',
			forceOutputType: false, // forces output to use outputType
			enablePreview: true, // Enable preview view
			previewClassName: [], // Class names to add to previews
			popupClassName: [], // Class names to add to math popup balloon
			katexRenderOptions: {} // KaTeX only options for katex.render(ToString)
		}
	} )
	.then( editor => {
		window.editor = editor;
		CKEditorInspector.attach( editor );
		window.console.log( 'CKEditor 5 is ready.', editor );
	} )
	.catch( err => {
		window.console.error( err.stack );
	} );
