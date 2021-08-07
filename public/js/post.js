const homeButton = $("#home-btn")
const editButton = $(".edit-btn")
const deleteButton = $(".delete-btn")

homeButton.on("click", function(event){
    document.location.replace("/")
})

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

