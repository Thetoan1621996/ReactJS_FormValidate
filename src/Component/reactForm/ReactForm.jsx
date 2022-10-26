import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSV,
  delSV,
  addUserFromLocalStorage,
  editSV,
  updateSV,
  searchSV,
} from "../../redux/reactFormReducer";

export default function ReactForm() {
  const { arrSV, user } = useSelector(
    (state) => state.reactFormReducer
  );
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    values: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
    erros: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
    isSubmit: true,
  });

  const handleChange = (e) => {
    let { id, value, type } = e.target;

    let errNotice = "";
    if (value.trim() === "") {
      errNotice = id + " không được bỏ trống";
    }

    // Kiểm tra số
    if (id === "phone" || id === "id") {
      const regex = /^[0-9]+$/;
      if (!regex.test(value)) {
        errNotice = id + " phải là số";
      }
    }

    // Kiểm tra email

    if (type === "email") {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(value)) {
        errNotice = id + " không đúng định dạng";
      }
    }
    const newValues = { ...input.values };
    newValues[id] = value;

    const newErrors = { ...input.erros };
    newErrors[id] = errNotice;

    let submit = false;
    for (let key in newValues) {
      if (newValues[key].toString().trim() === "") {
        submit = true;
      }
    }
    setInput({
      values: newValues,
      erros: newErrors,
      isSubmit: submit,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Kiểm tra lỗi trước khi submit
    let { erros,values } = input;
    for (let key in erros) {
      if (erros[key] !== "") {
        alert(" Dữ liệu bạn nhập vào chưa hợp lệ");
        return;
      }
    }
    let newArrSV = arrSV
    for( let key in newArrSV){
      if(newArrSV[key].id === values.id){
        alert("Mã sinh viên này đã tồn tại, vui lòng nhập mã sinh viên khác để thêm vào hệ thống")
        return;
      }
    }

    // Dispatch dữ liệu lên reducer
    const action = addNewSV(input.values);
    dispatch(action);
  };

  useEffect(() => {
    if (localStorage.getItem("arrSV")) {
      const arr = JSON.parse(localStorage.getItem("arrSV"));
      const action = addUserFromLocalStorage(arr);
      dispatch(action);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setInput({ ...input, values: user });
    }
  }, [user]);

  useEffect(() => {
    let stringArrSv = JSON.stringify(arrSV);
    localStorage.setItem("arrSV", stringArrSv);
  }, [arrSV]);

  return (
    <div className="container">
      <form className="row" onSubmit={handleSubmit}>
        <div className="card-header bg-dark text-white">
          Thông tin sinh viên
        </div>
        <div className="col-6 mt-3">
          <p className="mb-0">Mã SV</p>
          <input
            type="text"
            className="form-control"
            id="id"
            value={input.values.id}
            onChange={handleChange}
          />
          <p className="text-danger mb-0">{input.erros.id}</p>
          <p className="mb-0">Số điện thoại</p>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={input.values.phone}
            onChange={handleChange}
          />
          <span className="text-danger">{input.erros.phone}</span>
        </div>
        <div className="col-6 mt-3">
          <p className="mb-0">Họ tên</p>
          <input
            type="text"
            className="form-control"
            id="name"
            value={input.values.name}
            onChange={handleChange}
          />
          <span className="text-danger">{input.erros.name}</span>
          <p className="mb-0">Email</p>
          <input
            type="email"
            className="form-control"
            id="email"
            value={input.values.email}
            onChange={handleChange}
          />
          <span className="text-danger">{input.erros.email}</span>
        </div>
        <div className="row">
          <div className="col-4">
            <button
              type="submit"
              className="btn btn-success mt-2"
              disabled={input.isSubmit}
            >
              Thêm sinh viên
            </button>
            <button
              className="btn btn-warning mt-2 mx-2"
              type="button"
              disabled={input.isSubmit}
              onClick={() => {
                const action = updateSV(input.values);
                dispatch(action);
              }}
            >
              Cập nhật
            </button>
          </div>
          <div className="col-8">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                let keyword = e.target.value;
                const action = searchSV(keyword);
                dispatch(action);
              }}
            />
          </div>
        </div>
      </form>

      <table className="table mt-3">
        <thead className="bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrSV.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      const action = delSV(item.id);
                      dispatch(action);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const action = editSV(item);
                      dispatch(action);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
    </div>
  );
}
