const homeButton = $("#home-btn")
const newPost = $(".new-post")
const editPost = $(".edit-post")

homeButton.on("click", function(event){
    document.location.replace("/")
})

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = $("#new-post-title").val()
    const text = $("#new-post-text").val()
    console.log(title)
    console.log(text)

    if(title && text) {
        const response = await fetch('/post', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to Post.');
        }
    }
}

const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = $("#new-post-title").val()
    const text = $("#new-post-text").val()
    console.log(title)
    console.log(text)
    const id = $(this).parent('form').attr('id')

    if(title && text) {
        const response = await fetch(`/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to edit post.');
        }
    }
}

newPost.on("submit", newPostFormHandler)
editPost.on("submit", newPostFormHandler)