export function format(first, middle, last) {
    return ((first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : ""));
}
