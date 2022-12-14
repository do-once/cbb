/**
 * @author GuangHui
 * @description log
 */
import chalk from 'chalk';
const log = console.log.bind(console);
function logFactory(chalkFn) {
    return (...args) => log(chalkFn(args[0]), ...args.slice(1));
}
export const err = logFactory(chalk.hex('#f56c6c'));
export const warn = logFactory(chalk.hex('#e6a23c'));
export const info = logFactory(chalk.hex('#409eff'));
export const succ = logFactory(chalk.hex('#67c23a'));
//# sourceMappingURL=log.js.map