import { string } from "yup";
import PrismaMongodb, { prisma } from "./databases/mongodb/prisma.js";
import _ from "lodash";
import { ObjectId } from "bson";
import Helper from "./utils/helper.js";
import Http, { status } from "./utils/httpStatus.js";

function main(): void {
    let myMap = new Map<string, { msg: string; code: number }>([
        ["key1", { msg: "string", code: 1 }],
        ["key2", { msg: "string", code: 2 }],
    ]);
    //const result = _.filter(_.entries(Http.status), ([key, value]) => value.code === 404)[0];
    //const result = _.findKey(Http.status, { message: Http.status.NOT_FOUND_404.message }) || "";
    //const data = _.pick(Http.status, result);

    console.log(Http.getCode("Internal Server Error"));
    console.log(Http.getMessage(404));
}

main();
