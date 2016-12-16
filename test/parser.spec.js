import { assert } from 'chai';

import { tokenize, buildAST, parse, evaluate } from '../parser';

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
  });
  it('should work recursively', () => {
    assert.deepEqual(buildAST(['(', '1', '(', '2', '3', ')', ')']), [1, [2, 3]]);
  });
});

describe('parse', () => {
  it('should convert an expression string into an abstract syntax tree', () => {
    assert.deepEqual(parse('(1 2 3)'), [1, 2, 3]);
    assert.deepEqual(parse('(+ 2 3)'), ['+', 2, 3]);
  });
  it('should work recursively', () => {
    assert.deepEqual(parse('(+ (+ 1 1) 3)'), ['+', ['+', 1, 1], 3]);
  });
});


describe('evaluate', () => {
  it('should evaluate the abstract syntax tree of an expression into a value', () => {
    assert.equal(evaluate(['+', 2, 3]), 5);
  });
  it('should work recursively', () => {
    assert.equal(evaluate(['+', 2, ['+', 1, 2]]), 5);
  });
});
