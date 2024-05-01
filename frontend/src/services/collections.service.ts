export const groupBy = ({ arr, criteria }: { arr: any[], criteria: any | Function }) => {
  if (arr?.length == 0) {
    return {}
  }
  return arr?.reduce(function (obj, item) {
    let key = typeof criteria === 'function' ? criteria(item) : item[criteria];
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = [];
    }
    obj[key].push(item);
    return obj;
  }, {});
}