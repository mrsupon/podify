import { string } from "yup";
import PrismaMongodb, { prisma } from "./databases/mongodb/prisma.js";
import _ from "lodash";
import { ObjectId } from "bson";
import Helper from "./utils/helper.js";

function main(): void {
    const id = new ObjectId();
    console.log(id);
    console.log(Helper.isValidObjectId(id.toString()));
}

main();
