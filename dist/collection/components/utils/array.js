export function getRoundRobinIndex(index, total) {
    return (index + total) % total;
}
