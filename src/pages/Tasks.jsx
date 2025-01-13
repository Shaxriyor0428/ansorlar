// import React from "react";
// import { useGetTasksQuery } from "../redux/api/tasks";
// import { IoIosSearch } from "react-icons/io";

// const Tasks = () => {
//   const { data } = useGetTasksQuery({});

//   return (
//     <div className="flex gap-4 mt-5 ml-[30px] flex-col">
//       <div className="flex items-center gap-4 mt-5">
//         <button className="bg-[#14B890] text-white py-3 px-4 rounded-lg text-nowrap">
//           + Vazifa qo'shish
//         </button>
//         <div className="relative h-full w-full">
//           <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2" />
//           <input
//             type="text"
//             className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
//             placeholder="Vazifa nomi bo'yicha qidirish"
//           />
//         </div>
//       </div>
//       <div className="w-[1040px] border border-gray-200 rounded-2xl">
//         {data?.map((item, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center py-3 px-4 border-b last:border-b-0 h-16"
//           >
//             <div className="text-[#9A9C9C]">{item.name}</div>
//             <div className="text-[#000000DE]">{item.type}</div>
//             <div className="flex gap-4">
//               <button
//                 className="bg-[#14B890] text-white font-medium rounded-md px-4 py-2"
//                 onClick={() => handleEdit(item)}
//               >
//                 O'zgartirish
//               </button>
//               <button
//                 className="bg-red-500 text-white font-medium rounded-md px-4 py-2"
//                 onClick={() => handleDelete(item)}
//               >
//                 O'chirish
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;

import React from "react";
import { useGetTasksQuery } from "../redux/api/tasks";
import { IoIosSearch } from "react-icons/io";

const Tasks = () => {
  const { data } = useGetTasksQuery({});

  return (
    <div className="flex gap-4 mt-5 ml-[30px] flex-col">
      <div className="flex items-center gap-4 mt-5">
        <button className="bg-[#14B890] text-white py-3 px-4 rounded-lg text-nowrap">
          + Vazifa qo'shish
        </button>
        <div className="relative h-full w-full">
          <IoIosSearch className="text-xl absolute top-[50%] translate-y-[-50%] left-2" />
          <input
            type="text"
            className="py-3 pl-10 outline-none border rounded-lg w-[400px] px-2"
            placeholder="Vazifa nomi bo'yicha qidirish"
          />
        </div>
      </div>
      <div className="w-[1040px] border border-gray-200 rounded-2xl">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 px-4 border-b last:border-b-0"
          >
            <div className="text-[#9A9C9C] w-[40%] truncate">{item.name}</div>
            <div className="text-[#000000DE] text-center w-[30%]">
              {item.type}
            </div>
            <div className="flex gap-4 w-[30%] justify-end">
              <button
                className="bg-[#14B890] text-white font-medium rounded-md px-4 py-2"
                onClick={() => handleEdit(item)}
              >
                O'zgartirish
              </button>
              <button
                className="bg-red-500 text-white font-medium rounded-md px-4 py-2"
                onClick={() => handleDelete(item)}
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
