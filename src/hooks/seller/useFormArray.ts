import { useState } from 'react';

export function useFormArray<T>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);

  const add = (item: T) => setItems((prev) => [...prev, item]);
  const remove = (predicate: (item: T) => boolean) =>
    setItems((prev) => prev.filter((item) => !predicate(item)));
  const update = (predicate: (item: T) => boolean, updater: (item: T) => T) =>
    setItems((prev) => prev.map((item) => (predicate(item) ? updater(item) : item)));
  const set = (newItems: T[]) => setItems(newItems);
  const reset = () => setItems(initial);

  return { items, add, remove, update, set, reset };
}
