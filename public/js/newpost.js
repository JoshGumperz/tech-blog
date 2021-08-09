const homeButton = $("#home-btn")
const submitPostButton = $("#submit-post-btn")
const submitEditButton = $("#submit-edit-btn")

homeButton.on("click", function (event) {
    document.location.replace("/")
})

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = $("#new-post-title").val()
    const text = $("#new-post-text").val()

    if (title && text) {
        const response = await fetch('/post', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Post added',
                showConfirmButton: false,
                timer: 1500
            })
            document.location.replace('/');
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Failed to post',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

submitPostButton.on("click", newPostFormHandler)
submitEditButton.on("click", async function(event) {
    event.preventDefault();
    const title = $("#new-post-title").val()
    const text = $("#new-post-text").val()
    const id = $(this).closest('section').attr('id')
    if (title && text) {
        const response = await fetch(`/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Post edited',
                showConfirmButton: false,
                timer: 1500
            })
            document.location.replace('/');
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Failed to edit post',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
})