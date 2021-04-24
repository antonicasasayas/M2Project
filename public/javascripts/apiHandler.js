class APIHandler {
  

  getPosts() {
    return axios.get(`localhost:3000/private/feed`);
  }

  deletePosts(id) {
    return axios.delete(`${this.baseURL}/students/${id}`);
  }

}