/*
 * @Autor        : Pat
 * @Description  : shims-vue.d.ts
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:01:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-26 15:36:04
 */
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent>;
    export default component;
}

declare module 'p.fs.amb' {
    const ambfs: Function;
    export default ambfs;
}

declare module '*' {
    const allFiles: any;
    export default allFiles;
}