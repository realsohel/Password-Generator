const lengthSlider = document.querySelector(".pass-length input");
const options =document.querySelectorAll(".option input");
const copy =document.querySelector(".input-box span");
const passinput = document.querySelector(".input-box input");
const passindicator = document.querySelector(".pass-indicator");

const generatebtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*<>_-~\|"
}

const generatepassword = ()=>{
    let pass ="";
    let passlength =lengthSlider.value;
    let excludedup = false;
    let  randpass =""
    options.forEach(option => {
        if(option.checked){
            // console.log(option);

            if(option.id!=="exc-dup" && option.id!=="spaces"){
                pass+= characters[option.id];
            }
            else if (option.id==="exc-dup"){
                pass+=`  ${pass}  `;
            }
            else{
                excludedup = true;
            }

        }
    });

    for (let i = 0; i < passlength; i++) {
        let randchar =pass[Math.floor(Math.random() * pass.length)];
        if(excludedup){
            !randpass.includes(randchar) || randchar == " " ? randpass +=randchar: i--;
        }
        else{
            randpass+=randchar;
        }
    }

    passinput.value = randpass;

}

const updateindicator =()=>{
    passindicator.id= lengthSlider.value<=8 ? "weak" : lengthSlider.value<=16 ? "medium" : "strong";
}

const updateSlider = ()=>{
    document.querySelector(".pass-length span").innerText= lengthSlider.value ;
    generatepassword();
    updateindicator();
}
updateSlider();

const copypass = () =>{
    navigator.clipboard.writeText(passinput.value);
    copy.innerText="check";
    setTimeout(() => {
    copy.innerText="copy_all";
    }, 1500);
}
copy.addEventListener("click" , copypass);
lengthSlider.addEventListener("input" , updateSlider);
generatebtn.addEventListener('click' , generatepassword);