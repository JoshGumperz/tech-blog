const loginButton = $("#login")
const newPostButton = $("#new-post-btn")
const posts = $(".post-title-text")


posts.on("click", function(event){
    const postId = event.target
    console.log(postId)
    const id = postId.nextElementSibling.textContent
    document.location.replace(`/post/${id}`)
})

loginButton.on("click", function(event){
    document.location.replace("/api/login")
})

newPostButton.on("click", function(event){
    console.log(event)
    document.location.replace("/post")
})