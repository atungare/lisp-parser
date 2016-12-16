export function tokenize (expression) {
  return expression
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .trim()
    .split(/\s+/);
}

function readToken (token) {
  if (token === '(') {
    return {
      type: 'OPEN_PARENS'
    };
  } else if (token === ')') {
    return {
      type: 'CLOSED_PARENS'
    };
  } else if (token.match(/^\d+$/)) {
    return {
      type: 'INTEGER',
      value: parseInt(token)
    };
  } else {
    return {
      type: 'SYMBOL',
      value: token
    };
  }
}

export function buildAST (tokens) {
  return tokens.reduce((ast, t) => {
    const token = readToken(t);

    if (token.type === 'OPEN_PARENS') {
      ast.push([]);
    } else if (token.type === 'CLOSED_PARENS') {
      const current_sexp = ast.pop();
      ast[ast.length - 1].push(current_sexp);
    } else {
      const current_sexp = ast.pop();
      current_sexp.push(token.value);
      ast.push(current_sexp);
    }

    return ast;
  }, [[]])[0][0];
}


export function parse (expression) {
  const tokens = tokenize(expression);
  return buildAST(tokens);
}


export function evaluate (ast) {
  // TODO
}
