
console.log('js added');

function submit(e){

    console.log("SUBMITTED??",e.target);
    // prompt("the file sumitted")
    alert("form is submitted successfullysss") 
}
document.querySelector('form').onsubmit=submit
document.querySelector('#reset').onclick=click
function click(e)
{
    
    console.log(e.target,"is clicked");
    if(!confirm("are you sure ?"))
    {
        e.preventDefault()
    }
}

