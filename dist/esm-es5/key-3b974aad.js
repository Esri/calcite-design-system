/**
 * Standardize key property of keyboard event (mostly for ie11)
 */
function getKey(key) {
    var lookup = {
        "Up": "ArrowUp",
        "Down": "ArrowDown",
        "Left": "ArrowLeft",
        "Right": "ArrowRight",
        "Spacebar": " ",
        "Esc": "Escape"
    };
    return lookup[key] || key;
}
export { getKey as g };
