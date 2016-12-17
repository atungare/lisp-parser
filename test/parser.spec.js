import { assert } from 'chai';

import { tokenize, buildAST, parse, evaluate } from '../parser';

describe('tokenize', () => {
  it('should digest an expression string into a list of tokens', () => {
    assert.deepEqual(tokenize('(1 2 3)'),
      [ { type: 'OPENING_PARENS' },
        { type: 'INTEGER', value: 1 },
        { type: 'INTEGER', value: 2 },
        { type: 'INTEGER', value: 3 },
        { type: 'CLOSING_PARENS' } ]);
    assert.deepEqual(tokenize('(ay bee cee)'),
      [ { type: 'OPENING_PARENS' },
        { type: 'SYMBOL', value: 'ay' },
        { type: 'SYMBOL', value: 'bee' },
        { type: 'SYMBOL', value: 'cee' },
        { type: 'CLOSING_PARENS' } ]);
    assert.deepEqual(tokenize('(1 (2 3))'),
      [ { type: 'OPENING_PARENS' },
        { type: 'INTEGER', value: 1 },
        { type: 'OPENING_PARENS' },
        { type: 'INTEGER', value: 2 },
        { type: 'INTEGER', value: 3 },
        { type: 'CLOSING_PARENS' },
        { type: 'CLOSING_PARENS' } ]);
  });
});

describe('buildAST', () => {
  it('should convert a list of tokens into an abstract syntax tree', () => {
    assert.deepEqual(buildAST(tokenize('(1 2 3)')),
      [ { type: 'INTEGER', value: 1 },
        { type: 'INTEGER', value: 2 },
        { type: 'INTEGER', value: 3 }
      ]);
    assert.deepEqual(buildAST(tokenize('(ay bee cee)')),
      [ { type: 'SYMBOL', value: 'ay' },
        { type: 'SYMBOL', value: 'bee' },
        { type: 'SYMBOL', value: 'cee' }
      ]);
    assert.deepEqual(buildAST(tokenize('(+ 22 3)')),
      [ { type: 'SYMBOL', value: '+' },
        { type: 'INTEGER', value: 22},
        { type: 'INTEGER', value: 3 }
      ]);
  });
  it('should work recursively on nested expressions', () => {
    assert.deepEqual(buildAST(tokenize('(1 (2 3))')),
      [ { type: 'INTEGER', value: 1 },
        [ { type: 'INTEGER', value: 2 },
          { type: 'INTEGER', value: 3 }
        ]
      ]);
  });
});

describe('parse', () => {
  it('should convert an expression string into an abstract syntax tree', () => {
    assert.deepEqual(parse('(1 2 3)'),
      [ { type: 'INTEGER', value: 1 },
        { type: 'INTEGER', value: 2 },
        { type: 'INTEGER', value: 3 }
      ]);
    assert.deepEqual(parse('(+ 2 3)'),
      [ { type: 'SYMBOL', value: '+' },
        { type: 'INTEGER', value: 2 },
        { type: 'INTEGER', value: 3 }
      ]);
  });
  it('should work recursively on nested expressions', () => {
    assert.deepEqual(parse('(+ (+ 1 1) 3)'),
      [ { type: 'SYMBOL', value: '+' },
        [ { type: 'SYMBOL', value: '+' },
          { type: 'INTEGER', value: 1 },
          { type: 'INTEGER', value: 1 }
        ],
        { type: 'INTEGER', value: 3 }
      ]);
  });
});

describe('evaluate', () => {
  it('should evaluate the abstract syntax tree of an expression into a value', () => {
    assert.equal(evaluate(parse('(+ 2 3)')), 5);
  });
  it('should work recursively on nested expressions', () => {
    assert.equal(evaluate(parse('(+ 1 (+ 2 2))')), 5);
  });
});
