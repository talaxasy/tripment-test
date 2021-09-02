export const toSpecialityObject = (
  array: Array<{name: string; count: number}>,
): {[key: string]: boolean} => {
  const recordArray: Record<string, boolean> = {}; // {username: 'Sorry, here is error'}
  array.forEach(({name}) => {
    recordArray[name] = false; // создаём ключ-значение, где ключ это field, а значение это message
  });
  return recordArray;
};
