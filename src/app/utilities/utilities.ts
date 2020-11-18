export const removeEmptyProps = (obj: any) => {
  const newObj: any = {};

  Object.keys(obj).forEach((prop: string) => {
    if (obj[prop]) {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
};
