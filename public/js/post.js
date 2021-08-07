const homeButton = $("#home-btn")
const editBtn = $(".edit-btn")

homeButton.on("click", function(event){
    document.location.replace("/")
})

editBtn.on("click", function(){
    const id = $(this).parent('div').attr('id')
    document.location.replace(`/post/editform/${id}`)
})

