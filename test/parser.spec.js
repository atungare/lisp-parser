import { assert } from 'chai';

import parser, { tokenize, buildAST } from '../parser';

describe('tokenize', () => {
  it('should digest an expression string into a list of tokens', () => {
    assert.deepEqual(tokenize('(1 2 3)'), ['(', '1', '2', '3', ')']);
    assert.deepEqual(tokenize('(ay bee cee)'), ['(', 'ay', 'bee', 'cee', ')']);
    assert.deepEqual(tokenize('(1 (2 3))'), ['(', '1', '(', '2', '3', ')', ')']);
  });
});

describe('buildAST', () => {
  it('should convert a list of tokens into an abstract syntax tree', () => {
    assert.deepEqual(buildAST(['(', '1', '2', '3', ')']), [1, 2, 3]);
    assert.deepEqual(buildAST(['(', 'ay', 'bee', 'cee', ')']), ['ay', 'bee', 'cee']);
    assert.deepEqual(buildAST(['(', '1', '(', '2', '3', ')', ')']), [1, [2, 3]]);
  });
});