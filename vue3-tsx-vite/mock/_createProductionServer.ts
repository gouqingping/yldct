/*
 * @Autor        : Pat
 * @Description  : createProdMockServer
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 15:19:43
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 10:14:56
 */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
const modules = import.meta.globEager('./model/*.mock.ts'), mockModules: any[] = [];
// Traverse all .mock.ts files in the model folder as mockjs templates
Object.keys(modules).forEach((key) => {
	if (key.includes('/_')) { return }
	mockModules.push(...modules[key].default);
});
// Used in a production environment. 
// Need to manually import all modules
export function setupProdMockServer() {
	createProdMockServer(mockModules);
}
