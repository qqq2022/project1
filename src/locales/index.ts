// 导入你的本地化消息文件
import { createI18n } from "vue-i18n";

// 创建 i18n 实例
const i18n = createI18n({
    locale: "en", // 设置默认语言
    fallbackLocale: "pt", // 当没有指定语言时的回退语言
    messages: {
      en: {
        hello: "hello world",
      },
      pt: {
        hello: "Olá mundo",
      },
    },
    legacy: false,
  });
  export { i18n }
