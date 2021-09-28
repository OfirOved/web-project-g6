students_msg = [{
    name: 'גלי אביב',
    date: '06/09/2021',
    content: 'האם יש חדש לגבי מועד נוסף בחקב"צ?'
}, {
    name: 'אופיר עובד',
    date: '07/09/2021',
    content: 'מתי הבחירות לנציגי הועד?'
}, ]

function set_messages() {
    for (let i = 0; i < students_msg.length; i++) {
        let msg = students_msg[i];
        let div = document.createElement('div');
        let top_div = document.createElement('div');
        let bottom_div = document.createElement('div');
        let name_div = document.createElement('div');
        let date_div = document.createElement('div');
        let name = document.createElement('p');
        name.innerText = msg.name;
        let date = document.createElement('p');
        date.innerText = msg.date;
        top_div.style.display = 'flex';
        top_div.style.paddingBlock = '10px';
        top_div.style.paddingInline = '10px';
        top_div.style.backgroundColor = '#ffb004'
        bottom_div.style.backgroundColor = 'white'
        bottom_div.style.paddingBlock = '10px';
        bottom_div.style.paddingRight = '10px';
        name_div.style.width = '50%';
        date_div.style.width = '50%';
        date.style.float = 'left';
        let content = document.createElement('p');
        content.innerText = msg.content;
        div.style.marginBlock = '30px'
        div.style.width = '70%'
        div.style.marginInline = 'auto'
        let student_msg_div = document.getElementById('student_msg')
        name_div.appendChild(name);
        date_div.appendChild(date)
        top_div.appendChild(name_div);
        top_div.appendChild(date_div);
        bottom_div.appendChild(content);
        div.appendChild(top_div);
        div.appendChild(bottom_div);
        student_msg_div.appendChild(div)
    }
}

function setup_page() {
    set_user_name();
    set_messages()
}

function sendMessage() {
    alert("הודעה פורסמה בהצלחה!");
}