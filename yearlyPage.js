function set_yearly_data() {
    console.log(current_year);
    // console.log(localStorage.getItem('current_year'));
    // console.log(document.getElementById('year_title'));
    document.getElementById('year_title').innerHTML = current_year.value
}

function setup_page() {
    set_user_name()
    set_yearly_data()
}