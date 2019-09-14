import debug from 'debug';

const console = {
  log: debug('log'),
  test: debug('test'),
  error: debug('error'),
};

export default console;
