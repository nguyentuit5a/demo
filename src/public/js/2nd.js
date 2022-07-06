let token = localStorage.getItem('token')
let domain = ``
if(token){
    let email =  localStorage.getItem('email')
    $(".mail").empty()
    $(".mail").append(email);
    setInterval(() => {
        token = localStorage.getItem('token')
        email =  localStorage.getItem('email')
        $.ajax({
            url: `${domain}/mailbox`,
            headers: {"Authorization": `Bearer ${token}`},
            success: function(response) { 
                let data = response.data
                console.log(data.length)
                if(data.length > 0){
                    let list = ''
                    for(let i = 0; i < data.length; i++){
                        if (i % 2 == 0){
                            list = list + '<div class="data-item even"><p class="">' +data[i].sender +'</p><p class="">'+data[i].subject+'</p><a href="/read/'+data[i]._id+'">Read</a></div>'
                        }
                        else{
                            list = list + '<div class="data-item"><p class="">' +data[i].sender +'</p><p class="">'+data[i].subject+'</p><a href="/read/'+data[i]._id+'">Read</a></div>'
                        }
                        
                    }
                    $(".data-mailbox").empty()
                    let fulldata = '<div class="data">' + list + '</div>'
                    $(".data-mailbox").append(fulldata);
                }
            }
        });
    }, 1000)
}
else{
    $.ajax({
        url: `${domain}/account`,
        success: function(response) { 
            $(".mail").empty()
            $(".mail").append(response.email);
            localStorage.setItem('token', response.token)
            localStorage.setItem('email', response.email)
        }
    });
} 

$(".realtime").click(function() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    $.get(`${domain}/account`, function( data ) {
    $(".mail").empty()
    $(".mail").append(data.email);
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    $(".data-mailbox").empty()

        var empty = `
            <div class=" inbox-empty-msg">
                <svg width="92" height="94" viewBox="0 0 92 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 54.37V38.9C26.003 37.125 26.9469 35.4846 28.48 34.59L43.48 25.84C45.027 24.9468 46.933 24.9468 48.48 25.84L63.48 34.59C65.0285 35.4745 65.9887 37.1167 66 38.9V54.37C66 57.1314 63.7614 59.37 61 59.37H31C28.2386 59.37 26 57.1314 26 54.37Z" fill="#8C92A5"></path>
                    <path d="M46 47.7L26.68 36.39C26.2325 37.1579 25.9978 38.0312 26 38.92V54.37C26 57.1314 28.2386 59.37 31 59.37H61C63.7614 59.37 66 57.1314 66 54.37V38.9C66.0022 38.0112 65.7675 37.1379 65.32 36.37L46 47.7Z" fill="#CDCDD8"></path>
                    <path d="M27.8999 58.27C28.7796 58.9758 29.8721 59.3634 30.9999 59.37H60.9999C63.7613 59.37 65.9999 57.1314 65.9999 54.37V38.9C65.9992 38.0287 65.768 37.1731 65.3299 36.42L27.8999 58.27Z" fill="#E5E5F0"></path>
                    <path class="emptyInboxRotation" d="M77.8202 29.21L89.5402 25.21C89.9645 25.0678 90.4327 25.1942 90.7277 25.5307C91.0227 25.8673 91.0868 26.348 90.8902 26.75L87.0002 34.62C86.8709 34.8874 86.6407 35.0924 86.3602 35.19C86.0798 35.2806 85.7751 35.2591 85.5102 35.13L77.6502 31.26C77.2436 31.0643 76.9978 30.6401 77.0302 30.19C77.0677 29.7323 77.3808 29.3438 77.8202 29.21Z" fill="#E5E5F0"></path>
                    <path class="emptyInboxRotation" d="M5.12012 40.75C6.36707 20.9791 21.5719 4.92744 41.2463 2.61179C60.9207 0.296147 79.4368 12.3789 85.2401 31.32" stroke="#E5E5F0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path class="emptyInboxRotation" d="M14.18 57.79L2.46001 61.79C2.03313 61.9358 1.56046 61.8088 1.2642 61.4686C0.967927 61.1284 0.906981 60.6428 1.11001 60.24L5.00001 52.38C5.12933 52.1127 5.35954 51.9076 5.64001 51.81C5.92044 51.7194 6.22508 51.7409 6.49001 51.87L14.35 55.74C14.7224 55.9522 14.9394 56.36 14.9073 56.7874C14.8753 57.2149 14.5999 57.5857 14.2 57.74L14.18 57.79Z" fill="#E5E5F0"></path>
                    <path class="emptyInboxRotation" d="M86.9998 45.8C85.9593 65.5282 70.9982 81.709 51.4118 84.2894C31.8254 86.8697 13.1841 75.1156 7.06982 56.33" stroke="#E5E5F0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <p class="emptyInboxTitle">Your inbox is empty                    </p>
                    <p>Waiting for incoming emails                    </p>
            </div>
        `;
    $(".data-mailbox").append(empty);
    });
});
$(".mail").click(function() {
navigator.clipboard.writeText($('.mail').html())
});