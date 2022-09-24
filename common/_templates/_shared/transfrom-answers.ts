/**
 * @author GuangHui
 * @description 转换answers(名称pascal化、新增answers等)
 * @reference https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md#how-to-develop-a-plugin
 */

import type {
  IPlugin,
  IHooks,
  IAnswers
} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib'

import { pascalCase } from '../../autoinstallers/rush-plugins/node_modules/change-case/dist'

import { SCOPE_NAME } from '../../config/custom/common'

const defaultOpts = {
  needPascalAnswers: ['packageName', 'unscopedPackageName'],
  needAddAnswers: [
    {
      name: 'scopeName',
      value: SCOPE_NAME
    }
  ]
}

export class TransformAnswers implements IPlugin {
  public static readonly pluginName: string = 'TransformAnswers'

  private opts: Partial<typeof defaultOpts>

  constructor(opts = {}) {
    this.opts = Object.assign({}, defaultOpts, opts)
  }

  apply(hooks: IHooks): void {
    const { needPascalAnswers, needAddAnswers } = this.opts

    hooks.answers.tap(TransformAnswers.pluginName, (answers: IAnswers) => {
      /* pascal转换 */
      if (needPascalAnswers?.length) {
        for (let i = 0, name = ''; i < needPascalAnswers.length; i++) {
          name = needPascalAnswers[i]

          if (!answers[name]) continue

          answers[`pascal${pascalCase(name)}`] = pascalCase(answers[name])
        }
      }

      /* 增加自定义answers */
      if (needAddAnswers?.length) {
        for (let i = 0; i < needAddAnswers.length; i++) {
          const { name, value } = needAddAnswers[i]
          if (!name) continue

          answers[name] = value
        }
      }
    })
  }
}
