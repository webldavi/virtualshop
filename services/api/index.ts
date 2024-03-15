interface ProductOptions {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  stock: number;
}

export const managerUser = {
  async auth(token: string) {
    return handleAuthorization(token);
  },
  async login(credentials: { email: string; password: string }) {
    const response = await useFetch("/api/users/login", {
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return response.data.value
  },
  async me(token: string) {
    const response = await useFetch("/api/users/me", {
      method: "POST",
      body: {
        authorization: token,
      },
    });
    return response.data.value
  },
  logout(){
    managerToken.clear()
    navigateTo('/login')
  }
};

export const managerProduct = {
  async getAllProducts() {
    const response = await useFetch("/api/products")
    return response.data.value
    
  },
  async getUniqueProduct(id: string) {
    const response = await useFetch("/api/products/" + id);
    return response.data.value
  },
  async createProduct(token: string, productOptions: ProductOptions) {
    const response = await useFetch("/api/products/create", {
      method: "POST",
      body: {
        authorization: token,
        product: productOptions,
      },
    });
    return response.data.value
  },
  async deleteUniqueProduct(token: string, id: string) {
    const response = await useFetch("/api/products/delete/" + id, {
      method: "DELETE",
      body: {
        authorization: token,
      },
    });
    return response.data.value
  },
  async updateProduct(
    token: string,
    productOptions: ProductOptions,
    id: string
  ) {
    const response = await useFetch("/api/products/update/" + id, {
      method: "PUT",
      body: {
        authorization: token,
        product: productOptions,
      },
    });
    return response.data.value
  },
};
