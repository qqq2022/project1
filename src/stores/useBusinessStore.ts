import { defineStore } from 'pinia'


import * as TransformUtils from '@/views/markdownRender/transform'

import { defaultModelName, modelMappingList } from '@/views/markdownRender/models'

export interface BusinessState {
  systemModelName: string
}

export const useBusinessStore = defineStore('business-store', {
  state: (): BusinessState => {
    return {
      systemModelName: defaultModelName
    }
  },
  getters: {
    currentModelItem(state) {
      return modelMappingList.find(v => v.modelName === state.systemModelName)
    }
  },
  actions: {
    /**
     * Event Stream 调用大模型接口
     */
    async createAssistantWriterStylized(data): Promise<{
      error: number
      reader: ReadableStreamDefaultReader<string> | null
    }> {

      // 调用当前模型的接口
      return new Promise((resolve) => {
        debugger;
        if (!this.currentModelItem?.chatFetch) {
          return {
            error: 1,
            reader: null
          }
        }
        this.currentModelItem.chatFetch(data.text)
          .then((res) => {
            if (res.body) {
              const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(TransformUtils.splitStream('\n'))
                .getReader()

              resolve({
                error: 0,
                reader
              })
            } else {
              resolve({
                error: 1,
                reader: null
              })
            }
          })
          .catch((err) => {
            resolve({
              error: 1,
              reader: null
            })
          })
      })
    }
  }
})
