import Sortable from "sortablejs";

const sortableComponentSet = new Set<SortableComponent>();

export interface SortableComponent {
  sortable: Sortable;

  setUpDragAndDrop: () => void;

  cleanUpDragAndDrop: () => void;

  onDisableSorting: () => void;

  onEnableSorting: () => void;
}

export function connectSortableComponent(component: SortableComponent): void {
  sortableComponentSet.add(component);
}

export function disconnectSortableComponent(component: SortableComponent): void {
  sortableComponentSet.delete(component);
}

export function startSorting(activeComponent: SortableComponent): void {
  sortableComponentSet.forEach((component) => {
    if (component !== activeComponent) {
      component.onDisableSorting();
    }
  });
}

export function stopSorting(activeComponent: SortableComponent): void {
  sortableComponentSet.forEach((component) => {
    if (component !== activeComponent) {
      component.onEnableSorting();
    }
  });
}
