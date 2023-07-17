import { useState } from "react"
import { useNavigate } from "react-router"

export const CarouselItemLabels = ({ page, width }) => {
  const [isActive, setIsActive] = useState("")
  const navigate = useNavigate()

  function helloFromLabel(name) {
    setIsActive(name)
    navigate(`/?type=${name}`)
  }



  return (
    <div className="carousel-item" style={{ width: width }}>
      {page.map((icon, index) => {
        return (
          <span
            onClick={() => helloFromLabel(icon.name)} key={index}
            className={`category-carousel-item ${isActive === icon.name ? 'active' : ''}`}
          >
            <img className="category-icon"
              style={{ width: '25px', height: '25px' }}
              src={require(`../assets/img/categories/${icon.url}.png`)}
              alt={icon.url}
            />
            <p className='category-name'>{icon.name}</p>
          </span>
        )
      })}

    </div>







    // <div className="carousel-item" style={{ width: width }}>
    //   <img
    //     style={{ width: '25px', height: '25px' }}
    //     src={require(`../assets/img/categories/${categoryUrl}.png`)}
    //     alt={categoryUrl}
    //   />
    // </div>
  )
}


