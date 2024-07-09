import { defineComponent, h, inject } from 'vue'
import { IBoxProps } from '../types'
import { Slots } from '../context'

const List = defineComponent<IBoxProps>(props => {
  const listBar = inject(Slots)?.['list-bar']

  return () => {
    return h(
      'div',
      { class: 'do-List' },
      h('div', ['list>', listBar ? listBar(props) : h('div', 'default-list-bar')])
    )
  }
})

export default List
