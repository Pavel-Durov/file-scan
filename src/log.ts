import debug from 'debug';
import { FILE_SCAN_DEBUG } from './config';

debug.enable(FILE_SCAN_DEBUG);

export function initLog(ns: string): (...arg: any) => void {
  return debug(`file-scan:${ns}`);
}