let token = localStorage.getItem('token')
let domain = ``

if(token){
    let email =  localStorage.getItem('email')
    $(".mail").empty()
    $(".mail").append(email);
    let current = window.location.href
    let id = /[a-z0-9]{10,}/.exec(current)[0]
    $.ajax({
        url: `${domain}/message/${id}`,
        headers: {"Authorization": `Bearer ${token}`},
        success: function(response) { 
            let data = response.data
            console.log(data)
            $('#from').text(data.from)
            $('#name').text(data.name)
            $('#time').text(data.time)
            $('#subject').text(data.subject)
            $('.html').append(data.html)
        }
    });
}
else{
    window.location = '/'
}

$(".realtime").click(function() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    $.get(`${domain}/account`, function( data ) {
    $(".mail").empty()
    $(".mail").append(data.email);
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    window.location = '/'
    });
});
$(".mail").click(function() {
navigator.clipboard.writeText($('.mail').html())
});