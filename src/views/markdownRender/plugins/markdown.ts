import MarkdownIt from 'markdown-it'
import hljs from './highlight'
import markdownItHighlight from 'markdown-it-highlightjs'
import { preWrapperPlugin } from './preWrapper'

import markdownItKatex from '@vscode/markdown-it-katex'
import splitAtDelimiters from 'katex/contrib/auto-render/splitAtDelimiters'

import 'katex/dist/katex.min.css'
import 'katex/dist/contrib/mhchem.min.js'
import markdownItContainer from 'markdown-it-container';

import {
  markdownItMermaidPlugin,
  renderMermaidSSE,
  transformMermaid
} from '@nzoth/toolkit'

import '@nzoth/toolkit/styles'
import { echartsPlugins } from './echarts'
import { useBusinessStore } from "@/stores/useBusinessStore";
import { nextTick } from 'vue';

const businessStore = useBusinessStore();

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(markdownItHighlight, {
  hljs
})
  .use(preWrapperPlugin, {
    hasSingleTheme: true
  })
  .use(markdownItKatex)
  .use(markdownItMermaidPlugin)
  .use(markdownItContainer, 'echarts', {
    render: echartsPlugins
  });


const transformMathMarkdown = (markdownText: string) => {
  const data = splitAtDelimiters(markdownText, [
    {
      left: '\\[',
      right: '\\]',
      display: true
    },
    {
      left: '\\(',
      right: '\\)',
      display: false
    }
  ])

  return data.reduce((result, segment: any) => {
    if (segment.type === 'text') {
      return result + segment.data
    }
    const math = segment.display ? `$$${segment.data}$$` : `$${segment.data}$`
    return result + math
  }, '')
}

const transformThinkMarkdown = (source: string): string => {
  let result = ''
  let buffer = ''
  let inThinkBlock = false

  const classNameWrapper = 'think-wrapper'

  // 转义 <think/> 中的 <script/>
  const escapeScriptTags = (content: string): string => {
    // <script> 或 <script ...>
    let escaped = content.replace(/<script([^>]*)>/gi, '&lt;script$1&gt;')
    // </script>
    escaped = escaped.replace(/<\/script>/gi, '&lt;/script&gt;')
    // <script ... />
    escaped = escaped.replace(/<script([^>]*)\s*\/>/gi, '&lt;script$1 /&gt;')

    return escaped
  }

  for (let i = 0; i < source.length; i++) {
    const char = source[i]
    const nextChars = source.slice(i, i + 7)
    const endChars = source.slice(i, i + 8)

    if (!inThinkBlock && nextChars === '<think>') {
      inThinkBlock = true
      result += `<div class="${classNameWrapper}">`
      i += 6
      continue
    }

    if (inThinkBlock && endChars === '</think>') {
      inThinkBlock = false
      result += '</div>'
      i += 7
      continue
    }

    if (inThinkBlock) {
      buffer += char
    } else {
      result += char
    }
  }

  if (buffer) {
    const escapedBuffer = escapeScriptTags(buffer)
    const thinkContent = md.render(escapedBuffer)

    result = result.replace(`<div class="${classNameWrapper}">`, `<div class="${classNameWrapper}">${thinkContent}`)
  }

  return result
}


export const renderMarkdownText = (content: string) => {
  const thinkTransformed = transformThinkMarkdown(content)
  const mathTransformed = transformMathMarkdown(thinkTransformed)
  const mermaidTransformed = transformMermaid(mathTransformed)
  return md.render(mermaidTransformed)
}

export const drawEcharts = async (echarts) => {
  console.log('倒计时结束');
  await nextTick();
  console.log('businessStore.echartMap', businessStore.echartMap)
  businessStore.echartMap.forEach((value, key) => {
    const dom = document.getElementById(`echarts-id-${key}`)
    console.log('dom', dom);
    debugger;
    let myChart = echarts.init(dom);
    myChart.setOption(value);
  })
}

// 触发 Mermaid 渲染
export const renderMermaidProcess = (callback = () => { }) => {
  renderMermaidSSE(callback)
}
