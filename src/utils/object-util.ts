const deletePropertyByPath = (obj: any, path: string[]): boolean => {
  if (path.length === 0) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
    obj,
  );

  if (target && Object.prototype.hasOwnProperty.call(target, lastKey)) {
    delete target[lastKey];
    return true;
  }

  return false;
};

const addPropertyByPath = (obj: any, path: string[], addObj: any): boolean => {
  if (path.length === 0) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce((o, key) => {
    if (!o[key]) {
      o[key] = {};
    }
    return o[key];
  }, obj);

  if (!Object.prototype.hasOwnProperty.call(target, lastKey)) {
    target[lastKey] = addObj;
    return true;
  }
  return false;
};

const modifyPropertyNameByPath = (
  obj: any,
  path: string[],
  name: string,
): boolean => {
  if (path.length === 0 || !name) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
    obj,
  );

  if (
    target &&
    Object.prototype.hasOwnProperty.call(target, lastKey) &&
    !Object.prototype.hasOwnProperty.call(target, name)
  ) {
    const newEntries = Object.entries(target).map(([key, value]) =>
      key === lastKey ? [name, value] : [key, value],
    );

    // 清空对象并重建属性
    Object.keys(target).forEach((key) => delete target[key]);
    Object.assign(target, Object.fromEntries(newEntries));
    return true;
  }

  return false;
};

const modifyPropertyValueByPath = (
  obj: any,
  path: string[],
  valueObj: any,
): boolean => {
  if (path.length === 0 || !valueObj) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
    obj,
  );

  if (target) {
    target[lastKey] = valueObj;
    return true;
  }

  return false;
};

const deleteArrayElementByPath = (
  obj: any,
  path: string[],
  elementToDelete: any,
) => {
  if (path.length === 0) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
    obj,
  );

  if (target && Array.isArray(target[lastKey])) {
    const index = target[lastKey].indexOf(elementToDelete);
    if (index !== -1) {
      target[lastKey].splice(index, 1);
      return true;
    }
  }

  return false;
};

const addArrayElementByPath = (obj: any, path: string[], elementToAdd: any) => {
  if (path.length === 0) return false;

  path = path.slice();
  const lastKey = path.pop()!;
  const target = path.reduce(
    (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
    obj,
  );

  if (!target) {
    return false;
  }

  if (!target[lastKey]) {
    target[lastKey] = [];
  }

  if (Array.isArray(target[lastKey])) {
    target[lastKey].push(elementToAdd);
    return true;
  }

  return false;
};

export {
  deletePropertyByPath,
  addPropertyByPath,
  modifyPropertyNameByPath,
  modifyPropertyValueByPath,
  deleteArrayElementByPath,
  addArrayElementByPath,
};
