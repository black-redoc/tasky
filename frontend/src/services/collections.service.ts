/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const groupBy = ({ arr, criteria }: { arr: any[], criteria: (value: string) => string | any }) => {
  if (arr?.length == 0) {
    return {}
  }
  return arr?.reduce(function (obj, item) {
    const key = typeof criteria === 'function' ? criteria(item) : item[criteria];
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = [];
    }
    obj[key].push(item);
    return obj;
  }, {});
}
