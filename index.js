const rc = require("rc");
const debug = require("debug")("opshun");
const parse = require("parse-strings-in-object");
const traverse = require("traverse");

/**
 * Drop-in replacement for the 'rc' package with recursive type parsing/safety
 * This also fixes the broken d.ts of rc package so vscode shows correct types
 * @template T configuration type
 * @param {string} nsp rc namespace
 * @param {T} defaults default configuration
 * @returns {T} read and parsed configuration
 */
function opshun(nsp, defaults) {
  debug("reading config for namespace: %s and defaults: %o", nsp, defaults);
  const userConfig = rc(nsp, defaults);
  debug("rc read configuration: %o", userConfig);
  const parsedConfig = parse(userConfig);
  debug("parsed configuration: %o", parsedConfig);
  const parsedFlat = traverse(parsedConfig).reduce(function (acc, x) {
    if (this.isLeaf && this.key !== "_")
      acc[`${nsp}_${this.path.join("__")}`] = `${x}`;
    return acc;
  }, {});
  debug("flat configuration: %O", parsedFlat);
  return parsedConfig;
}

module.exports = exports = opshun;
