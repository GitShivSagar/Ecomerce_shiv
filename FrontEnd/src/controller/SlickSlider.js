import React from "react";
import Slider from 'react-slick';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    )
}

function SamplePreviousArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    )
}



export default function SlickSlider(props) {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autplay: false,
        speed: 500,
        autplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePreviousArrow />,

    }

    return (
        <Slider {...settings}>
            {props.data?.map((imagedata, index) =>
                <div className="item-slick3" data-thumb={imagedata.path}
                    key={index}
                >
                    <div className="wrap-pic-w pos-relative">
                        <img src={imagedata.path} alt="IMG-PRODUCT"
                            style={{ height: 570 }}
                        />
                        <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl11 bg0 hov-btn3 trans-04" href={imagedata.path}>
                            <i className="fa fa-expand"></i></a>
                    </div>
                </div>
            )}
        </Slider>

    )
}
