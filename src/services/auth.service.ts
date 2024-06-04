const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL;

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  await fetch(`${BACKEND_URL}/login/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((data) => data.json())
    .catch((error) => `Error: ${error.message}`);

export const validateUsername = async ({ username }: { username: string }) =>
  await fetch(`${BACKEND_URL}/users/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username }),
  })
    .then((data) => data.json())
    .catch((error) => `Error: ${error.message}`);
