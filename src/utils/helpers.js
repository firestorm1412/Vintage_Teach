import url from "./URL";
//flatten
export function flattenProducts(data) {
  return data.map((item) => {
    //claudinary
    /* let image = item.image.url; */
    let image = `${url}${item.image[0].url}`;
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}

//paginado
export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

// Paginado usando SPLICE
  // const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
  //   return products.splice(0, itemsPerPage);
  // });

  // Paginado usando SLICE
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProducts;
}
