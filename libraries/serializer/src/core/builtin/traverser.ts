import { ITraverser, IElement, IRunner, IText } from '../../types'
import { Runner } from './runner'
import * as BuiltRules from '../../rules'
import { isElementRule, isTextRule } from '../../utils'

export class Traverser implements ITraverser {
  constructor(private readonly _runner: IRunner) {}

  static create = () => {
    const { elementRules, textRules, defaultTextRule, defaultElementRule } = instantiateBuiltInRules()

    const runner = Runner.create({
      elementRules,
      textRules,
      defaultTextRule,
      defaultElementRule
    })

    return new Traverser(runner)
  }

  run = (node: Node, parents: Node[] = []) => {
    let rets: (IElement | IText)[] = []

    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        rets = [...rets, ...this.processElement(node, parents)]
        break
      case Node.TEXT_NODE:
        rets = [...rets, ...this.processText(node.textContent ?? '', [...parents, node])]
        break
      default:
        Array.from(node.childNodes).forEach(n => {
          rets = [...rets, ...this.run(n, [...parents, node])]
        })

        break
    }

    return rets
  }

  private processElement = (node: Node, parents: Node[]) => {
    const children = Array.from(node.childNodes)
      .map(n => this.run(n, [...parents, node]))
      .flat()

    return this._runner.run(node, parents, children)
  }

  private processText = (text: string, parents: Node[]) => {
    return this._runner.run(text, parents)
  }
}

const instantiateBuiltInRules = () => {
  const rules = Object.values(BuiltRules).map(RuleCtr => new RuleCtr())

  const elementRules = rules.filter(isElementRule)
  const textRules = rules.filter(isTextRule).filter(rule => rule.name !== 'PlainTextRule')

  return {
    elementRules,
    textRules,
    defaultElementRule: undefined,
    defaultTextRule: new BuiltRules.PlainTextRule()
  }
}
