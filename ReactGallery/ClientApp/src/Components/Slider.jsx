import React, { Component } from 'react';

export class Slider extends Component {
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

        return (
            <div className="flex-container flex-justifyContent-spaceAround">
                <span>{this.props.text}</span>
                <div className="flex-direction-column">
                    <input type="checkbox" id="chkToggle" />
                    <label htmlFor="chkToggle" className="toggle">
                        <div className="slider"></div>
                    </label>
                </div>
            </div>
        );
    }
}
