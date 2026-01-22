import { fileLog } from "./fileLogger";

const origLog = console.log;
const origWarn = console.warn;
const origError = console.error;

console.log = (...args) => {
  fileLog("[LOG]", ...args);
  origLog(...args);
};

console.warn = (...args) => {
  fileLog("[WARN]", ...args);
  origWarn(...args);
};

console.error = (...args) => {
  fileLog("[ERROR]", ...args);
  origError(...args);
};
