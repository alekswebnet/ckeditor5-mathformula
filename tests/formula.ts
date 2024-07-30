import { expect } from 'chai';
import { ClassicEditor, Essentials, Paragraph, Heading } from 'ckeditor5';
import Formula from '../src/formula.js';

describe( 'Formula', () => {
	it( 'should be named', () => {
		expect( Formula.pluginName ).to.equal( 'Formula' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Formula
				],
				toolbar: [
					'formulaButton'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Formula', () => {
			const myPlugin = editor.plugins.get( 'Formula' );

			expect( myPlugin ).to.be.an.instanceof( Formula );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'formulaButton' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'formulaButton' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() ).to.equal( '<p>Hello CKEditor 5!</p>' );
		} );
	} );
} );
