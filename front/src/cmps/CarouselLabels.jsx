import React, { useState, useEffect } from "react"
import { CarouselItemLabels } from "./CarouselItemLabels"

export function CarouselLabels({ categories }) {
  const [activeIndex, setActiveIndex] = useState(0)
  // console.log(categories)
  
  const pagesCalc = (categories) => {
    const iconsPerPage = 15
    let pages = Array.from({ length: Math.ceil(categories.length / iconsPerPage) }, (_, index) =>
      categories.slice(index * iconsPerPage, (index + 1) * iconsPerPage)
    )
    return pages
  }

  const pages = pagesCalc(categories)

  const updateIndex = (newIndex, ev) => {
    ev.preventDefault()
    if (newIndex < 0) {
      // newIndex = pages.length - 1
      newIndex = 3
      // } else if (newIndex >= pages.length) {
    } else if (newIndex >= 3) {
      newIndex = 0
    }
    setActiveIndex(newIndex)
  }

  return (

    <div className="carousel-labels">
      <div
        className="inner-labels"
        style={{
          transform: `translate(-${activeIndex * 100}%)`
        }}
      >

        {pages.map((page, index) => {
          return (
            <CarouselItemLabels key={index} page={page} width={"100%"} />
          )
        })}
      </div>

      {/* {categories.map((category) => {
          return (
            <span className="category-carousel-item">
              <CarouselItemLabels key={category.url} categoryUrl={category.url} width={"100%"} />
              <p className='category-name'>{category.name}</p>
            </span>
          )
        })} */}

      <span className="carousel-label-back">
        <button
          className="button-arrow-back-labels"
          onClick={(ev) => {
            updateIndex(activeIndex - 1, ev)
          }}
        >
          <span className="material-symbols-outlined arrow-back">arrow_back_ios</span>
        </button>
      </span>

      <span className="carousel-label-forward">
        <button
          className="button-arrow-forward-labels"
          onClick={(ev) => {
            updateIndex(activeIndex + 1, ev)
          }}
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </span>


    </div>
  )
}



// import React, { useState, useEffect, useRef } from "react";
// import { CarouselItemLabels } from "./CarouselItemLabels";

// export function CarouselLabels({ categories }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const innerLabelsRef = useRef(null);


//   useEffect(() => {
//     const containerWidth = innerLabelsRef.current.offsetWidth;
//     const categoryWidth = innerLabelsRef.current.children[0].offsetWidth;
//     const categoriesPerContainer = Math.floor(containerWidth / categoryWidth);
//     const maxIndex = categories.length - 1;
//     if (activeIndex > maxIndex) {
//       setActiveIndex(0);
//     }
//   }, [activeIndex, categories]);

//   console.log(activeIndex)
//   const updateIndex = (newIndex, ev) => {
//     ev.preventDefault();
//     // const maxIndex = Math.max(0, categories.length - 1);
//     const maxIndex = categories.length - 1;

//     if (newIndex < 0) {
//       setActiveIndex(maxIndex);
//     } else if (newIndex > maxIndex) {
//       setActiveIndex(0);
//     } else {
//       setActiveIndex(newIndex);
//     }
//     // setActiveIndex(prevIndex => {
//     //   if (newIndex < 0) {
//     //     return prevIndex - 1 < 0 ? maxIndex : prevIndex - 1;
//     //   } else if (newIndex > maxIndex) {
//     //     return prevIndex + 1 > maxIndex ? 0 : prevIndex + 1;
//     //   }
//     //   return newIndex;
//     // });
//   };

//   // const updateIndex = (newIndex, ev) => {
//   //   ev.preventDefault();
//   //   if (newIndex < 0) {
//   //     newIndex = categories.length - 1;
//   //   } else if (newIndex >= categories.length) {
//   //     newIndex = 0;
//   //   }
//   //   setActiveIndex(newIndex);
//   // };

//   // useEffect(() => {
//   //   const handleResize = () => {
//   //     const containerWidth = innerLabelsRef.current.offsetWidth;
//   //     const categoryWidth = innerLabelsRef.current.children[0].offsetWidth;
//   //     const categoriesPerContainer = Math.floor(containerWidth / categoryWidth);
//   //     const newIndex = Math.min(activeIndex, categories.length - categoriesPerContainer);
//   //     setActiveIndex(newIndex);
//   //   };

//   //   handleResize();
//   //   window.addEventListener("resize", handleResize);
//   //   return () => {
//   //     window.removeEventListener("resize", handleResize);
//   //   };
//   // }, [activeIndex, categories]);

//   return (
//     <div className="carousel-labels">
//       <div className="inner-labels"  style={{
//           transform: `translateX(-${activeIndex * 100}%)`
//         }} ref={innerLabelsRef}>
//         {categories.map((category, index) => {
//           return (
//             <span className="category-carousel-item" key={index}>
//               <CarouselItemLabels category={category} />
//               <p className="category-name">{category.name}</p>
//             </span>
//           );
//         })}
//       </div>

//       <span className="carousel-label-back">
//         <button
//           className="button-arrow-back-labels"
//           onClick={(ev) => {
//             updateIndex(activeIndex - 1, ev);
//           }}
//         >
//           <span className="material-symbols-outlined arrow-back">
//             arrow_back_ios
//           </span>
//         </button>
//       </span>

//       <span className="carousel-label-forward">
//         <button
//           className="button-arrow-forward-labels"
//           onClick={(ev) => {
//             updateIndex(activeIndex + 1, ev);
//           }}
//         >
//           <span className="material-symbols-outlined">arrow_forward_ios</span>
//         </button>
//       </span>
//     </div>
//   );
// }
