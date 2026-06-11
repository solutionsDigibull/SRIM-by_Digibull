/**
 * Daemon logger — adds ISO timestamps to all log messages.
 *
 * Replaces bare console.log/warn/error in daemon code to ensure
 * consistent, timestamped output in both the log file and Electron console.
 *
 * Also keeps an in-memory ring buffer of the most recent formatted lines so the
 * web client's `exportLogs` flow can fetch real daemon log text (via the
 * `logs:get` RPC channel) and trigger a browser download.
 */

function timestamp(): string {
  return new Date().toISOString();
}

/** Max number of formatted log lines retained in memory for export. */
const MAX_LOG_LINES = 2000;
const ringBuffer: string[] = [];

function formatArg(arg: unknown): string {
  if (arg instanceof Error) {
    return arg.stack || `${arg.name}: ${arg.message}`;
  }
  if (typeof arg === 'string') return arg;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

function record(level: string, message: string, args: unknown[]): string {
  const extra = args.length ? ` ${args.map(formatArg).join(' ')}` : '';
  const line = `${timestamp()} [${level}] ${message}${extra}`;
  ringBuffer.push(line);
  if (ringBuffer.length > MAX_LOG_LINES) {
    ringBuffer.splice(0, ringBuffer.length - MAX_LOG_LINES);
  }
  return line;
}

export const log = {
  info(message: string, ...args: unknown[]): void {
    record('INFO', message, args);
    console.log(`${timestamp()} [INFO] ${message}`, ...args);
  },
  warn(message: string, ...args: unknown[]): void {
    record('WARN', message, args);
    console.warn(`${timestamp()} [WARN] ${message}`, ...args);
  },
  error(message: string, ...args: unknown[]): void {
    record('ERROR', message, args);
    console.error(`${timestamp()} [ERROR] ${message}`, ...args);
  },
};

/**
 * Return the most recent buffered daemon log lines (oldest first), capped at
 * `limit`. Used by the `logs:get` RPC channel that powers the web client's
 * exportLogs download.
 */
export function getRecentLogLines(limit = MAX_LOG_LINES): string[] {
  if (limit >= ringBuffer.length) return [...ringBuffer];
  return ringBuffer.slice(ringBuffer.length - limit);
}
