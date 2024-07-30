import { Math as MathDll, AutoformatMath as AutoformatMathDll } from '../src/index.js';
import Math from '../src/math.js';
import AutoformatMath from '../src/autoformatmath.js';
import { expect } from 'chai';

describe( 'CKEditor5 Math DLL', () => {
	it( 'exports Math', () => {
		expect( MathDll ).to.equal( Math );
	} );

	it( 'exports AutoformatMath', () => {
		expect( AutoformatMathDll ).to.equal( AutoformatMath );
	} );
} );
