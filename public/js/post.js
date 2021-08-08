const editButton = $(".edit-btn")
const deleteButton = $(".delete-btn")
const viewReplies = $(".view-replies-btn")
const displayReplies = $(".reply-container")
const addReplies = $(".add-reply-btn")
const addRepliesInput = $(".new-reply-container")


editButton.on("click", function(){
    const id = $(this).closest('div').attr('id')
    document.location.replace(`/post/editform/${id}`)
})

deleteButton.on("click", async function(){
    const id = $(this).closest('div').attr('id')
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

init()