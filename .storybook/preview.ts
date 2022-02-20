// import '../src/styles/index.scss';  //引入全局样式文件

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, 
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}