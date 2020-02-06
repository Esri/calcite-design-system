// import { debounce, forIn } from "lodash-es";
import { forIn } from "lodash-es";

// const filterDebounceInMs = 0;

export const filter = (data: Array<object>, value: string): Array<object> => {
  const regex = new RegExp(value, "ig");

  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }

  const find = (input: object, RE: RegExp) => {
    let found = false;
    forIn(input, (val) => {
      if (typeof val === "function") {
        return;
      }
      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        if (find(val, RE)) {
          found = true;
        }
      } else if (RE.test(val)) {
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

// export const filter = debounce((data: Array<object>, value: string): Array<object> => {
//   const regex = new RegExp(value, "ig");

//   if (data.length === 0) {
//     console.warn(`No data was passed to the filter function.
//     The data argument should be an array of objects`);
//   }

//   const find = (input: object, RE: RegExp) => {
//     let found = false;
//     forIn(input, (val) => {
//       if (typeof val === "function") {
//         return;
//       }
//       if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
//         if (find(val, RE)) {
//           found = true;
//         }
//       } else if (RE.test(val)) {
//         found = true;
//       }
//     });
//     return found;
//   };

//   const result = data.filter((item) => {
//     return find(item, regex);
//   });

//   return result;
// }, filterDebounceInMs);
