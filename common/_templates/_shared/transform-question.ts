/**
 * @author GuangHui
 * @description 删除默认问题
 * @reference https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md#how-to-develop-a-plugin
 */

import type {
  IPlugin,
  IHooks,
  IPromptsHookParams
} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib/index'
import type { IExtendedAnswers } from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib/plopfile'

import { SCOPE_NAME } from '../../config/custom/common'

const defaultOpts = {
  needDelQuesNames: ['authorName'],
  validators: [
    {
      applyAnswerName: 'packageName',
      validator(input: string, answers: Partial<IExtendedAnswers>) {
        if (input.indexOf(`@${SCOPE_NAME}/`) !== 0) return `package name must start with @${SCOPE_NAME}`
        return true
      }
    }
  ]
}

export class TransformQuestion implements IPlugin {
  public static readonly pluginName: string = 'TransformQuestion'

  private opts: Partial<typeof defaultOpts>

  constructor(opts = {}) {
    this.opts = Object.assign({}, defaultOpts, opts)
  }

  apply(hooks: IHooks): void {
    const { needDelQuesNames, validators } = this.opts

    hooks.prompts.tap(TransformQuestion.pluginName, (prompts: IPromptsHookParams) => {
      /* 删除问题 */
      if (needDelQuesNames?.length) {
        for (let i = 0; i < needDelQuesNames.length; i++) {
          const quesName = needDelQuesNames[i]

          // @ts-ignore: 插件运行环境支持findIndex
          const index = prompts.promptQueue.findIndex(it => it.name === quesName)

          if (index < 0) continue

          prompts.promptQueue.splice(index, 1)
        }
      }

      /* 修改验证问题 */
      if (validators?.length) {
        for (let i = 0, v = null; i < validators.length; i++) {
          const { applyAnswerName, validator: newValidator } = validators[i]
          const p = prompts.promptQueue.find(it => it.name === applyAnswerName)

          if (!p) continue

          const originalValidator = p.validate
          p.validate = async function validate(input: string, answers: Partial<IExtendedAnswers>) {
            return originalValidator(input, answers) && newValidator(input, answers)
          }
        }
      }
    })
  }
}
