//Toastify
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// validate function
export function Validate(username, password) {
  if (!username.current.value) {
    toast.error('required username',{
      position: 'top-center'
    });
    return false;
  }
  if (!password.current.value) {
    toast.error('required password',{
      position: 'top-center'
    });
    return false;
  }
  return true;
}
// clear function
export function Clear(username, password) {
  username.current.value = "";
  password.current.value = "";
}

// Registar validate
export function RegisterValidate(username, password, type) {
  if (!username) {
    // alert("username bo'lishi shart");
    toast.error('required username',{
      position: 'top-center'
    });
    return false;
  }
  if (!password) {
    toast.error('required password',{
      position: 'top-center'
    });
    return false;
  }

  if (!type) {
    toast.error('Hodim vazifasi belgilashi shart',{
      position: 'top-center'
    });
    return false;
  }

  return true;
}

// clear register function

export function RegisterClear(username, password, type) {
  username = "";
  password = "";
  type = "";
}

// Add product validate

export function EntirProduct(
  productName,
  productPrice,
  // productCatigory,
  productqty
) {
  if (!productName) {
    alert("productName bo'lishi shart");
    return false;
  }
  if (!productPrice) {
    alert("maxsulot narxi bo'lishi shart");
    return false;
  }

  if (!productqty) {
    alert("Daromad solig'ini kiritish shart");
    return false;
  }

  return true;
}