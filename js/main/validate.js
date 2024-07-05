// validate trống 
 const requiredValidate = (string,selector,message) =>  {
    
    if(string.trim() === ""){
        
        document.querySelector(selector).innerHTML = `${message} không được bỏ trống!`;
        return false;
    }
    document.querySelector(selector).innerHTML = "";
        return true;
    
}
// Validate độ dài string
 const lenghtValidate = (string,selector,message) => {
    const regex = /^.{4,6}$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    
    document.querySelector(selector).innerHTML = `${message} trong khoảng từ 4 đến 6 ký tự`;
    return false;
}

// Kiểm tra chuỗi là chữ cái
 const kiemTraChuoiChuCai = (string,selector,message) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    document.querySelector(selector).innerHTML = `${message} phải là chữ cái không chứa số !`;
    return false;
}
// Kiểm tra định dạng email
 const dinhDangEmail = (string,selector,message) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    document.querySelector(selector).innerHTML = `${message} phải đúng định dạng Email !`;
    return false;
}
// kiểm tra định dạng mật khẩu
 const dinhDangMatkhau = (string,selector,message) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    document.querySelector(selector).innerHTML = `${message} từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) !`;
    return false;
}
// kiểm tra số nhập vào trong khoảng 1000000 - 20000000
 const kiemTraLuongCB = (string,selector,message) => {
    const regex = /^(1000000|[1-9]\d{6}|1\d{7}|20000000)$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    document.querySelector(selector).innerHTML = `${message} từ 1 000 000 - 20 000 000!`;
    return false;
}
// Kiểm tra số giờ làm
 const kiemTraGioLam = (string,selector,message) => {
    const regex = /^(8[0-9]|9[0-9]|1[0-9]{2}|200)$/;
    if(regex.test(string)){
        document.querySelector(selector).innerHTML = ""
        return true;
    }
    document.querySelector(selector).innerHTML = `${message} từ 80 - 200 giờ!`;
    return false;
}
