import React from "react"
// import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            {/* {RatingData.map((rating, index) => (
                <RatingSkeleton key={index} rating={value} />
            ))} */}
            <span>
                <i
                style={{color}}
                    className={
                        value >= 1
                            ? "fas fa-star"
                            : value >= 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                    }
                />
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 2
                            ? "fas fa-star"
                            : value >= 1.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                    }
                />
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 3
                            ? "fas fa-star"
                            : value >= 2.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                    }
                />
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 4
                            ? "fas fa-star"
                            : value >= 3.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                    }
                />
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 5
                            ? "fas fa-star"
                            : value >= 4.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                    }
                />
            </span>
            <span> {text && text}</span>
        </div>
    )
}

// const RatingSkeleton = (value) => (
//     <span>
//         <i
//             className={
//                 value >= 1
//                     ? "fas fa-star"
//                     : value >= 0.5
//                         ? "fas fa-star-half-alt"
//                         : "fas fa-star"
//             }
//         />
//     </span>
// )

// const RatingData = [
//    {a:1},
//    {a:1},
//    {a:1},
//    {a:1},
//    {a:1},
//     {
//         value: 1,
//     },
//     {
//         value: 1.5,
//     },
//     {
//         value: 2,
//     },
//     {
//         value: 2.5,
//     },
//     {
//         value: 3,
//     },
//     {
//         value: 3.5,
//     },
//     {
//         value: 4,
//     },
//     {
//         value: 4.5,
//     },
//     {
//         value: 5,
//     },
// ]

Rating.defaultProps = {
    color: "#f8e825",
}

// Rating.propTypes ={
//     value: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     color: PropTypes.string.isRequired,

// }
export default Rating
