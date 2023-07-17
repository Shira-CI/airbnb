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
      newIndex = pages.length - 1
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
