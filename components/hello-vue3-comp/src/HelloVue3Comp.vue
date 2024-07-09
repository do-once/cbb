<script setup lang="ts">
/**
 * * DoonceHelloVue3Comp
 */
import { type IHelloSlots, type IHelloEmits, type IHelloProps, HelloStore } from './types'
import { useHello, useWatchProps } from './composables'
import { useHooks } from './store'
import { Slots } from './context'
import { onUnmounted, provide } from 'vue'

import Box from './components/Box'
import List from './components/List'

const props = withDefaults(defineProps<IHelloProps>(), {
  /** 为开关项的props设置显式初始值 */
  uppercaseable: undefined
})

const emit = defineEmits<IHelloEmits>()

const slots = defineSlots<IHelloSlots>()

const instance = useHello(props)

/** 监听props，更新store */
const dispose = useWatchProps(props, instance)

/** 注册事件 */
useHooks(emit, instance.hooks)

/** 避免层层透传slot，所以采用provide */
provide(Slots, slots)

onUnmounted(() => {
  dispose()
})

defineExpose<HelloStore>(instance)
</script>

<template>
  <slot name="title"></slot>
  {{ instance.getName }}
  <List></List>
  <Box></Box>
</template>

<style>
.doonce-HelloVue3Comp {
  color: red;
}
</style>
