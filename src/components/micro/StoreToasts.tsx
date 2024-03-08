import useStore from "import/utils/store/useStore";
import myStore from "import/utils/store/store";

export default function StoreToasts() {
  const store = useStore(myStore, (state) => state);

  return (
    <>
      {store && store.error.length != 0 && (
        <div className="absolute left-auto right-auto top-1 z-10 flex select-none flex-row rounded-sm bg-yellow-100 p-2 text-red-600">
          <div>{store.error}</div>
          <div className="h-6 w-6" onClick={() => store.setError("")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

// export const ErrorBanner = () => {
//   const store = useStore(myStore, (state) =StoreToasts> state);

//   return (
//     <>
//       {store && store.error.length != 0 && (
//         <div className="absolute left-auto right-auto top-1 z-10 flex select-none flex-row rounded-sm bg-yellow-100 p-2 text-red-600">
//           <div>{store.error}</div>
//           <div className="h-6 w-6" onClick={() => store.setError("")}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
