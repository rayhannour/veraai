// Browser stub for Node's 'path' module
// Prevents crashes when libraries call path.parse(), path.join(), etc. in client bundles

const noop = (..._args: any[]) => '';
const noopObj = (..._args: any[]) => ({} as any);

const pathStub = {
  parse: noopObj,
  format: noop,
  join: noop,
  resolve: noop,
  dirname: noop,
  basename: noop,
  extname: noop,
  normalize: noop,
  isAbsolute: () => false,
  relative: noop,
  sep: '/',
  delimiter: ':',
  posix: null as any,
  win32: null as any,
};

export default pathStub;
export const { parse, format, join, resolve, dirname, basename, extname, normalize, relative, sep, delimiter } = pathStub;
export const isAbsolute = () => false;
