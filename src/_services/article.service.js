export const articleService = {
    fetchArticles,
    storeArticle,
    deleteArticle
  };
  

    async function fetchArticles() {

  let user = JSON.parse(localStorage.getItem('user'))
        return fetch("http://localhost:3000/articles", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.auth_token
            },
        }).then(handleResponse)
        .then((articles) => {
            return articles;
        });
    }

    async function storeArticle(title, description, body) {
        let user = JSON.parse(localStorage.getItem('user'))
        return fetch("http://localhost:3000/articles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.auth_token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                body: body,
            })
        }).then(handleResponse)
        .then((article) => {
            console.log(article)
            return article;
        });
    }

    async function deleteArticle(id) {
        let user = JSON.parse(localStorage.getItem('user'))
        return fetch("http://localhost:3000/articles/" + id, {
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