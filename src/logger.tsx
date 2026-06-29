import type { NeuroIDLogClass } from "./NativeNeuroidReactnativeSdk";

let showlogs = true;
export const NeuroIDLog: NeuroIDLogClass = {
  enableLogging: function enableLogging(value?: boolean) {
    showlogs = value === false ? false : true;
  },
  log: function log(...message: string[]) {
    if (showlogs) {
      console.log("(NeuroID) ", message);
    }
  },
  d: function d(...message: string[]) {
    if (showlogs) {
      console.debug("(NeuroID Debug) ", message);
    }
  },
  i: function i(...message: string[]) {
    if (showlogs) {
      console.info("(NeuroID Info) ", message);
    }
  },
  e: function e(...message: string[]) {
    if (showlogs) {
      console.error("****** NeuroID ERROR: ******\n", message);
    }
  },
  w: function e(...message: string[]) {
    if (showlogs) {
      console.warn("****** NeuroID WARNING: ******\n", message);
    }
  },
};

export default NeuroIDLog;
