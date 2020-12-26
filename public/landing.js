async function main(){
    
    const userData = await fetch("/userDetails")
    debugger
    const userDataJson = await userData.json()
    if(userData.status!=200){ window.location.href="/logout"}

    

    
    document.getElementById("userName").innerText=userDataJson.usermail
    if(userDataJson.usertype=='admin'){document.getElementById("newPostButon").classList.remove("d-none")}


}

async function loadPosts(){

    const postData = await fetch("/allPosts")
    const postDataJson = await postData.json()

    for(let i=0;i<postDataJson.length;i++)
    {
        let main = document.createElement("DIV");
        main.classList.add("card","mt-4","mb-4")
        let header = document.createElement("DIV");
        header.classList.add("card-header");
        header.innerText=postDataJson[i].title;
        main.appendChild(header)
        let body = document.createElement("div")
        body.classList.add("card-body")
        let block=document.createElement("blockquote")
        block.classList.add("blockquote","mb-0")
        let para =document.createElement("p")
        para.innerText=postDataJson[i].description;
        let foot = document.createElement("footer")
        foot.classList.add("blockquote-footer")
        foot.innerText=postDataJson[i].usermail;
        block.appendChild(para)
        block.appendChild(foot)
        body.appendChild(block)
        main.appendChild(body)
        document.getElementById("postsMain").appendChild(main)
    }

}


function DangerAlert(text){

    document.querySelector(".alert-danger").classList.remove("d-none")
    document.querySelector(".alert-danger").innerText=text
    setTimeout(()=> document.querySelector(".alert-danger").classList.add("d-none"),1500)
}
function SuccessAlert(text){

    document.querySelector(".alert-success").classList.remove("d-none")
    document.querySelector(".alert-success").innerText=text
    setTimeout(()=> document.querySelector(".alert-success").classList.add("d-none"),1500)
}



main()
loadPosts()

document.getElementById("newURLform").addEventListener("submit",async(e)=>{
    e.preventDefault()

    let body={
        title:e.target.title.value,
        description:e.target.description.value
    }

    document.getElementById("spinner").classList.remove('d-none')
    let req = await fetch("/addNewPost",{method:"POST",headers:{
    'Content-Type': 'application/json'

},body:JSON.stringify(body)})
document.getElementById("spinner").classList.add('d-none')
if(req.status==200){SuccessAlert("Successfully Added!");$('#exampleModal').modal('hide');main();return;}

let reqJson=await req.json();
DangerAlert(reqJson.reason)


})