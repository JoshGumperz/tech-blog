const editButton = $(".edit-btn")
const deleteButton = $(".delete-btn")
const viewReplies = $(".view-replies-btn")
const displayReplies = $(".reply-container")
const addReplies = $(".add-reply-btn")
const addRepliesInput = $(".new-reply-container")
const submitButton = $("#submit-reply-btn")


editButton.on("click", function(){
    const id = $(this).closest('section').attr('id')
    console.log(id)
    document.location.replace(`/post/editform/${id}`)
})

deleteButton.on("click", async function(){
    const id = $(this).closest('section').attr('id')
    console.log(id)
    const response = await fetch(`/post/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete post.')
    }
})

viewReplies.on("click", function() { 
    addRepliesInput.css("display", "none")
    displayReplies.css("display", "initial")
})

addReplies.on("click", function(){
    displayReplies.css("display", "none")
    addRepliesInput.css("display", "flex")
})

function init() {
    displayReplies.css("display", "none")
    addRepliesInput.css("display", "none")
}

submitButton.on("click", async function(){
    const text = $(".add-reply-text").val()
    const postId = $(this).closest('section').attr('id')
    console.log(text)
    console.log(postId)

    if(text, postId) {
        const response = await fetch('/post/replies', {
            method: 'POST',
            body: JSON.stringify({ text, postId }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Failed to add reply.');
        }
    }
})

init()