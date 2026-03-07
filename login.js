function login(){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    let defaultEmail='admin';
    let defaultPassword='admin123'

    if(email == defaultEmail && password== defaultPassword){
        window.location.assign("home.html");
    }
    else{
        document.getElementById('my_modal_5').showModal();
    }

}