import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import axios from "axios";
const api = "https://curd-test-backend.onrender.com/api/";
interface Data {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}
const App: React.FC = () => {
  const [styling, setStyling] = useState<any>({
    top: {
      width: "100%",
      height: "50%",
    },
    one: {
      width: "30%",
      height: "100%",
    },
    two: {
      width: "70%",
      height: "100%",
    },
    three: {
      width: "100%",
      height: "50%",
    },
  });
  const [data, setData] = useState<Array<Data | any>>([]);
  const [calls, setCalls] = useState<any>();
  const [newData, setNewData] = useState<Data>({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedData, setSelectedData] = useState<Data>();
  const [isNew, setIsNew] = useState<boolean>(true);
  const [rerender, setRerender] = useState<boolean>(false);
  const getUsers = () => {
    axios.get(api + "data").then((res) => {
      setData(res.data);
    });
  };
  const getCount = () => {
    axios.get(api + "count").then((res) => {
      setCalls(res.data);
    });
  };
  const updateUser = (data: Data) => {
    axios
      .put(api + "data/" + data._id, { ...data })
      .then((res) => {
        console.log(res);
        getUsers();
        getCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postUser = (data: Data) => {
    axios
      .post(api + "data", { ...data })
      .then((res) => {
        console.log(res);
        getUsers();
        getCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (id: string) => {
    axios
      .delete(api + "data/" + id)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
    getCount();
  }, []);
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}>
      <Resizable
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "50%",
        }}
        enable={{
          top: true,
          right: false,
          bottom: true,
          left: false,
        }}
        onResize={(e, dir, elementRef, delta) => {
          if (dir == "top" || dir == "bottom") {
            if (delta.height) {
              setStyling((p: any) => ({
                ...p,
                three: {
                  width: p.three.width,
                  height:
                    Number(
                      100 - Number(elementRef.style.height.replace("%", ""))
                    ) + "%",
                },

                top: {
                  width: p.top.width,
                  height: elementRef.style.height,
                },
              }));
            }
          }
          console.log(elementRef.style.height);
        }}
        size={styling.top}>
        <Resizable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
          }}
          className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8"
          size={styling.one}
          onResize={(e, dir, elementRef, delta) => {
            if (dir == "left" || dir == "right") {
              console.log(elementRef.style.width);
              setStyling((p: any) => ({
                ...p,
                one: {
                  ...p.one,
                  width: elementRef.style.width,
                },
                two: {
                  ...p.two,
                  width:
                    Number(
                      100 - Number(elementRef.style.width.replace("%", ""))
                    ) + "%",
                },
              }));
            }
          }}>
          <div className="max-w-md mx-auto w-[100%]">
            <h2 className="text-7xl font-bold text-indigo-600  mb-4">
              {isNew ? "Add" : "Edit"} Data
            </h2>
            <form
              id="data-form"
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                isNew ? postUser(newData) : updateUser(newData);
                setNewData({ name: "", email: "", phone: "" });
                setIsNew(true);
              }}>
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block h-[35px] p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter name"
                  onChange={(e) => {
                    setNewData({ ...newData, name: e.target.value });
                  }}
                  value={newData.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={newData.email}
                  onChange={(e) => {
                    setNewData({ ...newData, email: e.target.value });
                  }}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 h-[35px] p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-medium text-gray-700">
                  Phone
                </label>
                <input
                  value={newData.phone}
                  onChange={(e) => {
                    setNewData({ ...newData, phone: e.target.value });
                  }}
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1h-[35px] p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter phone"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Resizable>
        <Resizable
          style={{
            border: "solid 1px #ddd",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: true,
          }}
          onResize={(e, dir, elementRef, delta) => {
            if (dir == "left" || dir == "right") {
              setStyling((p: any) => ({
                ...p,
                two: {
                  ...p.two,
                  width: elementRef.style.width,
                },
                one: {
                  ...p.one,
                  width:
                    Number(
                      100 - Number(elementRef.style.width.replace("%", ""))
                    ) + "%",
                },
              }));
            }
          }}
          className="bg-white px-4 py-2"
          size={styling.two}>
          <div className=" mx-auto w-[100%]">
            <h2 className="text-7xl font-bold text-indigo-600 mb-4">Data</h2>

            <div className="flex justify-between items-center mb-4 w-[100%]">
              <div className="flex items-center">
                <button
                  className="hover:text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md text-indigo-600"
                  onClick={() => {
                    setNewData({ name: "", email: "", phone: "" });
                    setIsNew(true);
                  }}>
                  Add Data
                </button>
              </div>
              <div>
                <p>
                  Add Count: <span id="count">{calls?.addCount}</span> ,Update
                  Count:<span>{calls?.updateCount}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        id="data-table"
                        className="bg-white divide-y divide-gray-200">
                        {data?.map((item: Data) => {
                          return (
                            <tr className="hover:bg-gray-50 active:bg-gray-100">
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item?.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item?.email}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  className="pr-3 text-indigo-600 hover:text-indigo-900"
                                  onClick={() => {
                                    setNewData(item);
                                    setIsNew(false);
                                  }}>
                                  Edit
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900 pr-3"
                                  onClick={() => deleteUser(item._id || "")}>
                                  Delete
                                </button>
                                <button
                                  className="text-green-600 hover:text-green-900"
                                  onClick={() => {
                                    setSelectedData(item);
                                  }}>
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Resizable>
      </Resizable>

      <Resizable
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          background: "#f0f0f0",
          maxWidth: "100%",
        }}
        enable={{ left: false, right: false }}
        maxWidth={"100%"}
        size={styling.three}
        onResize={(e, dir, elementRef, delta) => {
          if (dir == "top" || dir == "bottom") {
            if (delta.height) {
              setStyling((p: any) => ({
                ...p,
                top: {
                  width: p.top.width,
                  height:
                    Number(
                      100 - Number(elementRef.style.height.replace("%", ""))
                    ) + "%",
                },

                three: {
                  width: p.three.width,
                  height: elementRef.style.height,
                },
              }));
            }
          }
          console.log(elementRef.style.height);
        }}>
        {selectedData?._id ? (
          <div className="bg-white px-4 py-4 border rounded-lg shadow-lg w-full h-full flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-7xl font-bold text-indigo-600 mb-3">
                {selectedData?.name}
              </h2>
              <p className="text-4xl text-gray-600 pt-3 font-bold">
                Email: {selectedData.email}
              </p>
              <p className="text-gray-600 text-4xl pt-3 font-bold">
                Phone: {selectedData.phone}
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Resizable>
    </div>
  );
};

export default App;
