const preventBack=()=>{
    // e.preventDefault()
    window.history.forward()
};
setTimeout("preventBack()",0);
window.onunload = ()=>{
    null;

}
