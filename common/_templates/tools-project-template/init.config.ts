/**
 * @author GuangHui
 * @description rush-init-project-plugin 配置文件
 * @reference https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md#configuration-for-initialize-project
 */

import type { IConfig } from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin'
import { DelDefaultQuestion } from '../_shared/del-default-quesion'

import { sharedPrompts } from '../_shared/promots'
const config: IConfig = {
  /* prompts type参考 */
  /* https://github.com/SBoudrias/Inquirer.js/#prompt-types */
  prompts: [...sharedPrompts],
  plugins: [new DelDefaultQuestion()],
  defaultProjectConfiguration: {
    reviewCategory: 'internal'
  }
}

export default config
