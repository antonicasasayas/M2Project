

window.onload = () => {
  const apiHandler = new APIHandler('http://localhost:3000');

  const like= document.querySelectorAll(".like")
  const buttons = document.querySelectorAll('.deletePost');//
  const container = document.querySelector('#posts');

  like.forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.target.children[0].innerHTML;
      apiHandler.likeSeries(id).then(() => {
        apiHandler.getSeries()
          .then(res => {
            container.innerHTML = "";
        })
    })
  })
})

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.children[0].innerHTML;
      apiHandler.deletePosts(id).then(() => {
        apiHandler.getPosts()
          .then(res => {
            container.innerHTML = '';
            res.data.forEach(post => {
              container.innerHTML += `
              <h3>${post.content}</h3>
              <h9>${post.date}</h9>
             
             <a href="/private/{{id}}/edit">Edit comment</a>
             <button class="deletePost" type="submit">Delete</button>
              `
            })
          })
      })
    })
  })
}
