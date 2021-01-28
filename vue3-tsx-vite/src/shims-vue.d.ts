/*
 * @Autor        : Pat
 * @Description  : shims-vue.d.ts
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:01:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 15:31:37
 */
// declare module all vue type
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent>;
    export default component;
}

// declare module ambfs type
declare module 'p.fs.amb' {
    const ambfs: Function;
    export default ambfs;
}


// declare module all files type
// Prevent errors during development
declare module '*' {
    const allFiles: any;
    export default allFiles;
}