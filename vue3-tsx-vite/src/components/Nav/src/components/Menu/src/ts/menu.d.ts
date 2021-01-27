/*
 * @Autor        : Pat
 * @Description  : Meuns interface
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 13:27:15
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-19 16:33:18
 */
export interface meta {
    title: string;
    hidden: boolean;
    icon: any;
    class: string,
    extend: any;
}

export interface Menus {
    path: string;
    name: string;
    meta: meta;
    redirect: string,
    children: Array<Menus>
}

export declare const isValidMenus: (val: any) => Menus;


export interface stateface {
    isCollapse: boolean;
    backgroundColor: string;
    textColor: string;
    activeTextColor: string
}

export interface propsface {
    menus: Array<Menus>;
    parentPath: string;
}