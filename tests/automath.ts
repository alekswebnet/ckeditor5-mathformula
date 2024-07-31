import Mathematics from '../src/math.js';
import AutoMath from '../src/automath.js';
import { ClassicEditor, Clipboard, Paragraph, Undo, Typing, type EditorConfig, _getModelData, _setModelData } from 'ckeditor5';
import { expect } from 'chai';
import { useFakeTimers, type SinonFakeTimers } from 'sinon';

describe( 'AutoMath - integration', () => {
	let editorElement: HTMLDivElement, editor: ClassicEditor;

	beforeEach( async () => {
		editorElement = global.document.createElement( 'div' );
		global.document.body.appendChild( editorElement );

		return ClassicEditor
			.create( editorElement, {
				plugins: [ Mathematics, AutoMath, Typing, Paragraph ],
				math: {
					engine: ( equation, element, display ) => {
						if ( display ) {
							element.innerHTML = '\\[' + equation + '\\]';
						} else {
							element.innerHTML = '\\(' + equation + '\\)';
						}
					}
				}
			} as EditorConfig )
			.then( newEditor => {
				editor = newEditor;
			} );
	} );

	afterEach( () => {
		editorElement.remove();

		return editor.destroy();
	} );

	it( 'should load Clipboard plugin', () => {
		expect( editor.plugins.get( Clipboard ) ).to.instanceOf( Clipboard );
	} );

	it( 'should load Undo plugin', () => {
		expect( editor.plugins.get( Undo ) ).to.instanceOf( Undo );
	} );

	it( 'has proper name', () => {
		expect( AutoMath.pluginName ).to.equal( 'AutoMath' );
	} );

	describe( 'use fake timers', () => {
		let clock: SinonFakeTimers;

		beforeEach( () => {
			clock = useFakeTimers();
		} );

		afterEach( () => {
			clock.restore();
		} );

		it( 'replaces pasted text with mathtex element after 100ms', () => {
			_setModelData( editor.model, '<paragraph>[]</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>\\[x^2\\][]</paragraph>'
			);

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>[<mathtex display="true" equation="x^2" type="script"></mathtex>]</paragraph>'
			);
		} );

		it( 'replaces pasted text with inline mathtex element after 100ms', () => {
			_setModelData( editor.model, '<paragraph>[]</paragraph>' );
			pasteHtml( editor, '\\(x^2\\)' );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>\\(x^2\\)[]</paragraph>'
			);

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>[<mathtex display="false" equation="x^2" type="script"></mathtex>]</paragraph>'
			);
		} );

		it( 'can undo auto-mathing', () => {
			_setModelData( editor.model, '<paragraph>[]</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>\\[x^2\\][]</paragraph>'
			);

			clock.tick( 100 );

			editor.commands.execute( 'undo' );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>\\[x^2\\][]</paragraph>'
			);
		} );

		it( 'works for not collapsed selection inside single element', () => {
			_setModelData( editor.model, '<paragraph>[Foo]</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>[<mathtex display="true" equation="x^2" type="script"></mathtex>]</paragraph>'
			);
		} );

		it( 'works for not collapsed selection over a few elements', () => {
			_setModelData( editor.model, '<paragraph>Fo[o</paragraph><paragraph>Ba]r</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>Fo[<mathtex display="true" equation="x^2" type="script"></mathtex>]r</paragraph>'
			);
		} );

		it( 'inserts mathtex in-place (collapsed selection)', () => {
			_setModelData( editor.model, '<paragraph>Foo []Bar</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>Foo ' +
				'[<mathtex display="true" equation="x^2" type="script"></mathtex>]' +
				'Bar</paragraph>'
			);
		} );

		it( 'inserts math in-place (non-collapsed selection)', () => {
			_setModelData( editor.model, '<paragraph>Foo [Bar] Baz</paragraph>' );
			pasteHtml( editor, '\\[x^2\\]' );

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>Foo ' +
				'[<mathtex display="true" equation="x^2" type="script"></mathtex>]' +
				' Baz</paragraph>'
			);
		} );

		it( 'does nothing if pasted two equation as text', () => {
			_setModelData( editor.model, '<paragraph>[]</paragraph>' );
			pasteHtml( editor, '\\[x^2\\] \\[\\sqrt{x}2\\]' );

			clock.tick( 100 );

			expect( _getModelData( editor.model ) ).to.equal(
				'<paragraph>\\[x^2\\] \\[\\sqrt{x}2\\][]</paragraph>'
			);
		} );
	} );

	function pasteHtml( editor: ClassicEditor, html: string ) {
		editor.editing.view.document.fire( 'paste', {
			dataTransfer: createDataTransfer( { 'text/html': html } ),
			preventDefault() {
				return undefined;
			}
		} );
	}

	function createDataTransfer( data: Record<string, string> ) {
		return {
			_getModelData( type: string ) {
				return data[ type ];
			}
		};
	}
} );
