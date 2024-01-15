


let social_color = {
    Instagram: '#cd486b',
    Facebook: '#526fa4',
    Twitter: '#14171A',
    GitHub: '#24292e'
}


function dropdownHandler(new_div,link_button) {

    let select_wrapper = new_div.querySelectorAll(".select_wrapper");
    select_wrapper.forEach((select_wrapper_item) => {
        let select = select_wrapper_item.querySelector(".select");

        select.addEventListener("click", () => {
            let select_options = select_wrapper_item.querySelector("ul");
            arrow = select.querySelector(".arrow");
            arrow.classList.toggle("arrow_rotate");

            select_options.classList.toggle('show');

            let options = select_wrapper_item.querySelectorAll(".option");
            options.forEach((option) => {
                option.addEventListener("click", () => {
                    let select2 = select.querySelector("span");
                    select2.innerHTML = option.innerHTML;
                    let selected_option_text = option.textContent;
                    let selected_option_icon
                    if(selected_option_text === "Twitter"){
                       selected_option_icon = "x-" + selected_option_text.toLowerCase()
                    }
                    else{
                        selected_option_icon = selected_option_text.toLowerCase()
                    }

                    link_button.querySelector('.icon').innerHTML = `<i
                    class="fa-brands fa-${selected_option_icon}"></i>${selected_option_text}</span>`
                    console.log(social_color[selected_option_text])
                    link_button.style.backgroundColor = `${social_color[selected_option_text]}`;
                    select_options.classList.remove('show');
                    arrow.classList.remove("arrow_rotate");
                });
            })
        })


    });
}


function link_box_handler() {
    addLink = document.querySelector("#addLink")
    LinkWrapper = document.querySelector(".links");
    addLink.addEventListener("click", () => {
        let link_button = linkButtonHandler()
        // dropdownHandler2()
        html_template = `
    <div class="link_heading">
        <p>Link #1</p>
        <p class= "remove" >Remove</p>
    </div>
    <label>Platform</label>
    <div class="select_wrapper">
        <div class="select form-control"><span>Select Social Links</span><span class="arrow"><i class="fa-solid fa-chevron-down"></i></span></div>
        <ul>
            <li class="option"><span><i class="fa-brands fa-github"></i></span>GitHub</li>
            <li class="option"><span><i class="fa-brands fa-facebook"></i></span>Facebook</li>
            <li class="option"><span><i class="fa-brands fa-x-twitter"></i></span>Twitter</li>
            <li class="option"><span><i class="fa-brands fa-instagram"></i></span>Instagram</li>
        </ul>
    </div>
    <label >Link</label>
    <div class="link_icon">
        <span><i class="fa-solid fa-link"></i></span>
        <input type="text" class="form-control">
    </div>
    
`
        let new_div = document.createElement('div')
        new_div.classList.add('link')
        new_div.innerHTML = html_template;
        remove_element = new_div.querySelector(".remove")
        remove_element.addEventListener('click', () => {
            new_div.remove();
            link_button.remove();
        });
        let new_div_inputBox = new_div.querySelector(".link_icon input");
        new_div_inputBox.addEventListener('change',(e) =>{
            let linkValue = e.target.value;
            link_button.querySelector('a').href = linkValue;
        });

        LinkWrapper.appendChild(new_div)
        dropdownHandler(new_div,link_button);
    });

}


function linkButtonHandler(){
    let linkButtonBox = document.querySelector('.linkBoxWrapper');
    let newLinkButton = document.createElement('li');
    newLinkButton.classList.add('link_icons');
    newLinkButton.innerHTML = `<a href="#" target = "_blank"><span class="icon"><i class="fa-brands fa-bandcamp"></i>Social Media</span><span class="arrow"><i
    class="fa-solid fa-arrow-right"></i></span></a>`
    linkButtonBox.appendChild(newLinkButton);
    return newLinkButton

}


link_box_handler()