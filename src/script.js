let posts = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

// Inicialização
window.onload = function() {
    loadPosts();
    displayPosts();

    document.getElementById('postForm').addEventListener('submit', addPost); 
    document.getElementById('postList').addEventListener('click', handlePostListClick);
};

// ---------- Funções Auxiliares ----------

// Função para lidar com cliques na lista de posts
function handlePostListClick(event) {
    const clickedElement = event.target.closest("button"); // garante que pega o botão
    if (!clickedElement) return;

    const action = clickedElement.dataset.action;
    const index = clickedElement.dataset.index;

    if (action === "edit") {
        editPost(index);
    } else if (action === "delete") {
        deletePost(index);
    }
}

// Função para salvar no LocalStorage
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}
// Função para carregar os posts do LocalStorage
function loadPosts() {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
}

// CREATE
function addPost(event) {
    event.preventDefault();
    
    const postText = document.getElementById('postText').value;
    const postPosition = document.getElementById('postPosition').value;
    const postImage = document.getElementById('postImage').value;
    const postDate = new Date().toLocaleString(); 

    const post = { 
        text: postText, 
        category: postPosition, 
        image: postImage, 
        date: postDate 
    };
    
    posts.unshift(post);
    savePosts(); // salva no localStorage
    
    document.getElementById('postForm').reset();
    displayPosts();
}

// READ
function displayPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach((pegaPost, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('card-post');
  
            postElement.innerHTML = `
                ${pegaPost.foto ? `<img src="${pegaPost.foto}" alt="Imagem do post" style="max-width:150px;">` : ""}
                <p><em>Nome: ${pegaPost.nome}</em></p>
                <p><em>Clube: ${pegaPost.clube}</em></p>
                <p><em>Posição: ${pegaPost.posicao}</em></p>
                <p><em>Gols: ${pegaPost.gols}</em></p>
                <p><em>Assistências: ${pegaPost.assistencias}</em></p>
                <p><em>Jogos: ${pegaPost.jogos}</em></p>
                <button data-action="edit" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button data-action="delete" data-index="${index}"><i class="fa-solid fa-eraser"></i> Apagar</button>
                <hr style="margin:30px;">`;
               
            postList.append(postElement);
        });
}

//UPDATE
function editPost(index) {
    const novoTexto = prompt("Editar post:", posts[index].text);
    if (novoTexto !== null) {
        posts[index].nome = novoTexto;
        savePosts();
        displayPosts();
    }
}
//DELETE
function deletePost(index) {
    const confirmar = confirm("Tem certeza que deseja apagar este post?");
    if (confirmar) {
        posts.splice(index, 1);
        savePosts();
        displayPosts();
    }
}