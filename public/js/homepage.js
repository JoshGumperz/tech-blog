const loginButton = $(".login-btn")
const newPostButton = $("#new-post-btn")
const posts = $(".post-title-text")
const yourPosts = $(".your-posts-btn")
// const homeButton = $("#home-btn")

// toggle sidebar on and off
const sidebar = $("#sidebar")
const toggleSidebarOff = () => {
  sidebar.removeClass("sidebar").addClass("sidebar-hidden")
}
const toggleSidebarOn = () => {
  sidebar.removeClass("sidebar-hidden").addClass("sidebar")
}
$(".mobile-icon").click(toggleSidebarOn)
sidebar.click(toggleSidebarOff)

// homeButton.on("click", function(event){
//     document.location.replace("/")
// })


yourPosts.on("click", function(){
    document.location.replace("/post/userposts")
})

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