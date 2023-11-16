export function getRoundRobinIndex(index: number, total: number): number {
  return (index + total) % total;
}
