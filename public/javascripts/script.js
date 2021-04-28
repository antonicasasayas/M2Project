

window.onload = () => {
  const apiHandler = new APIHandler('http://localhost:3000');

  const like= document.querySelectorAll(".like")
  const buttons = document.querySelectorAll('.deletePost');//
  const container = document.querySelector('#posts');

  
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

// the selector will match all input controls of type :checkbox
// // and attach a click event handler 
// $("input:checkbox").on('click', function() {
//   // in the handler, 'this' refers to the box clicked on
//   var $box = $(this);
//   if ($box.is(":checked")) {
//     // the name of the box is retrieved using the .attr() method
//     // as it is assumed and expected to be immutable
//     var group = "input:checkbox[name='" + $box.attr("name") + "']";
//     // the checked state of the group/box on the other hand will change
//     // and the current value is retrieved using .prop() method
//     $(group).prop("checked", false);
//     $box.prop("checked", true);
//   } else {
//     $box.prop("checked", false);
//   }
// });
