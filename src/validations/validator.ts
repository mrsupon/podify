import * as Yup from "yup";
import _ from "lodash";

// export const validate = async (schema: any, fields: {}, isAbortEarly: boolean) => {
//     console.log(fields);
//     try {
//         return await schema.validate(fields, { abortEarly: isAbortEarly });
//     } catch (error) {
//         throw error;
//     }
// };

export default class Validator<T> {
    private schema: Yup.Schema;

    constructor(schema: Yup.Schema) {
        this.schema = schema;
    }
    async validateFirst(fields: T) {
        try {
            await this.validate(fields, true);
        } catch (error) {
            throw error;
        }
    }
    async validateAll(fields: T) {
        try {
            await this.validate(fields, false);
        } catch (error) {
            throw error;
        }
    }
    async validate(fields: T, isAbortEarly: boolean) {
        //return this.schema.validate(this.fields, { abortEarly: this.isAbortEarly });
        try {
            return await this.schema.validate(fields, { abortEarly: isAbortEarly });
        } catch (error) {
            let validationError = null;
            if (error instanceof Yup.ValidationError) {
                let fields = null;
                if (isAbortEarly) {
                    fields = [error.path];
                } else {
                    fields = _.uniq(_.map(error.inner, (inner) => inner.path));
                }
                validationError = new Yup.ValidationError("error", {
                    messages: error.errors,
                    fields: fields,
                });
            }
            throw validationError;
        }
    }
}
