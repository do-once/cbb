import { defineComponent, h, inject } from 'vue'
import { IBoxProps } from '../types'
import { Slots } from '../context'
import { useHello } from '../composables'

const Box = defineComponent<IBoxProps>(props => {
  const boxFoo = inject(Slots)?.['box-foo']

  const helloComp = useHello()

  return () => {
    return h(
      'div',
      { class: 'do-Box' },
      h('div', [
        'box>',
        boxFoo
          ? [
              boxFoo(props),
              h(
                'button',
                {
                  onClick: () => {
                    helloComp.updateFirstName(Math.random().toString())
                  }
                },
                'change firstName'
              )
            ]
          : h('div', ['default-box-foo'])
      ])
    )
  }
})

export default Box
