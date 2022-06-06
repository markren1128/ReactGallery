import React, { Component } from 'react';
import { Modal } from './Modal';
import { GalleryItem } from './GalleryItem';

export class GalleryItemDetails extends Component {
    constructor(props) {
        super(props);
        
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onClose(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        let image = null;
        if (this.props.selectedImage.url !== null) {
            image = (<img id={"img_" + this.props.selectedImage.id} className="imageCls" src={this.props.selectedImage.url} />);
        }
        let title = "Image No. " + this.props.selectedImage.id + " from album " + this.props.selectedImage.albumId;
        return (
            <div >
                <Modal title={title} onClose={this.onClose} show={this.props.isModalOpen}>
                    <div id={"wrp_" + this.props.selectedImage.url.id} className="graphicalBtnWrapper">
                        {image}
                    </div>
                    <div className="flex-container-base flex-direction-row" >
                        <span>{this.props.selectedImage.title}</span>
                    </div>
                </Modal>
            </div>
        );
       
    };
}