import React, { Component } from 'react';

export class Modal extends Component {
    constructor(props) {
        super(props);
        let maskColor = this.props.maskColor ? this.props.maskColor : "#4E4E64";
        let maskOpacity = this.props.maskOpacity ? this.props.maskOpacity : "0.5";

        this.state = {
            maskColor: maskColor,
            maskOpacity: maskOpacity
        };

        this.onKeydown = this.onKeydown.bind(this);
        this.close = this.close.bind(this);
    }

    render() {
        debugger;
        if (this.props.isOpen === false || this.props.isOpen === undefined) {
            document.removeEventListener("keydown", this.onKeydown, false);
            document.removeEventListener("mousewheel", this.onMousewheel, false);
            return null;
        }

        //This is to avoid scrolling (if there was any) in the backdrop/parent
        //whilst the modal is open. The events are removed if !this.props.isOpen (see above).
        document.addEventListener("mousewheel", this.onMousewheel, false);

        if (this.props.isOpen && !this.props.ignoreKeyPressEvents) {
            document.addEventListener("keydown", this.onKeydown, false);
        }

        let modalStyle = {
            zIndex: '50',
            background: this.props.backgroundColor
        }

        if (this.props.width && this.props.height) {
            modalStyle.width = this.props.width + 'px',
                modalStyle.height = this.props.height + 'px'
        }


        if (this.props.style) {
            for (let key in this.props.style) {
                modalStyle[key] = this.props.style[key];
            }
        }

        let backdropStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '49',
            background: this.state.maskColor,
            opacity: this.state.maskOpacity,
        }

        return (
            <div className="modalContainer">
                <div className={this.props.className} style={modalStyle}>
                    {this.props.children}
                </div>
                {!this.props.noBackdrop &&
                    <div className={this.props.backdropClassName} style={backdropStyle}
                        onClick={e => this.close(e)} />}
            </div>
        )
    }

    close(e) {
        if (!this.props.overrideMaskClick) {
            e.preventDefault();

            if (this.props.onClose) {
                this.props.onClose();
            }
        }
    }

    onKeydown(e) {
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [37, 38, 39, 40, 32, 33, 34, 35, 36];

        if (keys.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }

        if (e.keyCode === 27) {
            this.close(e);
        }
    }

    onMousewheel(e) {
        e.preventDefault();
    }
}