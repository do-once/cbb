/**
 * @author GuangHui
 * @description 生成PascalCase名字
 * @reference https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md#how-to-develop-a-plugin
 */

import type {
  IPlugin,
  IHooks,
  IAnswers
} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib'

import { pascalCase } from '../../autoinstallers/rush-plugins/node_modules/change-case/dist'

const defaultNeedPascalAnswers = ['packageName', 'unscopedPackageName']

export class AddPascalName implements IPlugin {
  public static readonly pluginName: string = 'AddPascalName'

  private needPascalAnswers: string[]

  constructor(needPascalAnswers = defaultNeedPascalAnswers) {
    this.needPascalAnswers = needPascalAnswers
  }

  apply(hooks: IHooks): void {
    const needPascalAnswers = this.needPascalAnswers

    hooks.answers.tap(AddPascalName.pluginName, (answers: IAnswers) => {
      if (!needPascalAnswers || !needPascalAnswers.length) return

      for (let i = 0, name = ''; i < needPascalAnswers.length; i++) {
        name = needPascalAnswers[i]

        if (!answers[name]) continue

        answers[`pascal${pascalCase(name)}`] = pascalCase(answers[name])
      }
    })
  }
}
