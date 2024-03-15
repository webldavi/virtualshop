import { defineStore } from "pinia";
import { managerUser } from "~/services/api";
import { managerToken } from "~/utils/helpers";

export const useUserStore = defineStore('user', {
  state: ()=>({
    me: {
      name: '',
      email: '',
    }
  }),
  actions: {
    async getMe(){
      const token = managerToken.get()
      managerUser.me(`token ${token}`).then(async response=>{
        this.setMe(response)
      })
    },
    logout(){
      managerToken.clear()
      navigateTo('/login')
    },
    setMe(value: any){
      this.me = value
    }
  }
}) 