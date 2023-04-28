export const parseTokenPath = (path) => path.reduce((acc, p, idx) => {
  if (idx === 0 && p === 'color') {
    acc.push('ui');
  } else if (p === 'default') {
    return acc;
  } else {
    acc.push(p);
  }

  return acc;
}, []);
