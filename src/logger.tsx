import type { NeuroIDLogClass } from './types';

var showlogs = true;
export const NeuroIDLog: NeuroIDLogClass = {
  enableLogging: function enableLogging(value?: boolean) {
    showlogs = value === false ? false : true;
  },
  log: function log(...message: String[]) {
    if (showlogs) {
      console.log('(NeuroID) ', message);
    }
  },
  d: function d(...message: String[]) {
    if (showlogs) {
      console.debug('(NeuroID Debug) ', message);
    }
  },
  i: function i(...message: String[]) {
    if (showlogs) {
      console.info('(NeuroID Info) ', message);
    }
  },
  e: function e(...message: String[]) {
    if (showlogs) {
      console.error('****** NeuroID ERROR: ******\n', message);
    }
  },
};

export default NeuroIDLog;
