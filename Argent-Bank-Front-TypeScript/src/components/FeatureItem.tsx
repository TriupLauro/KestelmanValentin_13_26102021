import React from "react";

interface FeatureItemProps {
    picture : string
    pictureAlt : string
    title: string
    description : string
}

function FeatureItem({picture,pictureAlt,title,description} : FeatureItemProps) {
    return (
        <div className="feature-item">
            <img src={picture} alt={pictureAlt} className="feature-icon"/>
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {description}
            </p>
        </div>
    )
}

export default FeatureItem