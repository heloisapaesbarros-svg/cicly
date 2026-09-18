function mostrarSenha(){

    let senha = document.getElementById("senha");
    
    if(senha.type === "password"){
    
    senha.type="text";
    
    }
    
    else{
    
    senha.type="password";
    
    }
    
    }
    
    
    
    function trocarTela(){
    
    document.getElementById("titulo").innerHTML="Criar sua conta";
    
    document.querySelector(".sub").innerHTML=
    "É rapidinho e você já pode aproveitar todas as vantagens!";
    
    
    document.querySelector(".btn").innerHTML=
    "Criar conta →";
    
    }