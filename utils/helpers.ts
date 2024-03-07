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
  if ("errors" in authResponse) {
    return {
      authorization: false,
      authResponse,
    };
  } else {
    return {
      authorization: true,
      authResponse,
    };
  }
}
