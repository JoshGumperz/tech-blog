const homeButton = $("#home-btn")
const newPostButton = $("#new-post-btn")
const posts = $("#post-title")

homeButton.on("click", function(event){
    document.location.replace("/")
})


posts.on("click", function(event){
    const postId = event.target
    console.log(postId)
    const id = postId.nextElementSibling.textContent
    document.location.replace(`/post/${id}`)
})

newPostButton.on("click", function(event){
    console.log(event)
    document.location.replace("/post")
})