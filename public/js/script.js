const homeButton = document.querySelector("#home-btn")
const newPostButton = document.querySelector("#new-post-btn")
const posts = document.querySelector(".post-display")

console.log(newPostButton)

newPostButton.addEventListener("click", function(event){
    console.log(event)
    document.location.replace("/post")
})