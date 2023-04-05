// Util function which gets an array inputArray and a size perChunk
// and returns an array of chunks, every chunk size is maximum as
// perChunk value.

export const splitArrayIntoChunks = (inputArray, perChunk) => {
  const result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
};
