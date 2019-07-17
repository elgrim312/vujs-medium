export const commentService = {
  fetchComments,
  storeComment,
  deleteComment
};


async function fetchComments(articleId) {
  let user = JSON.parse(localStorage.getItem('user'))
  return fetch("http://localhost:3000/articles/"+articleId+"/comment", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.auth_token
    },
  }).then(handleResponse)
    .then((comments) => {
      return comments;
    });
}

async function storeComment(content, articleId) {
  let user = JSON.parse(localStorage.getItem('user'))
  return fetch("http://localhost:3000/comment", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.auth_token
    },
    body: JSON.stringify({
      content: content,
      article_id: articleId
    })
  }).then(handleResponse)
    .then((comment) => {
      return comment;
    });
}

async function deleteComment(id) {
  let user = JSON.parse(localStorage.getItem('user'))
  return fetch("http://localhost:3000/comment/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.auth_token
    }
  })
}

function handleResponse(response) {
  return response.text()
    .then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
        }
      }

      return data;
    });
}
