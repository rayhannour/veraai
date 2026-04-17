// Browser stub for Node's 'fs' module
// Prevents crashes when libraries try to use fs in client bundles

const noop = (..._args: any[]) => undefined;
const noopBool = () => false;

const fsStub = {
  readFileSync: noop,
  writeFileSync: noop,
  existsSync: noopBool,
  mkdirSync: noop,
  readdirSync: () => [] as any[],
  statSync: () => ({} as any),
  createReadStream: noop,
  createWriteStream: noop,
  readFile: noop,
  writeFile: noop,
  exists: noop,
  mkdir: noop,
  promises: {
    readFile: async () => undefined,
    writeFile: async () => undefined,
    mkdir: async () => undefined,
  },
};

export default fsStub;
export const { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, readFile, writeFile, mkdir } = fsStub;
export const promises = fsStub.promises;
