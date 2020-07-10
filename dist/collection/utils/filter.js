import { forIn } from "lodash-es";
export const filter = (data, value) => {
    const regex = new RegExp(value, "ig");
    if (data.length === 0) {
        console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
    }
    const find = (input, RE) => {
        let found = false;
        forIn(input, (val) => {
            if (typeof val === "function") {
                return;
            }
            if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
                if (find(val, RE)) {
                    found = true;
                }
            }
            else if (RE.test(val)) {
                found = true;
            }
        });
        return found;
    };
    const result = data.filter((item) => {
        return find(item, regex);
    });
    return result;
};
