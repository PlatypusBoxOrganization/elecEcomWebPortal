//FECTH PRODUCT BY ID
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/product/` + id,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProduct(){
    return new Promise(async(resolve)=>{
        const response = await fetch(`http://localhost:8000/product`, {
          credentials: "include",
        });
        const data = await response.json();
        resolve({ data });
    })
}

export function fetchProductsByFilter(category, page, limit, sort) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8000/product/filter?category=${category}&page=${page}&limit=${limit}&sort=${sort}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error("Error fetching products:", error);
      resolve({ data: null, error });
    }
  });
}

export function createProduct(productFormData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/product`, {
      method: "POST",
      credentials: "include",
      body: productFormData, 
    });
    const data = await response.json();
    resolve({ data });
  });
}

