/**
 * @author GuangHui
 * @description eslint config for node project
 * @reference
 * https://rushstack.io/pages/heft_tasks/eslint/
 * https://github.com/microsoft/rushstack/tree/master/eslint/eslint-config#getting-started-in-3-steps
 */

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

module.exports = {
  // 若为web应用使用@rushstack/eslint-config/profile/web-app
  // 若为node工具使用@rushstack/eslint-config/profile/node-trusted-tool
  // 若为node服务使用@rushstack/eslint-config/profile/node
  // 参考https://github.com/microsoft/rushstack/tree/master/eslint/eslint-config#2-choose-one-profile
  extends: ['@rushstack/eslint-config/profile/node-trusted-tool'], // <---- put your profile string here;
  parserOptions: { tsconfigRootDir: __dirname }
}
