


let social_color = {
    Instagram: '#cd486b',
    Facebook: '#526fa4',
    Twitter: '#14171A',
    GitHub: '#24292e'
}


function dropdownHandler(new_div, link_button) {

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
                    if (selected_option_text === "Twitter") {
                        selected_option_icon = "x-" + selected_option_text.toLowerCase()
                    }
                    else {
                        selected_option_icon = selected_option_text.toLowerCase()
                    }

                    link_button.querySelector('.icon').innerHTML = `<i
                    class="fa-brands fa-${selected_option_icon}"></i>${selected_option_text}</span>`
               
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
        new_div_inputBox.addEventListener('change', (e) => {
            let linkValue = e.target.value;
            link_button.querySelector('a').href = linkValue;
        });

        LinkWrapper.appendChild(new_div)
        dropdownHandler(new_div, link_button);
    });

}


function linkButtonHandler() {
    let linkButtonBox = document.querySelector('.linkBoxWrapper');
    let newLinkButton = document.createElement('li');
    newLinkButton.classList.add('link_icons');
    newLinkButton.innerHTML = `<a href="#" target = "_blank"><span class="icon"><i class="fa-brands fa-bandcamp"></i>Social Media</span><span class="arrow"><i
    class="fa-solid fa-arrow-right"></i></span></a>`
    linkButtonBox.appendChild(newLinkButton);
    return newLinkButton

}
function profileDetailsHandler() {
    let offset = document.querySelector('.user_profile_setting').offsetWidth


    document.querySelector('.user_profile_setting').style.left = 0 + 'px'
}

function LinksHandler() {
    let offset = document.querySelector('.user_profile_setting').offsetWidth
    document.querySelector('.user_profile_setting').style.left = offset + 50 + 'px'

}

function linkSettingsHandler() {

    let offset = document.querySelector('.user_profile_setting').offsetWidth
    document.querySelector('.user_profile_setting').style.left = offset + 50 + 'px'



    let profileDetails = document.getElementById("profile_details");
    let links = document.getElementById("links");
    profileDetails.addEventListener('click', profileDetailsHandler);
    links.addEventListener('click', LinksHandler);
}



function readFileAsDataURL(reader, file) {
    return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function profilePicHandler() {
    let imageUploadBtn = document.querySelector('.uploader')
    var uploadBtn = document.getElementById('upload_profile')
    uploadBtn.addEventListener('change', async (e) => {
        let image = e.target.files[0];

        if (image) {
            // Create a FileReader
            let reader = new FileReader();

            const dataURL = await readFileAsDataURL(reader, image);
            let profileFields = document.querySelectorAll('.profile_pic');
            profileFields.forEach((profileField) => {
                profileField.src = dataURL;
            })

        }


    });
    imageUploadBtn.addEventListener('click', () => {

        uploadBtn.click();
    })


}

function emailFieldHandler() {
    let email = document.querySelector('#email');

    email.addEventListener('keydown', () => {
        let nameChange = document.querySelector('.profileInfo p');
        nameChange.textContent = email.value;
    })

    email.addEventListener('change', () => {
        let nameChange = document.querySelector('.profileInfo p');
        nameChange.textContent = email.value;
    })

}

function nameFieldHandler() {
    let name = document.getElementById('name');
    name.addEventListener('keydown', () => {
        let nameChange = document.querySelector('.profileInfo h3');
        nameChange.textContent = name.value;
    })

    name.addEventListener('change', () => {
        let nameChange = document.querySelector('.profileInfo h3');
        nameChange.textContent = name.value;
    })
}

async function updateProfileDetailsIntoDB() {
    let profile_pic = document.querySelector('.imagebox .profile').src;
    let name = document.querySelector('.profileInfo h3').textContent;
    let email = document.querySelector('.profileInfo p').textContent;
  
    let links = document.querySelectorAll('.linkBoxWrapper li')
    let linksObject = {};
    links.forEach((link) => {
        let value = link.querySelector('a').href;
        let key = link.querySelector('.icon').textContent
        let backgroundColor = link.style.backgroundColor;
        let icon = link.querySelector('.icon i').classList[1]
        linksObject[key] = { href: value, icon: icon, background: backgroundColor }
    })
    let dataObject = { name: name, email: email, profile_pic: profile_pic, social_handlers: linksObject }

    let respone = await fetch('/create_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject)
    })
    let responeData = await respone.json()
    let status = await responeData.status
    if (status === 200) {
        let url = await responeData.url;
        let set_url = document.querySelector('.sharelink_wrapper a')
        let show_url = document.getElementById('shareLink')

        set_url.href = url;
        show_url.textContent = url
        let preview = document.getElementById('preview');
        preview.href = set_url;
        preview.style.display = 'flex';
        document.querySelector('.share_link').style.display = 'flex';
        let copyBtn = document.querySelector('#copy')
        copyBtn.addEventListener('click', () => {
            let textarea = document.createElement('textarea')
            textarea.value = show_url.textContent;
            document.body.appendChild(textarea)
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });




    }
}

emailFieldHandler()
nameFieldHandler();
link_box_handler()
linkSettingsHandler()
profilePicHandler()
document.querySelector('.nextBtn').addEventListener('click', profileDetailsHandler);
document.querySelector('.saveBtn').addEventListener('click', updateProfileDetailsIntoDB);


