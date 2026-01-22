import RNFS from "react-native-fs";

const LOG_PATH = `${RNFS.DocumentDirectoryPath}/app.log`;

function format(args: any[]) {
  return args
    .map(a => {
      if (typeof a === "string") return a;
      try {
        return JSON.stringify(a);
      } catch {
        return String(a);
      }
    })
    .join(" ");
}

export async function fileLog(...args: any[]) {
  const line =
    `[${new Date().toISOString()}] ` +
    format(args) +
    "\n";

  try {
    await RNFS.appendFile(LOG_PATH, line, "utf8");
  } catch (e) {
    // last resort
    console.warn("Failed to write log:", e);
  }
}

export async function clearLogs() {
  try {
    await RNFS.writeFile(LOG_PATH, "", "utf8");
  } catch {}
}

export function getLogPath() {
  return LOG_PATH;
}
