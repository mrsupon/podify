import _ from "lodash";
import { ObjectId } from "bson";
import path from "path";

export default class Helper {
    static __dirname = "";

    static getPath(location: string) {
        return path.join(process.cwd(), location);
    }

    static getRandomAlphanumeric(length: number, spacialChar = "", isOnlySpacialChar = false): string {
        let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        !isOnlySpacialChar ? (str += spacialChar) : (str = spacialChar);
        str = _.replace(_.uniq(str).join(""), /\s+/g, ""); // reduce duplicate char

        if (length > 0) {
            const strLength = str.length;
            return _.times(length, () => str[_.random(strLength - 1)]).join("");
        }
        return "";
    }
    static isValidObjectId(id = "") {
        if (ObjectId.isValid(id)) {
            if (String(new ObjectId(id)) === id) return true;
            return false;
        }
        return false;
    }
}
