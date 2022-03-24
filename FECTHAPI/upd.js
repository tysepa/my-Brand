const addPostsForm = document.querySelector('.btn-success')
const postList = document.getElementById('posts');
const titleValue = document.getElementById('title')
const bodyValue = document.getElementById('post');
const imgUrl = document.getElementById('image') 
const btnsub = document.getElementById('btsuc');

const token ='bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkVwYSIsImVtYWlsIjoiZXBhQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NDc5NTQ0Njd9.ojNZrgY4HiUyyYJ1OY5RZog7LIdn7rqAbUIh6guJM70'


const url = 'http://localhost:5000/displ';
let output = '';

//get - read the post
//Method: Get


const renderPosts = (posts)=>{
    posts.forEach(post =>{
        output +=`
        <div class='part'>
           <div class='box' data-id='${post._id}'>
           <img src='${post.photo}' style ='height:250px;'>
           <p class='text'>${post.name} </p> <p class='card-text'>${post.tech}</p>
           <button class='btn btn-delet' id='delete_post'>Delete</button>
           <button class='btn btn-edit' id='edit_post'>Edit</button>
           </div></div></div>
        
        `;
    });
    postList.innerHTML = output;
    
}

 fetch(url, {
    method:'GET',
    headers:{
        'Authorization': 'bearer' + token,
    }
 })
   .then(res => res.json())
   .then(data => renderPosts(data));
    

   postList.addEventListener('click',async (e)=>{
       e.preventDefault();
       let deltBtnPress = e.target.id == 'delete_post';
       let editBtnPress = e.target.id ='edit_post';
    //    let id = e.target.parentElement.dataId.id;
    let id =e.target.parentElement.dataset.id;


       // Delete Method

       if(deltBtnPress){
           const response = await fetch('http://localhost:5000/displ/'+ id,{
               method:'DELETE',
               headers:{
                   'Content-Type': 'application/json',
                   'Authorization': 'bearer ' + token,
               },
               body: null
           });
          const data = await response.json()
          console.log(data);
       };
       if(editBtnPress){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.text').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
    //Update
    btnsub.addEventListener('click',async(e)=>{
        e.preventDefault();
        const image = imgUrl.value
        
       await fetch(`${url}/${id}`,{
            method: 'PATCH',
            headers:{
             'Content-Type':'application/json',
             'Authorization': 'bearer ' + token,
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value,
            })
        })
        .then(res => res.json())
        .then(()=> location.reload())
    })

       
   })


  


   //create - Insert new post
   //Method: Post
   addPostsForm.addEventListener('click', (e)=>{
       e.preventDefault();
       fetch(url, {
           method: 'POST',
           headers:{
               'Content-Type':'application/json',
               'Authorization': 'bearer' + token,
           },
           body: JSON.stringify({
               name: titleValue.value,
               tech:bodyValue.value,
               photo:imgUrl.value
           })
       })
       .then(res => res.json())
       .then(data => {
           const dataArr = [];
           dataArr.push(data);
           renderPosts(dataArr);
       })

       titleValue.value='';
       bodyValue.value ='';
       imgUrl.value='';
   })
    