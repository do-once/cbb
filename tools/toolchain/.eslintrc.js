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
  extends: ['@rushstack/eslint-config/profile/node'], // <---- put your profile string here;若为web应用使用@rushstack/eslint-config/profile/web-app；参考https://github.com/microsoft/rushstack/tree/master/eslint/eslint-config#2-choose-one-profile
  parserOptions: { tsconfigRootDir: __dirname }
}
