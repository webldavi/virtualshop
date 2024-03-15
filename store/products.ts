import { defineStore } from "pinia";
import { managerProduct, managerUser } from "~/services/api";
import { managerToken } from "~/utils/helpers";

export const useProductsStore = defineStore('products', {
  state: ()=>({
    data: []
  }),
  actions: {
    async getAllProducts(){
      const products = await managerProduct.getAllProducts()
      this.setProducts(products)
    },
    setProducts(value: any){
      this.data = value
    }
  }
}) 