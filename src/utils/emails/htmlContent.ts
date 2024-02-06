import ejs from "ejs";
import Helper from "../../utils/helper.js";

export default abstract class HtmlContent<T extends object> {
    protected options: T;
    constructor(options = {} as T) {
        this.options = options;
    }

    getOptions() {
        return this.options;
    }

    getHtmlFromEJS(filePath = ""): string {
        let html = "";
        if (filePath) {
            filePath = Helper.__dir + filePath;
            ejs.renderFile(filePath, this.options, (err, str) => {
                if (err) throw err;
                else {
                    html = str;
                }
            });
        }
        return html;
    }
}
