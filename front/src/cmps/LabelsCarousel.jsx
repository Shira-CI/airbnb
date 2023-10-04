import { useEffect, useRef, useState } from 'react'
import { filterService } from "../services/filter.service"


export function LabelsCarousel() {
    const [isDragging, setIsDragging] = useState(false)
    const categories = filterService.getCategories()
    const carouselRef = useRef(null)
    const arrowLeftRef = useRef(null)
    const arrowRightRef = useRef(null)
    const categoryRef = useRef(null)

    let carouselElement , startX, startScrollLeft , categoryElement , firstCategoryWidth, movingWidth
    // let carouselElement , startX, startScrollLeft , arrowLeftElement , arrowRightElement
    const savedIsDragging = useRef(false);


    useEffect(()=>{
        savedIsDragging.current= isDragging
    }, [isDragging])


    useEffect(()=>{
        categoryElement = categoryRef.current
        if(!categoryElement) return
     firstCategoryWidth = categoryElement.offsetWidth
}, [])


    useEffect(()=>{

       const arrowsElements = {
            arrowLeftElement : arrowLeftRef.current,
            arrowRightElement : arrowRightRef.current
        }

        for (const key in arrowsElements) {
            const arrowElement = arrowsElements[key]
            arrowElement.addEventListener('click', () => {
                // console.log(arrowElement.id)
                // carouselElement.scrollLeft += arrowElement.id === 'left' ? -firstCategoryWidth : firstCategoryWidth
                // console.log(carouselElement.offsetWidth)
                movingWidth = carouselElement.offsetWidth - 230
                // console.log(movingWidth)
                carouselElement.scrollLeft += arrowElement.id === 'left' ? -movingWidth : movingWidth
            })
          }
    }, [])



    
    useEffect(() => {
        carouselElement = carouselRef.current
        if(!carouselElement) return
        carouselElement.addEventListener('mousedown', dragStart)
        carouselElement.addEventListener('mousemove', dragging)
        document.addEventListener('mouseup', dragStop)

        return () => {
            carouselElement.removeEventListener('mousedown', dragStart)
            carouselElement.removeEventListener('mousemove', dragging)
            document.removeEventListener('mouseup', dragStop)
        }

    }, [])

    function dragStart(e) {
          if(!carouselElement) return
        setIsDragging(true)
        console.log('dragstart')
        carouselElement.classList.add('dragging')
        startX = e.pageX
        startScrollLeft = carouselElement.scrollLeft
    }
    function dragging(e) {
        if (!savedIsDragging.current) return

        carouselElement.scrollLeft = startScrollLeft - (e.pageX- startX)
    }
    function dragStop() {
        console.log('dragstop')
        setIsDragging(false)
        // console.log(isDragging)
        carouselElement.classList.remove('dragging')
    }



    // console.log(categories)
    if (!categories) return
    return (
        <div className="wrapper">
            <i className="material-symbols-outlined arrow-left" ref={arrowLeftRef} id="left">arrow_back_ios</i>
            <ul className="carousel" ref={carouselRef}>
                {categories.map((category, idx) => {
                    return (<li className="category" key={idx} ref={categoryRef}>
                        <div className="category-img">
                            <img src={require(`../assets/img/categories/${category.url}.png`)}
                                alt={category.url}
                                drragable="false" />
                        </div>

                        <div className='category-name'>
                            <span>

                                {category.name}

                            </span>
                        </div>

                    </li>)
                }
                )}
            </ul>


            <i className="material-symbols-outlined arrow-right" ref={arrowRightRef} id="right">arrow_forward_ios</i>
        </div>
    )
}