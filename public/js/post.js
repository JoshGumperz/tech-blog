const editButton = $(".edit-btn")
const deleteButton = $(".delete-btn")
const viewReplies = $(".view-replies-btn")
const displayReplies = $(".reply-display")
const addReplies = $(".add-reply-btn")
const addRepliesInput = $(".new-reply-container")
const submitReplyButton = $("#submit-reply-btn")
let viewRepliesPressed = false
let addReplyPressed = false


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
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Post deleted',
            showConfirmButton: false,
            timer: 1500
        })
        document.location.replace('/');
    } else {
        await Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to delete post',
            showConfirmButton: false,
            timer: 1500
        })
    }
})

viewReplies.on("click", function() {
    viewRepliesPressed = !viewRepliesPressed
    if(viewRepliesPressed) {
        addRepliesInput.css("display", "none")
        displayReplies.css("display", "block")
        viewReplies.text("Hide Replies")
    } else {
        addRepliesInput.css("display", "none")
        displayReplies.css("display", "none")
        viewReplies.text("View Replies")  
    }

})

addReplies.on("click", function(){
    addReplyPressed = !addReplyPressed
    if(addReplyPressed) {
        displayReplies.css("display", "none")
        addRepliesInput.css("display", "flex")
        addReplies.text("Cancel")
    } else {
        addRepliesInput.css("display", "none")
        displayReplies.css("display", "none")
        addReplies.text("Reply")  
    }
})

function init() {
    displayReplies.css("display", "none")
    addRepliesInput.css("display", "none")
}

submitReplyButton.on("click", async function(event){
    event.preventDefault();
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
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Reply added',
                showConfirmButton: false,
                timer: 1500
            })  
            document.location.replace(`/post/${postId}`);
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error adding reply',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
})

init()