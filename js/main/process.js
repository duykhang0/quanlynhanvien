//import { requiredValidate,lenghtValidate,kiemTraChuoiChuCai,dinhDangEmail,dinhDangMatkhau ,kiemTraLuongCB,kiemTraGioLam} from "./validate.js";

const peoples = [
    {
        tknv: "122a",
        name: "Nguyễn Duy Khang",
        email: "duykhang@gmail.com",
        password: '123456',
        datepicker: '01/01/2024',
        luongCB: "3100000",
        chucvu: "Sếp",
        gioLam: 80,
        tongLuong: 6000000,
        loaiNhanVien: "Khá"
    },
    {
        tknv: "123a",
        name: "Nguyễn Duy B",
        email: "b@gmail.com",
        password: '123456',
        datepicker: '01/01/2024',
        luongCB: "3100000",
        chucvu: "Sếp",
        gioLam: 161,
        tongLuong: 6000000,
        loaiNhanVien: "Khá"
    },
]

// tinh luong nhan vien
const tinhLuongNhanVien = (chucVu,luongCB) => {
    let tongLuong = 0;
    switch(chucVu) {
        case "Sếp":
          tongLuong = luongCB * 3;
          break;
        case "Trưởng phòng":
            tongLuong = luongCB * 2;
          break;
        case "Nhân viên":
            tongLuong = luongCB * 1;
        break;
        default:
          // code block
      }
      return tongLuong.toLocaleString('vi-VN',{style:"currency",currency: "VND"})
}
// Xếp loại nhân viên
const xepLoaiNV = (gioLam) => {
    let loaiNhanVien = "";
    if(gioLam >= 192){
        loaiNhanVien = "Xuất sắc"
    }else if(gioLam < 192 && gioLam >= 176){
        loaiNhanVien = "Giỏi"
    }else if(gioLam < 176 && gioLam >= 160){
        loaiNhanVien = "Khá"
    }else{
        loaiNhanVien = "Trung Bình"
    }
    return loaiNhanVien;
}

const render = (peoples) => {
    let htmlString = "";
    for (let people of peoples){
        htmlString += `
                        <tr>
                            <td>${people.tknv}</td>
                            <td>${people.name}</td>
                            <td>${people.email}</td>
                            <td>${people.datepicker}</td>
                            <td>${people.chucvu}</td>
                            <td>${tinhLuongNhanVien(people.chucvu,people.luongCB)}</td>
                            <td>${xepLoaiNV(people.gioLam)}</td>
                            <td>
                                
                               <div class="d-flex">
                                    <button class="btn btn-danger" onclick="xoaNhanVien('${
                                    people.tknv
                                    }')">Xóa</button>
                                     <button class="btn btn-success" onclick="renderInfoSua('${
                                    people.tknv
                                    }')" data-toggle="modal" data-target="#myModal">Sửa</button>
                                </div>
                            </td>

                        </tr>
        `
    }
    document.querySelector("#tableDanhSach").innerHTML = htmlString;
    
    
}


// Xóa nhân viên
function xoaNhanVien(tknv){
    const index = peoples.findIndex(person => person.tknv === tknv);
    if (index !== -1) {
        // Nếu tìm thấy, xóa phần tử tại index đó
        peoples.splice(index, 1);
        console.log(`Đã xóa nhân viên có mã số ${tknv}`);
    } else {
        console.log(`Không tìm thấy nhân viên có mã số ${tknv}`);
    }
    render(peoples) 
}

//Sửa nhân viên
function renderInfoSua(tknv){
    const people = peoples.find(people => people.tknv === tknv)
    
    // const inputs = document.querySelectorAll(".form-control")
    // for(let input of inputs){
    //     console.log(input.id)
    // }

    document.getElementById("tknv").value = people.tknv;
    document.getElementById("name").value = people.name;
    document.getElementById("email").value = people.email;
    document.getElementById("password").value = people.password;
    document.getElementById("datepicker").value = people.datepicker;
    document.getElementById("luongCB").value = people.luongCB;
    document.getElementById("chucvu").value = people.chucvu;
    document.getElementById("gioLam").value = people.gioLam;
    document.getElementById('tknv').disabled = true;

}
const suaNhanVien = (newPeople) => {
    const index = peoples.findIndex(people => people.tknv === newPeople.tknv)
    if(index !== -1){
        peoples[index] = newPeople;
    }
    render(peoples);

}
document.getElementById("btnCapNhat").onclick = () => {
    let inputs = document.querySelectorAll(".form-control");
    let valid = true;
    const people = {}
    for(let input of inputs){
        people[input.id] = input.value
        
    }
    // validate tài khoản
    valid &=  requiredValidate(people.tknv,".required_TKNV","Tài khoản") & lenghtValidate(people.tknv,".number_TKNV","Tài khoản");
    // validate tên nhân viên
    valid &= requiredValidate(people.name,".required_name","Tên nhân viên") & kiemTraChuoiChuCai(people.name,".chuoi_chu_cai_name","Họ Và tên")
    
    // validate email
    valid &= requiredValidate(people.email,".requied_email",'email') & dinhDangEmail(people.email,".format_email","Email")
    
    // validate mật khẩu
    valid &= requiredValidate(people.password,".required_matKhau","Mật khẩu") & dinhDangMatkhau(people.password,".dinh_dang_mat_khau","Mật khẩu")
    
    // validate lương cơ bản
    valid &= requiredValidate(people.luongCB,".required_luongCB","Lương cơ bản") & kiemTraLuongCB(people.luongCB,'.number_luongCB',"Lương căn bản")
    // validate gio lam
    valid &= requiredValidate(people.gioLam,".required_gioLam","Giờ làm") & kiemTraGioLam(people.gioLam,".number_gioLam","Giờ làm");
    if(!valid){
        return
    }

    suaNhanVien(people)
}
render(peoples);
// 
document.querySelector("#btnThemNV").onclick = () => {
    let inputs = document.querySelectorAll(".form-control");
    let valid = true;
    const people = {}
    for(let input of inputs){
        people[input.id] = input.value
        
    }
   
    // validate tài khoản
    valid &=  requiredValidate(people.tknv,".required_TKNV","Tài khoản") & lenghtValidate(people.tknv,".number_TKNV","Tài khoản");
    // validate tên nhân viên
    valid &= requiredValidate(people.name,".required_name","Tên nhân viên") & kiemTraChuoiChuCai(people.name,".chuoi_chu_cai_name","Họ Và tên")
    
    // validate email
    valid &= requiredValidate(people.email,".requied_email",'email') & dinhDangEmail(people.email,".format_email","Email")
    
    // validate mật khẩu
    valid &= requiredValidate(people.password,".required_matKhau","Mật khẩu") & dinhDangMatkhau(people.password,".dinh_dang_mat_khau","Mật khẩu")
    
    // validate lương cơ bản
    valid &= requiredValidate(people.luongCB,".required_luongCB","Lương cơ bản") & kiemTraLuongCB(people.luongCB,'.number_luongCB',"Lương căn bản")
    // validate gio lam
    valid &= requiredValidate(people.gioLam,".required_gioLam","Giờ làm") & kiemTraGioLam(people.gioLam,".number_gioLam","Giờ làm");
    if(!valid){
        return
    }
    peoples.push(people);
    for(let input of inputs){
        input.value = ""
        
    }
    render(peoples);
}

