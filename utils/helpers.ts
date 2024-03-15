
export function hasAllRequiredFields(
  obj: { [key: string]: any },
  fields: Array<string>
) {
  return fields.every((field: string) => {
    return obj.hasOwnProperty(field);
  });
}

export async function handleAuthorization(token: string) {
  const authResponse = await $fetch("/api/users/auth", {
    method: "POST",
    body: {
      authorization: token,
    },
  });
  return {
    authorization: !Object.keys(authResponse).includes('errors'),
    authResponse,
  };
}

export const managerToken = {
  storageKey: "access_token",
  set(token: string) {
    localStorage.setItem(this.storageKey, token);
  },
  get() {
    return localStorage.getItem(this.storageKey) || '';
  },
  clear() {
    localStorage.removeItem(this.storageKey);
  },
};


export function priceFormat(price: string | number){
  return Number(price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

export function convertToBase64(file: any, callback: (base64: string)=> any) {
  const reader:any = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    const base64String = reader.result.split(',')[1];
    callback(base64String);
  };

  reader.onerror = function (error: string) {
    console.error('Error converting file to base64:', error);
  };
}