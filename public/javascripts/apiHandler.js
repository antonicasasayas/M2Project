class APIHandler {
  

  getPosts() {
    return axios.get(`localhost:3000/private/feed`);
  }

  deletePosts(id) {
    return axios.delete(`${this.baseURL}/students/${id}`);
  }

  likeSeries(id) {
    return axios.post(`localhost:3000/private/recommendations`);
  }
}