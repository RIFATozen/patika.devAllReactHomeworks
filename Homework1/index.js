import axios from "axios";

export default async (user_id) => {
  try {
    const { data: user } = await axios(
      "https://jsonplaceholder.typicode.com/users/" + user_id
    );

    const { data: posts } = await axios(
      "https://jsonplaceholder.typicode.com/posts?userId=" + user_id
    );
    return { user, posts };
  } catch (e) {
    return e;
  }
};
