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
    $fetch("/api/users/login", {
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  },
};

export const managerProduct = {
  async getAllProducts() {
    return $fetch("/api/products");
  },
  async getUniqueProduct(id: string) {
    return $fetch("/api/products/" + id);
  },
  async createProduct(token: string, productOptions: ProductOptions) {
    return $fetch("/api/products/create", {
      method: "POST",
      body: {
        authorization: token,
        product: productOptions,
      },
    });
  },
  async deleteUniqueProduct(token: string, id: string){
    return $fetch('/api/products/delete/' + id,{
      method: "DELETE",
      body: {
        authorization: token
      }
    })
  },
  async updateProduct(token: string, productOptions: ProductOptions, id: string) {
    return $fetch("/api/products/update/" + id, {
      method: "PUT",
      body: {
        authorization: token,
        product: productOptions,
      },
    });
  },
};
