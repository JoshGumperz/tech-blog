const loginButton = $(".login-btn")
const newPostButton = $("#new-post-btn")
const posts = $(".post-title-text")
const yourPosts = $(".your-posts-btn")
// toggle sidebar on and off
const sidebar = $("#sidebar")
const overlay = $("#sidebar-overlay")
const toggleSidebarOff = () => {
  sidebar.removeClass("sidebar-visible").addClass("sidebar-hidden").css("transition", "0.3s ease-in-out")
  overlay.css("display", "none")
}
const toggleSidebarOn = () => {
  sidebar.removeClass("sidebar-hidden").addClass("sidebar-visible").css("transition", "0.3s ease-in-out")
  overlay.css("display", "block")
}
$(".mobile-icon").click(toggleSidebarOn)
sidebar.click(toggleSidebarOff)
overlay.click(toggleSidebarOff)


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