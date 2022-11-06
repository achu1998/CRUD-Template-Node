$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!")
})

function loadFile(event){
    var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
}

$("#update_user").submit(function(event){
    $("#userImageUpdate").submit()
    event.preventDefault()

    var unindexed_array = $(this).serializeArray()
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var siteUrl = $(this).attr("site-url")
    var request = {
        "url" : siteUrl+`api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    setTimeout(function(){
        $.ajax(request).done(function(response){
            alert("Data Updated Successfully!")
            window.location.href = location.origin
        })
    },2000);

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var siteUrl = $(this).attr("site-url")

        var request = {
            "url" : siteUrl+`api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!")
                location.reload();
            })
        }

    })
}