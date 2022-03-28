const postList = document.querySelector('.blog-content');
const addMess = document.querySelector('.form')
const btned = document.querySelector('.btn-edit')
const token ='bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZXBhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiS2lnYWxpIn0sImlhdCI6MTY0ODIzNTI3NX0.qCiuc1ZN_EAlHeRnvJlJlRa7A4_OI84EufrNVmNciuE'


const url = 'http://localhost:5000/displ';
let output = '';

//get - read the post
//Method: Get

const renderPosts = (posts)=>{
    posts.forEach(post =>{
        output +=`
        <div class='part'>
           <div class='box'>
           <img src='${post.photo}' style ='height:250px;'>
           <p class='text'>${post.name} </p> <p class='card-text'>${post.tech}</p>
           <button class='btn btn-edit' id='"+key+"'onclock='display-post(this.id)'>Read More</button>
           </div></div></div>
        
        `;
    });
    postList.innerHTML = output;
    
}

fetch(url, {
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization': 'bearer' + token,
    }
})
   .then(res => res.json())
   .then(data => renderPosts(data));
    