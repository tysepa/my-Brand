const log_out = document.getElementById('logout')

const logout =(e)=>{
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    location.href="./login.html";
}
log_out.addEventListener('click', logout);
