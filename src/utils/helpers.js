// helper functions
export const featureProducts = (data) => {
  return data.filter((item) => {
    return item.featured === true;
  });
};
