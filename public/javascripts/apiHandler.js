class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getPosts() {
    return axios.get(`localhost:3000/private/feed-json`);
  }

  deletePosts(id) {
    return axios.delete(`${this.baseURL}/students/${id}`);
  }

  
}