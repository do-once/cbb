import type {
  IPlugin,
  IHooks,
  IPromptsHookParams
} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib'

const defaultNeedDelQuesNames = ['authorName']

export class DelDefaultQuestion implements IPlugin {
  public static readonly pluginName: string = 'DelDefaultQuestion'
  private needDelQuesNames: string[]

  constructor(needDelQuesNames = defaultNeedDelQuesNames) {
    this.needDelQuesNames = needDelQuesNames
  }

  apply(hooks: IHooks): void {
    if (!this.needDelQuesNames || this.needDelQuesNames.length === 0) return

    const needDel = this.needDelQuesNames

    hooks.prompts.tap(DelDefaultQuestion.pluginName, (prompts: IPromptsHookParams) => {
      for (let i = 0; i < needDel.length; i++) {
        const quesName = needDel[i]
        /* 删除默认问题 */
        // @ts-ignore: 插件运行环境支持findIndex
        const index = prompts.promptQueue.findIndex(it => it.name === quesName)

        if (index < 0) continue

        prompts.promptQueue.splice(index, 1)
      }
    })
  }
}
