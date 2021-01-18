const fs = require('fs');
class Sysinit {
    constructor(configSrc = './src/init') {
        fs.mkdir(configSrc, err => err);
        this.buildName = "dist";
        this.envType = "dev";
        this.sysType = "dev";
        this.configSrc = configSrc;
        this.init();
        return {
            buildName: this.buildName,
            //appConfig: require(`../src/config/app.js`)
        };
    };

    init() {
        let self = this;
        self.SetType();
        self.initApi();
        self.initSys();
        self.initAmb();
        self.setApi();
    };

    SetType() {
        let env = process.env.npm_lifecycle_script;
        console.log(env)
        env = env.replace(/\s+/g, ",").split(",");
        for (let item of env) {
            if (item.indexOf("=") > -1) {
                if (item.split("=")[0] == "ENV_TYPE")
                    this.envType = item.split("=")[1];
                if (item.split("=")[0] == "SYS_TYPE")
                    this.sysType = item.split("=")[1];
            };
        };
    };

    // Initialize api.js file
    initApi(content = "") {
        const SRC = this.configSrc;
        // Create api.js file and write Api related content
        let spliceStr = "", expStrArr = ["module.exports", "export default"];
        expStrArr.map(item => {
            if (content.indexOf(item) > -1) {
                spliceStr = item;
            };
        });
        this.addFile(`${SRC}/api.js`, content.substring(content.indexOf(spliceStr), content.length));
    };

    // Initialize sys.js file
    initSys() {
        const SRC = this.configSrc;
        // Create sys.js file and write Sys related content
        this.addFile(`${SRC}/sys.js`, `export default {"type":"${this.sysType}"};`);
    };

    // Initialize amb.js file
    initAmb(content = `export default {
        moduleName: "",
        moduleEname: "",
        mock: true,
        buildName: "dist"
    };`) {
        const SRC = this.configSrc;
        // Create amb.js file and write Amb related content
        if (process.env.npm_lifecycle_event.indexOf("build") > -1) {
            if (process.env.npm_lifecycle_event.indexOf(":") > -1) {
                if (content.indexOf("mock") < 0) {
                    this.addFile(`${SRC}/amb.js`, content.replace("{", "{mock: false,"));
                } else {
                    if (content.indexOf("mock") > -1) {
                        let newContentStr = content.split("{")[1].split("}")[0].split(",");
                        let contentStr = "export default {"
                        for (let item of newContentStr) {
                            if (item.indexOf("mock") < 0) {
                                contentStr += `${item},`;
                            };
                        };
                        this.addFile(`${SRC}/amb.js`, `${contentStr.substring(0, contentStr.length - 1)}}`);
                    } else {
                        this.addFile(`${SRC}/amb.js`, content);
                    };
                };
            } else {
                this.addFile(`${SRC}/amb.js`, content.indexOf("mock") < 0 ? content.replace("{", "{mock: true,") : content);
            };
        } else {
            this.addFile(`${SRC}/amb.js`, content.indexOf("mock") < 0 ? content.replace("{", "{mock: true,") : content);
        };
    };

    // Create a file
    // url :File write path
    // content: What to write
    addFile(url, content) {
        // Write the specified content to the corresponding file
        fs.writeFile(url, content, err => err);
    };

    // Create the corresponding API file in the API folder
    setApi() {
        let self = this;
        //Get what has been written
        //Get the value of the name attribute in the content
        let fileContent = fs.readFileSync(`./api/${self.envType}.js`, "utf8");
        //Get the value of the name attribute in the content
        //If not empty
        //Take out the corresponding file content
        // Write file contents to file
        if (fileContent) {
            let str = fileContent.replace(/\s+/g, ""),strModelName = str.indexOf('module') > -1?"module":"export";
            let moduleName = str.substring(0, str.indexOf(strModelName) > -1 ? str.indexOf(strModelName) : str.indexOf("export default")).match(/\".+\"/g)[0].replace(/\"/g, "");
            self.initApi(fileContent);
            self.setAmb(moduleName);
        };
    };

    // Create the corresponding amb file in the Amb folder
    setAmb(moduleName) {
        let self = this;
        self.buildName = moduleName;
        fs.readFile(`./amb/${moduleName}.js`, "utf8", (err, data) => {
            if (data) {
                self.initAmb(data);
            } else {
                self.initAmb();
            };
        });
    };
};

module.exports = function ambfs(url) {
    new Sysinit(url);
};