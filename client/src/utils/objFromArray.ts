const objFromArray = (arr: any[], key = '_id') => arr.reduce((accumulator: {}, current: { [x: string]: string | number; }) => {
  accumulator[current[key]] = current;
  return accumulator;
}, {});

export default objFromArray;
