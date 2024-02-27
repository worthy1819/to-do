let posts = JSON.parse(localStorage.getItem('posts')) || [];

    function savePostsToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function submitPost() {
        const postInput = document.getElementById('post-input');
        const postText = postInput.value.trim();

        if (postText === '') {
            alert('Please enter something to post.');
            return;
        }

        const newPost = {
            id: Date.now(),
            text: postText
        };

        posts.push(newPost);
        savePostsToLocalStorage();
        displayPosts();
        postInput.value = '';
    }

    function displayPosts() {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
            <p class="border-2 p-4 border-black">${post.text}</p>
            <div class="post-buttons flex gap-6 my-5">
                <button class="btn bg-yellow-500 text-white hover:text-yellow-500 px-10" onclick="editPost(${post.id})">Edit</button>
                <button class="btn bg-red-500 text-white hover:text-red-500 px-10" onclick="deletePost(${post.id})">Delete</button>
            </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function editPost(id) {
        const newText = prompt('Edit your post:');
        if (newText !== null) {
            const postToUpdate = posts.find(post => post.id === id);
            if (postToUpdate) {
                postToUpdate.text = newText;
                savePostsToLocalStorage();
                displayPosts();
            }
        }
    }

    function deletePost(id) {
        const confirmation = confirm('Are you sure you want to delete this post?');
        if (confirmation) {
            posts = posts.filter(post => post.id !== id);
            savePostsToLocalStorage();
            displayPosts();
        }
    }

    displayPosts();