import { useEffect, useRef, useState } from 'react'
import { filterService } from "../services/filter.service"


export function LabelsCarousel() {
    const [isDragging, setIsDragging] = useState(false)
    const categories = filterService.getCategories()
    const carouselRef = useRef(null)
    const arrowLeftRef = useRef(null)
    const arrowRightRef = useRef(null)
    const categoryRef = useRef(null)
    const savedIsDragging = useRef(false)

    let carouselElement, startX, startScrollLeft, movingWidth

    useEffect(() => {
        savedIsDragging.current = isDragging
    }, [isDragging])

    useEffect(() => {
        carouselElement = carouselRef.current
        if (!carouselElement) return

        function handleScroll() {
            if (carouselElement.scrollLeft === 0) {
                arrowLeftRef.current.style.display = 'none'
                arrowRightRef.current.style.display = 'block'
            } else if (carouselElement.scrollLeft + carouselElement.clientWidth >= carouselElement.scrollWidth) {
                arrowLeftRef.current.style.display = 'block'
                arrowRightRef.current.style.display = 'none'
            } else {
                arrowLeftRef.current.style.display = 'block'
                arrowRightRef.current.style.display = 'block'
            }
        }
        carouselElement.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        arrowLeftRef.current.style.display = 'none'
        const arrowsElements = {
            arrowLeftElement: arrowLeftRef.current,
            arrowRightElement: arrowRightRef.current
        }

        for (const key in arrowsElements) {
            const arrowElement = arrowsElements[key]
            arrowElement.addEventListener('click', () => {
                movingWidth = carouselElement.offsetWidth - 216
                carouselElement.scrollLeft += arrowElement.id === 'left' ? -movingWidth : movingWidth
            })
        }
    }, [])



    useEffect(() => {
        if (!carouselElement) return
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
        if (!carouselElement) return
        setIsDragging(true)
        carouselElement.classList.add('dragging')
        startX = e.pageX
        startScrollLeft = carouselElement.scrollLeft
    }
    function dragging(e) {
        if (!savedIsDragging.current) return
        carouselElement.scrollLeft = startScrollLeft - (e.pageX - startX)
    }
    function dragStop() {
        setIsDragging(false)
        carouselElement.classList.remove('dragging')
    }

    if (!categories) return
    return (
        <div className="wrapper">
            <i className="material-symbols-outlined arrow-left" ref={arrowLeftRef} id="left">arrow_back_ios</i>
            <ul className="labelsCarousel" ref={carouselRef}>
                {categories.map((category, idx) => {

                    return (<li className="category" key={idx} ref={categoryRef}>
                        <div className="category-img">
                            <img src={require(`../assets/img/categories/${category.url}.png`)}
                                alt={category.url}
                            />
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