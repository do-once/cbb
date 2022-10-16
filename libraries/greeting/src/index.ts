/**
 * @author GuangHui
 * @description 异步测试方法
 */

export async function greeting(): Promise<string> {
  return Promise.resolve('Hello wrold!')
}
