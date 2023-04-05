export const getUsers = async (size) => {
  const res = await fetch(
    `https://random-data-api.com/api/users/random_user?size=${size}`
  );
  return res.json();
};
