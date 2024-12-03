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

export async function createProduct(productFormData) {
  try {
    // Perform the fetch request
    const response = await fetch(`http://localhost:8000/product`, {
      method: "POST",
      credentials: "include",
      body: productFormData,
    });

    // Check if the response status indicates an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product");
    }

    // Parse and return the JSON response if successful
    const data = await response.json();
    return { data };
  } catch (error) {
    // Log and rethrow the error for the caller to handle
    console.error("Error creating product:", error.message);
    throw error;
  }
}

export function updateProduct(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8000/product/${formData.get("id")}`, // Get ID from FormData
        {
          method: "PATCH",
          credentials: "include",
          body: formData, // Send FormData directly
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise on error
    }
  });
}
