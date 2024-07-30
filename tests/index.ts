import { expect } from 'chai';
import { Formula as FormulaDll, icons } from '../src/index.js';
import Formula from '../src/formula.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Formula DLL', () => {
	it( 'exports Formula', () => {
		expect( FormulaDll ).to.equal( Formula );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
