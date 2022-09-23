/**
 * @author GuangHui
 * @description rush-init-project-plugin 配置文件
 * @reference https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md#configuration-for-initialize-project
 */

import type { IConfig } from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin'
import { DelDefaultQuestion } from '../_shared-plugins/del-default-quesion'

import { AddPascalName } from '../_shared-plugins/add-pascal-name'
const config: IConfig = {
  /* prompts type参考 */
  /* https://github.com/SBoudrias/Inquirer.js/#prompt-types */
  // prompts: [
  //   {
  //     type: 'list',
  //     name: 't',
  //     message: 'select t',
  //     choices() {
  //       return ['a', 'b']
  //     }
  //   }
  // ],
  plugins: [new DelDefaultQuestion(), new AddPascalName()],
  defaultProjectConfiguration: {
    reviewCategory: 'published'
  }
}

export default config
