// // 4 method 

// //method to list the blogs
// function listofblog(){
//   console.log("list of all the blogs"+"");
// }


// //method to add new post
// function addnewpost(){
//  console.log();
// }

// //method to view the post
// function viewpost(){
// console.log();
// }


// //method to edit the post
// function editpost(){
// console.log();
// }

// //method to delete the post
// function deletepost(){
//    console.log(); 
// }

//Get the button
mybutton=document.getElementById("myBtn");
window.onscroll=function()
{
    scrollFunction();
}

function scrollFunction(){
    if(document.body.scrollTop>20 || document.documentElement.scrollTop>20)
    {
        mybutton.style.display="block";

    }
    else{
        mybutton.style.display="none";
    }
}

function topFunction(){
document.body.scrollTop=0;
document.documentElement.scrollTop=0;
}



//email validate
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}


