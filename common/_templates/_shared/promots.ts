/**
 * @author GuangHui
 * @description 共用prompts
 * @reference https://github.com/SBoudrias/Inquirer.js/#prompt-types
 */

export const sharedPrompts = [
  {
    type: 'confirm',
    name: 'useRigPkg',
    message: 'use rig pkg to share config?',
    default: true
  },
  {
    type: 'list',
    name: 'rigPackageName',
    message: 'select a rig pkg',
    when(answers) {
      return !!answers.useRigPkg
    },
    choices() {
      return ['@doonce/web-rig', '@doonce/node-rig']
    }
  },
  {
    type: 'list',
    name: 'rigProfile',
    message: 'select a rig profile',
    when(answers) {
      return !!answers.rigPackageName
    },
    choices(answers) {
      if (answers.rigPackageName === '@doonce/node-rig') {
        return [
          {
            name: 'default-默认',
            value: 'default'
          }
        ]
      }

      if (answers.rigPackageName === '@doonce/web-rig') {
        return [
          { name: 'app-web应用', value: 'app' },
          { name: 'library-web类库', value: 'library' }
        ]
      }
    }
  },
  {
    type: 'list',
    name: 'eslintProfile',
    message: 'select a eslint profile',
    choices(answers) {
      if (answers.rigPackageName === '@doonce/web-rig') {
        return [
          {
            name: '@rushstack/eslint-config/profile/web-app(web应用或者同时给node、browser的类库)',
            value: '@rushstack/eslint-config/profile/web-app'
          }
        ]
      } else if (answers.rigPackageName === '@doonce/node-rig') {
        return [
          {
            name: '@rushstack/eslint-config/profile/node(node服务)',
            value: '@rushstack/eslint-config/profile/node'
          },
          {
            name: '@rushstack/eslint-config/profile/node-trusted-tool(node工具)',
            value: '@rushstack/eslint-config/profile/node-trusted-tool'
          }
        ]
      } else {
        return [
          {
            name: '@rushstack/eslint-config/profile/web-app(web应用或者同时给node、browser的类库)',
            value: '@rushstack/eslint-config/profile/web-app'
          },
          {
            name: '@rushstack/eslint-config/profile/node(node服务)',
            value: '@rushstack/eslint-config/profile/node'
          },
          {
            name: '@rushstack/eslint-config/profile/node-trusted-tool(node工具)',
            value: '@rushstack/eslint-config/profile/node-trusted-tool'
          }
        ]
      }
    }
  }
]
