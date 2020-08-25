import { Config, Match, processFile } from "./match";
import { initLog } from "./log";

const log = initLog("main");

export { Config, Match };

export async function scan(config: Config): Promise<Match[]> {
  log(scan.name, config.files);
  const promises = config.files.map((f) => processFile(config.pattern, f));
  const matches = await Promise.all(promises);
  return matches.filter((m) => m) as Match[];
}
