var users = [
{
    id:1,
    name: 'tài'
},
{
    id:2,
    name:'trung'
},
{
    id:3,
    name:'luân'
}
]
var comments = [
    {
        id:1,
        user_id:1,
        content:"alo anh ey"
    },
    {
        id:2,
        user_id:2,
        content:"đi chơi không"
    },
    {
        id:3,
        user_id:3,
        content:"chơi đâu thế anh"
    },
    {
        id:2,
        user_id:2,
        content:"đi hạ long không"
    },
    {
        id:3,
        user_id:3,
        content:"uầy,ảo thật đấy"
    },
    {
        id:2,
        user_id:1,
        content:"duyệt đi hồ chí minh"
    }
    
]
function getcommen() {
    return new Promise(function(thanhcong) {
        setTimeout(() => {
            thanhcong(comments)
        }, 1000);
    })
}
function get_user(get_userid) {
var reruls = users.filter(function(y) {
return get_userid.includes(y.id)
})
return new Promise(function(thanhcong) {
    setTimeout(() => {
        thanhcong(reruls)
    }, 1000);
})
}
getcommen()
.then(function(comments) {
    var get_userid = comments.map(function(x) {
        return x.user_id
    })
    return get_user(get_userid)
    .then(function(user) {
        return {
            user: user,
            comments:comments
        }
    })
})
.then(function(data) {
    var html = ''
    var hienthi = document.querySelector('.test')
    data.comments.forEach(e => {
        var ketqua = data.user.find(function(e2) {
            return e2.id === e.user_id
        })
        html += `<li>${ketqua.name}: ${e.content}</li>`
    });
    hienthi.innerHTML = html
})

var list_course = 'http://localhost:3000/khoa_hoc';
var list_gia = 'http://localhost:3000/gia_sach';
var courseBlock = document.querySelector('.bank');
var btnCreate = document.querySelector('.create')
function start() {
    getcourse(render)
    createForm()
}
function getcourse(callback) {
    fetch(list_course)
    .then(function(reponse) {
        return reponse.json()
    })
    .then(callback)
}
function render(coures) {
    var htmls = coures.map(function(e) {
        return `<li class = "coure-${e.id}">
        <h1>${e.name}</h1>
        <p>${e.mota}</p>
        <button onclick = deleteCoure(${e.id})>xoá</button>
        <button onclick = updateForm(${e.id})>sửa</button>
        </li>`
    })
    courseBlock.innerHTML = htmls.join('')
}
function createCoure(data) {
    var option = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(list_course, option)
    .then(function(reponse) {
        return reponse.json()
    })
    .then(function(reponse) {
        var html2 = `<li class = "coure-${reponse.id}">
        <h1>${reponse.name}</h1>
        <p>${reponse.mota}</p>
        <button onclick = deleteCoure(${reponse.id})>xoá</button>
        <button onclick = updateForm(${reponse.id})>sửa</button>
        </li>`
        courseBlock.insertAdjacentHTML('beforeend', html2)
    })
}
function createForm() {
     btnCreate.onclick = function() {
        var name = document.querySelector('input[name = "name"]').value
        var mota = document.querySelector('input[name = "mota"]').value
        if(name != '' && mota != '') {
            var form = {
                name: name,
                mota: mota
            }  
            createCoure(form)
            document.querySelector('input[name = "name"]').value = ''
            document.querySelector('input[name = "mota"]').value = ''
        }else {
            console.log(alert('vui lòng điền đầy đủ thông tin'))
        }
       
    }  
}
function deleteCoure(id) {
    var option = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(list_course + '/' + id, option)
    .then(function(reponse) {
        return reponse.json()
    })
    .then(function() {
         var deletecoure =  document.querySelector('.coure-' + id)
         if(deleteCoure) {
             deletecoure.remove()
         }
    })
}
function updateCoure(id, data, callback) {
    var option = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(list_course + '/' + id, option)
    .then(function(reponse) {
        return reponse.json()
    })
    .then(callback)
}
function updateForm(id) {
    fetch(list_course + '/' + id)
    .then(function(reponse) {
        return reponse.json()
    })
    .then(function(reponse) {
        document.querySelector('input[name = "name"]').value = reponse.name
        document.querySelector('input[name = "mota"]').value = reponse.mota
        var save = document.querySelector('.save')
        save.style.display = 'block'
        btnCreate.style.display = 'none'
        save.onclick = function() {
            var name = document.querySelector('input[name = "name"]').value 
            var mota = document.querySelector('input[name = "mota"]').value 
            var form = {
                name: name,
                mota: mota
            }
            if(name != '' && mota != '') {
                updateCoure(id, form, function() {
                    getcourse(render)
                })
            } else {
                console.log(alert('Thông tin sửa đổi sai cấu trúc,vui lòng điền lại'))
            }
            save.style.display = 'none'
            btnCreate.style.display = 'block'
            document.querySelector('input[name = "name"]').value = ''
            document.querySelector('input[name = "mota"]').value = ''

        }
    })
}
start()
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var tabs = $$('.tab_item')
var panes = $$('.tab-pane')
var line = $('.line')
tabs.forEach(function(tab, index) {
    var pane = panes[index]
    tab.onclick = function() {
        $('.tab_item.active').classList.toggle('active')
        this.classList.add('active')  
        $('.tab-pane.active').classList.toggle('active')
        pane.classList.add('active')    
        line.style.marginLeft = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'
    }
})
