import React, { Component } from 'react';

export class GalleryItem extends Component {
    constructor(props) {
        super(props);

        this.clickEventHandler = this.clickEventHandler.bind(this);
    }

    clickEventHandler(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        let image = null;
        if (this.props.imgSrc !== null) {
            image = (<img className="imageCls" src={this.props.imgSrc} />);
        }

        var css = "mobileGraphicalTileButton ";
        css = this.props.classes ? css + this.props.classes : css;
        var styles = this.props.styles
       
        return (
            < button
                id = { this.props.id }
                className = { css }
                style = { styles }
                value = { this.props.value }
                onClick = { this.clickEventHandler }
                >
                <div className="graphicalBtnWrapper">
                    {image}
                    <div className="graphicalSpan"><span>{this.props.text}</span></div>
                </div>
            </button >
            
        );
    }
}
