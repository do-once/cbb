/**
 * @author GuangHui
 * @description 参数
 */
import yargs from 'yargs';
export const argv = yargs
    .boolean('withAST')
    .default('withAST', false)
    .array('patterns')
    .default('patterns', ['src/**/*.vue', 'src/**/*.js'])
    .boolean('debug')
    .default('debug', false);
//# sourceMappingURL=arg.js.map