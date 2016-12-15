export function tokenize (expression) {
  return expression
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .trim()
    .split(/\s+/);
}

export function buildAST (tokens) {
  return tokens.reduce((ast, token) => {

  }, []);
}

export default function parse (expression) {
  const tokens = tokenize(expression);
  return buildAST(tokens);
}
